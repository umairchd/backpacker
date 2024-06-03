import { NextResponse } from "next/server";
import { fetchFromGraph } from "./clients";
import {
  MiddlewareChannelByHostDocument,
  MiddlewareChannelByHostQuery,
  MiddlewareChannelByHostQueryVariables,
} from "./queries.generated";
import { type MiddlewareFn } from "./types";

export const rewriteToSite: MiddlewareFn = async (ctx) => {
  const url = ctx.req.nextUrl.clone();
  const host = process.env.HOST_OVERRIDE ?? ctx.req.headers.get("Host");

  const { channel } = await fetchFromGraph<
    MiddlewareChannelByHostQuery,
    MiddlewareChannelByHostQueryVariables
  >({
    query: MiddlewareChannelByHostDocument,
    variables: {
      host,
    },
    next: {
      revalidate: 600,
    },
  }).then((d) => d.data ?? ({} as MiddlewareChannelByHostQuery));
  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents.
  if (url.pathname.startsWith(`/sites`)) {
    url.pathname = `/404`;
  } else {
    const pageType = ctx.res.headers.get("x-page-type");
    // rewrite to the current subdomain under the pages/sites folder
    url.pathname = `/sites/${channel.key}/${channel.theme}/${pageType}${url.pathname}`;
    console.log(ctx.req.nextUrl.href, url.pathname);
  }

  ctx.res = NextResponse.rewrite(url);
};
