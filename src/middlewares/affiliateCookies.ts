/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDays } from "date-fns";
import { type MiddlewareFn } from "./types";
import { NextResponse } from "next/server";

// This for ShareASale cookie
const SHAREASALE_AFFILIATE_ID = "affiliateid";
const SHAREASALE_SSCID = "sscid";
const SHAREASALE_ADDITIONAL_COOKIE_NAME = "sas_add_data";
const SHAREASALE_COOKIE_EXPIRY_TIME = "share_a_sale_cookie_expiry";
const SHAREASALE_COOKIE_LAST_CREATED = "share_a_sale_cookie_created_at";

// This for Commission Factory cookie
const COMMISSION_FACTORY_AFFILIATE_ID = "cfaid";
const COMMISSION_FACTORY_CFCLICK = "cfclick";
const COMMISSION_FACTORY_ADDITIONAL_COOKIE_NAME = "cfjump-add-data";
const COMMISSION_FACTORY_COOKIE_EXPIRY_TIME =
  "commission_factory_cookie_expiry";
const COMMISSION_FACTORY_COOKIE_LAST_CREATED =
  "commission_factory_cookie_created_at";

const shareASaleExpiryDays = Number(
  process.env.SHARE_A_SALE_COOKIE_EXPIRY_DAYS ?? "30"
);

const commissionFactoryExpiryDays = Number(
  process.env.COMMISSION_FACTORY_COOKIE_EXPIRY_DAYS ?? "30"
);

const setCookies = (
  affiliateIdParams: string,
  affiliateId: string,
  cookieExpireTime: string,
  cookieCreatedAt: string,
  cookieName: string,
  affiliateExpiryDays: number,
  url: any,
  res: any
) => {
  const cookieExpiry = addDays(new Date(), affiliateExpiryDays);

  const cookieData = {
    [affiliateIdParams]: affiliateId,
    [cookieExpireTime]: Math.floor(cookieExpiry.getTime() / 1000),
    [cookieCreatedAt]: Math.floor(new Date().getTime() / 1000),
  };

  res.cookies.set(cookieName, JSON.stringify(cookieData), {
    expires: cookieExpiry,
    secure: true,
    httpOnly: true,
  });
};

export const attachAffiliateCookies: MiddlewareFn = async (ctx, next) => {
  const url = ctx.req.nextUrl.clone();

  if (url.searchParams.get(SHAREASALE_AFFILIATE_ID)) {
    // make sure the affiliate id is not empty some time the affiliate id is return null,
    // so this will save first the affiliate id params to a variable
    const affiliateId = url.searchParams.get(SHAREASALE_AFFILIATE_ID) ?? "";

    // this will remove the sscid and affiliateid params from the url
    // if not adding this, the page will turn 500 error code
    url.searchParams.delete(SHAREASALE_SSCID);
    url.searchParams.delete(SHAREASALE_AFFILIATE_ID);
    ctx.res = NextResponse.redirect(url.href);

    setCookies(
      SHAREASALE_AFFILIATE_ID,
      affiliateId,
      SHAREASALE_COOKIE_EXPIRY_TIME,
      SHAREASALE_COOKIE_LAST_CREATED,
      SHAREASALE_ADDITIONAL_COOKIE_NAME,
      shareASaleExpiryDays,
      url,
      ctx.res
    );

    // add the return to set the cookie
    return;
  }

  if (url.searchParams.get(COMMISSION_FACTORY_AFFILIATE_ID)) {
    // make sure the affiliate id is not empty some time the affiliate id is return null
    // so this will save first the affiliate id params to a variable
    const affiliateId =
      url.searchParams.get(COMMISSION_FACTORY_AFFILIATE_ID) ?? "";

    // this will remove the cfclick and cfaid params from the url
    // if not adding this, the page will turn 500 error code
    url.searchParams.delete(COMMISSION_FACTORY_CFCLICK);
    url.searchParams.delete(COMMISSION_FACTORY_AFFILIATE_ID);
    ctx.res = NextResponse.redirect(url.href);

    setCookies(
      COMMISSION_FACTORY_AFFILIATE_ID,
      affiliateId,
      COMMISSION_FACTORY_COOKIE_EXPIRY_TIME,
      COMMISSION_FACTORY_COOKIE_LAST_CREATED,
      COMMISSION_FACTORY_ADDITIONAL_COOKIE_NAME,
      commissionFactoryExpiryDays,
      url,
      ctx.res
    );

    // add the return to set the cookie
    return;
  }

  return next();
};
