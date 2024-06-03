// eslint-disable-next-line
import { type NextRequest, NextResponse } from "next/server";
import { fetchFromGraph } from "./clients";
import {
  MiddlewareRedirectOrRewriteDocument,
  MiddlewareRedirectOrRewriteQuery,
  MiddlewareRedirectOrRewriteQueryVariables,
} from "./queries.generated";
import compact from "lodash/compact";
import { type MiddlewareFn } from "./types";

const NEXT_TEMPLATES = new Set(["BPD_RegionPage", "BPD_StaticPage", "BPD_ListPage", "BPD_ProductPage"]);
const excludedPaths = ["/travello-million-dollar-traveller", "/campervan-hire", "/car-rental"];

const checkPathnameStartsWith = (pathname: string): boolean => {
  return excludedPaths.some((prefix) => pathname?.startsWith(prefix));
};

function shouldSkipRewrite(req: NextRequest): boolean {
  const oldUrl = req.nextUrl;

  if (oldUrl.pathname === "/") {
    return true;
  }

  if (oldUrl.pathname.includes("/bookv2")) {
    return true;
  }

  if (checkPathnameStartsWith(oldUrl.pathname)) {
    return true;
  }

  /**
   * these routes are handled in nextjs and should not be rewritten
   */
  return ["/top-destinations", "/last-minute"].includes(oldUrl.pathname);
}

export const processRedirectAndRewrite: MiddlewareFn = async (ctx, next) => {
  if (shouldSkipRewrite(ctx.req)) {
    ctx.res.headers.set("x-page-type", "next");
    return next();
  }

  const oldUrl = ctx.req.nextUrl.clone();
  const newUrl = new URL(`${process.env.BPD_MAIN_BASEPATH}${compact([oldUrl.pathname, oldUrl.search]).join("")}`);

  const host = process.env.HOST_OVERRIDE ?? ctx.req.headers.get("Host");

  try {
    const { redirect, page } = await fetchFromGraph<
      MiddlewareRedirectOrRewriteQuery,
      MiddlewareRedirectOrRewriteQueryVariables
    >({
      query: MiddlewareRedirectOrRewriteDocument,
      variables: {
        host,
        pathname: oldUrl.pathname,
      },
      next: {
        revalidate: 600,
      },
    }).then((d) => d.data ?? {});

    if (redirect) {
      ctx.res = NextResponse.redirect(new URL(redirect.newUrl, oldUrl), redirect.status);
      return;
    }

    if (NEXT_TEMPLATES.has(page?.__typename)) {
      ctx.res.headers.set("x-page-type", page.__typename.replace("BPD_", "").replace("Page", "").toLowerCase());
      return next();
    }

    ctx.res = NextResponse.rewrite(newUrl);
    return;
  } catch (e) {
    ctx.res = NextResponse.rewrite(newUrl);
    return;
  }
};
