import { sessionOptions } from "../../auth/sessionConfig";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  BAD_REQUEST_MESSAGE,
  processLoginCallback,
} from "../../auth/authFlows";
import { helmet } from "./middlewares";
import { createRouter, expressWrapper } from "next-connect";
import { getHostUri } from "@@/pages/auth/sessionUtils";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(expressWrapper(helmet)).get(async (req, res) => {
  try {
    await processLoginCallback(
      req,
      `${getHostUri(req)}/api/next/login-callback`
    );

    res.redirect("/");
  } catch (e) {
    res.status(403).end(e);
  }
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
