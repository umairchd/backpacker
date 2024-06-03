import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "iron-session/travello",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const oauth = (function () {
  const {
    OAUTH_ISSUER,
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_USER_SERVICE_CLIENT_ID,
    OAUTH_USER_SERVICE_CLIENT_SECRET,
    OAUTH_TOKEN_EXPIRY_SKEW = "300", // 5 mins
    DEVICE_ID_COOKIE_EXPIRY = `${365 * 86400}`, // 1 year
  } = process.env;

  if (!OAUTH_ISSUER || !OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
    throw new Error("missing oauth credentials!");
  }

  return {
    issuer: OAUTH_ISSUER,
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    userServiceClientId: OAUTH_USER_SERVICE_CLIENT_ID,
    userServiceClientSecret: OAUTH_USER_SERVICE_CLIENT_SECRET,
    tokenExpirySkew: Number(OAUTH_TOKEN_EXPIRY_SKEW) * 1000,
    deviceIdCookieExpiry: Number(DEVICE_ID_COOKIE_EXPIRY) * 1000,
  };
})();
