import { sessionOptions } from "../../auth/sessionConfig";
import { forwardProxyHeaders, getHeaders } from "../../auth/sessionUtils";

import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { helmet } from "./middlewares";
import { processAuthorization } from "./authorize.page";
import { createRouter, expressWrapper } from "next-connect";
import { BAD_REQUEST_MESSAGE } from "../../auth/authFlows";
import { fetch } from "@@/pages/lib/serverUtils";

import env from "@@/env";

const { travelloGraphServerSide } = env;

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(expressWrapper(helmet)).post(async (req, res) => {
  await processAuthorization(req, res, false);

  /**
   * 4. forward entire request to rest-gateway/graphql
   */

  const headers = {
    ...forwardProxyHeaders(req), // in the cluster we forward all headers to rest-gateway/graphql
    ...getHeaders(req.session.token),
  };

  const response = await fetch(travelloGraphServerSide, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers,
    redirect: "manual",
    cache: "no-cache",
    keepalive: false,
  }).then((res) => res.json());

  res.send(response);
});

export default withIronSessionApiRoute(
  router.handler({
    onError: (err: Error, req, res) => {
      console.error(err);
      res.status(500).end(err.message);
    },
    onNoMatch: (req, res) => {
      res.status(400).end(BAD_REQUEST_MESSAGE);
    },
  }),
  sessionOptions
);

export const config = {
  api: {
    responseLimit: false,
  },
};
