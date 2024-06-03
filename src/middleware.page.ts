// eslint-disable-next-line
import { type NextMiddleware, NextResponse } from "next/server";
import { attachAffiliateCookies } from "./middlewares/affiliateCookies";
import { processCurrencyCookie } from "./middlewares/currency";
import { processRedirectAndRewrite } from "./middlewares/redirectOrRewirte";
import { processBookingV2Cookie } from "@@/middlewares/bookingv2";
import { processSeoRedirect } from "./middlewares/seoRedirect";
import { rewriteToSite } from "./middlewares/rewriteToSite";
import { type MiddlewareFn, type MiddlewareCtx } from "./middlewares/types";
import Middleware from "@poppinss/middleware";

export const middleware: NextMiddleware = async (req) => {
  const ctx: MiddlewareCtx = {
    req,
    res: NextResponse.next(),
  };
  const middleware = new Middleware<MiddlewareFn>();

  await middleware
    .add(processRedirectAndRewrite)
    .add(processCurrencyCookie)
    .add(processBookingV2Cookie)
    .add(attachAffiliateCookies)
    .add(processSeoRedirect)
    .add(rewriteToSite)
    .runner()
    .run((fn, next) => fn(ctx, next));

  ctx.res.headers.set("x-next-pathname", req.nextUrl.pathname);

  return ctx.res;
};

export const config = {
  matcher: [
    "/((?!public|static|api|_next|build|imagesv3|images|favicon).*)", // match all paths not starting with 'public' or 'static'
    "/sites/:path",
  ],
};
