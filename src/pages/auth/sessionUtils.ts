import { IronSessionData } from "iron-session";
import pick from "lodash/pick";
import type { IncomingMessage } from "http";

import env from "@@/env";

const { travelloApiKey, serviceName, version } = env;

export function getHeaders(token?: IronSessionData["token"]) {
  const accessToken = token?.access_token;

  return {
    "X-API-KEY": travelloApiKey,
    "apollographql-client-name": serviceName,
    "apollographql-client-version": version,
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  };
}

export function forwardProxyHeaders(req: IncomingMessage) {
  if (process.env.NODE_ENV === "production") {
    return {
      ...pick(req.headers as { [key: string]: string }, [
        "host",
        "x-forwarded-for",
        "x-forwarded-proto",
        "x-forwarded-port",
        "x-real-ip",
        "x-request-id",
        "traceparent",
        "tracestate",
      ]),
    };
  }

  /**
   * in development we don't forward proxy headers to remote api-stage, because we're using local machine to proxy to api-stage,
   * so api-stage will already be able to detect local machine's ip address
   */
  return {};
}

export function getHostUri(req: IncomingMessage) {
  const host = req.headers.host;
  const proto = req.headers["x-forwarded-proto"] ? "https" : "http";

  return `${proto}://${host}`;
}

export function getRootDomain(url: string | URL): string {
  /// https://github.com/scrapingapi/get-root-domain
  if (typeof url === "string") url = new URL(url);

  const domain = url.hostname;
  const elems = domain.split(".");
  const iMax = elems.length - 1;

  const elem1 = elems[iMax - 1];
  const elem2 = elems[iMax];

  const isSecondLevelDomain = iMax >= 3 && (elem1 + elem2).length <= 5;
  return (
    (isSecondLevelDomain ? elems[iMax - 2] + "." : "") + elem1 + "." + elem2
  );
}
