import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions, oauth } from "../../auth/sessionConfig";
import {
  BAD_REQUEST_MESSAGE,
  exchangeToken,
  loginAsGuest,
  refreshToken,
} from "../../auth/authFlows";
import { helmet } from "./middlewares";
import { getCookie, setCookie } from "cookies-next";
import { createRouter, expressWrapper } from "next-connect";
import { BrowserFingerprint } from "browser_fingerprint";
import crypto from "node:crypto";
import { IncomingMessage } from "node:http";
import { getHostUri, getRootDomain } from "../../auth/sessionUtils";

const fingerPrinter = new BrowserFingerprint({
  toSetCookie: false,
});

function generateDeviceId(req: IncomingMessage) {
  try {
    return fingerPrinter.fingerprint(req).fingerprint;
  } catch {
    // if all things fail generate a random hex
    return crypto.randomBytes(20).toString("hex");
  }
}

function getDeviceId(req: NextApiRequest, res: NextApiResponse) {
  const deviceId =
    (() => {
      try {
        return (
          (getCookie("deviceId", {
            req,
            res,
          }) as string) ?? (JSON.parse(req.body ?? "{}")["deviceId"] as string)
        );
      } catch {
        return null;
      }
    })() ?? generateDeviceId(req);

  try {
    setCookie("deviceId", deviceId, {
      req,
      res,
      domain: getRootDomain(new URL(req.url, getHostUri(req))),
      maxAge: oauth.deviceIdCookieExpiry,
    });
  } catch (e) {
    console.error(e);
  }

  return deviceId;
}

export async function processAuthorization(
  req: NextApiRequest,
  res: NextApiResponse,
  forceRefresh: boolean
) {
  const deviceId = getDeviceId(req, res);

  if (!req.session.token) {
    const accessToken = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;

    try {
      // do stuff only if session.token is absent
      if (accessToken) {
        req.session.token = await exchangeToken(req, accessToken);
      } else {
        req.session.token = await loginAsGuest(req, deviceId);
      }
      await req.session.save();
    } catch (e) {
      req.log.error(e);
      res.status(403).end(e.message);
      return;
    }
  } else {
    try {
      /**
       * 1. refresh token if needed
       */
      const [token, isRefreshed] = await refreshToken(
        req,
        req.session.token,
        forceRefresh
      );
      if (isRefreshed) {
        req.session.token = token;
        await req.session.save();
      }
    } catch (e) {
      /**
       * 2. fall back to guest session if it failed. e.g. refresh token expired
       */
      req.session.token = await loginAsGuest(req, deviceId);
      await req.session.save();

      /**
       * 3. if this still fails, forward the request anyway and let it fail on the other side
       */
    }
  }
}

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(expressWrapper(helmet)).post(async (req, res) => {
  await processAuthorization(req, res, true);
  if (process.env.NODE_ENV !== "production") {
    res.send({
      ok: true,
      message: "Authenticated",
      debug: req.session.token,
    });
    return;
  }
  res.send({
    ok: true,
    message: "Authenticated",
  });
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
