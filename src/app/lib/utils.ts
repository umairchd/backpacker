import "server-only";

import { headers } from "next/headers";
import { stripSiteFromPathname } from "@@/pages/utils/pathnameUtils";

export function getReq() {
  // mimick the req object
  const headersList = headers();
  return {
    host: process.env.HOST_OVERRIDE ?? headersList.get("host"),
    pathname: stripSiteFromPathname(headersList.get("x-next-pathname")),
  };
}
