import { getClient } from "@@/app/lib/apolloClient";
import {
  AppRouterRegionPageDocument,
  AppRouterRegionPageQuery,
  AppRouterRegionPageQueryVariables,
  RegionPageFragment,
} from "./queries.generated";
import { getReq } from "@@/app/lib/utils";

import classes from "@@/app/components/Region/StaticRegion.module.scss";

import { MDXRemote } from "next-mdx-remote/rsc";
import clsx from "clsx";
import components from "./components";
import { use } from "react";

export default function Page() {
  const { host, pathname } = getReq();

  const { data } = use(
    getClient().query<AppRouterRegionPageQuery, AppRouterRegionPageQueryVariables>({
      query: AppRouterRegionPageDocument,
      variables: { host, pathname },
    }),
  );

  const page = data.page as RegionPageFragment;

  if (!page.content) {
    return null;
  }

  const source = page.content?.replaceAll("class=", "className=").replace(/style="[^"]*"/, "");

  return (
    <div className={clsx(classes["region-page"])}>
      <MDXRemote
        source={source}
        components={components}
      />
    </div>
  );
}

export const revalidate = 300;
