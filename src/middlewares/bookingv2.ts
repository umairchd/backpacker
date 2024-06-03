// eslint-disable-next-line
import { NextResponse } from "next/server";
import { type MiddlewareFn } from "./types";

export const BOOKING_V2_KEY = "booking_v2";

export const processBookingV2Cookie: MiddlewareFn = async (ctx, next) => {
  const url = ctx.req.nextUrl.clone();
  const isContainBookingV2Param = !!url.searchParams.get("bookingv2");

  if (isContainBookingV2Param) {
    url.searchParams.delete("bookingv2");

    ctx.res = NextResponse.redirect(url.href);
    ctx.res.cookies.set(BOOKING_V2_KEY, "true", {
      maxAge: 7 * 24 * 60 * 60,
      secure: true,
      httpOnly: false,
    });
    return;
  }

  return next();
};
