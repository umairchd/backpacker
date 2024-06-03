import { NextResponse } from "next/server";
import { type MiddlewareFn } from "./types";

export const processSeoRedirect: MiddlewareFn = async (ctx, next) => {
  const url = ctx.req.nextUrl.clone();

  // we can a add list of params that we want to remove from the url
  // this is to prevent the url from the seo redirect is not working for some reason
  const seoRedirectIssues = ["enquiryType", "page", "yoReviewsPage", "_ua"];

  seoRedirectIssues.forEach((param) => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
    }
  });

  if (url.href !== ctx.req.url) {
    ctx.res = NextResponse.redirect(url.href);
    return ctx.res;
  }

  return next();
};
