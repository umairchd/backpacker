// eslint-disable-next-line
import { NextResponse } from "next/server";
import { type MiddlewareFn } from "./types";

export const CURRENCY_COOKIE_KEY = "bpd_currency";

export const processCurrencyCookie: MiddlewareFn = async (ctx, next) => {
  const url = ctx.req.nextUrl.clone();
  const currencyParam = url.searchParams.get("currency");
  if (currencyParam) {
    url.searchParams.delete("currency"); // consumes currency query param

    ctx.res = NextResponse.redirect(url.href);
    ctx.res.cookies.set(CURRENCY_COOKIE_KEY, currencyParam.toUpperCase(), {
      maxAge: 7 * 24 * 60 * 60,
      secure: true,
      httpOnly: false,
    });
    return;
  }

  await next();
};
