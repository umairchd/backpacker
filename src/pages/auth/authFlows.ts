import type { NextApiRequest } from "next";

import { oauth } from "./sessionConfig";
import {
  Issuer,
  generators,
  TokenSet,
  custom,
  type BaseClient,
} from "openid-client";
import { IronSessionData } from "iron-session";
import { fetch } from "../lib/serverUtils";
import { forwardProxyHeaders } from "./sessionUtils";
import { IncomingMessage } from "http";
import jsonwebtoken from "jsonwebtoken";

export const BAD_REQUEST_MESSAGE = "You have you ask me nicely.";

import env from "@@/env";

const { travelloUserServiceServerSide } = env;

interface SessionToken {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number; // this is for server side to refresh, in unix-timestamp
  expires_in?: number; // this is for client side to refresh, in unix-timpstamp
}

declare module "iron-session" {
  interface IronSessionData {
    codeVerifier?: string;
    token?: SessionToken;
  }
}

function customizeOpenIdClient(client: BaseClient, req: IncomingMessage) {
  client[custom.http_options] = () => {
    return {
      headers: forwardProxyHeaders(req),
    };
  };
  client[custom.clock_tolerance] = 5; // to allow a 5 second skew
}

export async function initiateLogin(
  req: NextApiRequest,
  redirect_uris: string[]
) {
  /**
   * 1. initiate a authorization code flow with PCKE
   */
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);

  const issuer = await Issuer.discover(oauth.issuer);

  const client = new issuer.Client({
    client_id: oauth.clientId,
    client_secret: oauth.clientSecret,
    redirect_uris,
    response_types: ["code"],
  });

  req.session.codeVerifier = code_verifier;
  await req.session.save();

  return client.authorizationUrl({
    scope: "email openid profile",
    code_challenge,
    code_challenge_method: "S256",
  });
}

function mapTokenSetToSessionToken(tokenSet: TokenSet): SessionToken {
  return {
    access_token: tokenSet.access_token,
    refresh_token: tokenSet.refresh_token,
    expires_at: tokenSet.expires_at,
    expires_in: tokenSet.expires_in,
  };
}

export async function processLoginCallback(
  req: NextApiRequest,
  redirectUri: string
) {
  /**
   * 2. send authorization code and code_verifier to /token to get tokenSet
   */
  const issuer = await Issuer.discover(oauth.issuer);

  const client = new issuer.Client({
    client_id: oauth.clientId,
    client_secret: oauth.clientSecret,
  });

  const params = client.callbackParams(req);

  const tokenSet = await client.callback(redirectUri, params, {
    code_verifier: req.session.codeVerifier,
  });

  req.session.codeVerifier = undefined;
  req.session.token = mapTokenSetToSessionToken(tokenSet);

  await req.session.save();
}

export async function logout(
  post_logout_redirect_uri: string,
  token?: SessionToken
) {
  const issuer = await Issuer.discover(oauth.issuer);

  const client = new issuer.Client({
    client_id: oauth.clientId,
    client_secret: oauth.clientSecret,
  });

  if (token) {
    const tokenSet = await client.refresh(token.refresh_token);

    const endSessionUrl = client.endSessionUrl({
      id_token_hint: tokenSet.id_token,
      post_logout_redirect_uri,
    });

    return endSessionUrl;
  }
  return null;
}

export async function exchangeToken(
  req: NextApiRequest,
  userServiceToken: string
): Promise<SessionToken> {
  const issuer = await Issuer.discover(oauth.issuer);

  const client = new issuer.Client({
    client_id: oauth.clientId,
    client_secret: oauth.clientSecret,
    token_endpoint_auth_method: "client_secret_post",
  });

  customizeOpenIdClient(client, req);

  /**
   * 1. we initiate a token exchange grant with the authorizationToken token targeting backpackerdeals-next client
   */
  const tokenSet = await client.grant({
    grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
    requested_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
    subject_token: userServiceToken,
    audience: oauth.clientId,
  });

  return mapTokenSetToSessionToken(tokenSet);
}

export async function loginAsGuest(
  req: NextApiRequest,
  deviceId: string
): Promise<SessionToken> {
  /**
   * 1. we get the guest token from user-service which should contain a token from travelloapp-legacy client
   */
  const response: unknown = await fetch(
    `${travelloUserServiceServerSide}/users/guest`,
    {
      method: "POST",
      headers: {
        deviceId,
        Accept: "application/json",
        ...forwardProxyHeaders(req),
      },
    }
  ).then((res) => res.json());

  if (response?.["authorizationToken"]) {
    return exchangeToken(req, response["authorizationToken"]);
  }
  return {};
}

function shouldRefresh(expiresAt: number) {
  return Date.now() >= expiresAt - oauth.tokenExpirySkew;
}

export async function refreshToken(
  req: NextApiRequest,
  token: IronSessionData["token"],
  force = false
): Promise<[SessionToken, boolean]> {
  if (
    force ||
    shouldRefresh(token.expires_at * 1000) ||
    shouldRefresh(
      jsonwebtoken.decode(token.access_token, { json: true }).exp * 1000
    ) // decode the jwt as well just in case expires_at does not trigger properly
  ) {
    // renews 5 minutes before actual expiry
    const issuer = await Issuer.discover(oauth.issuer);
    const client = new issuer.Client({
      client_id: oauth.clientId,
      client_secret: oauth.clientSecret,
    });

    customizeOpenIdClient(client, req);

    if (token.refresh_token) {
      const tokenSet = await client.refresh(token.refresh_token);
      return [mapTokenSetToSessionToken(tokenSet), true];
    }
  }
  return [token, false];
}
