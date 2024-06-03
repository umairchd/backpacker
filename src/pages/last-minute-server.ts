import type { GetServerSideProps } from "next";
import { gql } from "graphql-tag";

import sharedGetServerSideProps, {
  SharedServerSideProps,
} from "@@/pages/lib/sharedGetServerSideProps-server";
import requestIp from "request-ip";
import { addApolloState, initializeApollo } from "@@/pages/lib/useApollo";
import {
  LastMinutePageDocument,
  LastMinutePageQuery,
  LastMinutePageQueryVariables,
} from "@@/pages/last-minute-server.generated";

import { fetch } from "@@/pages/lib/serverUtils";
import Level1Page from "@@/pages/Level1Page/Level1Page";
import { ListPageProductStatisticsQuery } from "@@/pages/Level1Page/queries/level1Page-queries.generated";
import { getProductStatistics } from "@@/pages/Level1Page/Level1Page-server";
import { getHeaders } from "@@/pages/auth/sessionUtils";
import { stripSiteFromPathname } from "@@/pages/utils/pathnameUtils";

// hacks

gql`
  query LastMinutePage($host: String!, $pathname: String!, $clientIP: String) {
    page: bpd_page(host: $host, pathname: $pathname, clientIP: $clientIP) {
      id
      __typename
      template
      ...ListPage
    }
  }
`;

export type LastMinutePageProps = SharedServerSideProps &
  LastMinutePageQuery &
  ListPageProductStatisticsQuery;

export const getServerSideProps: GetServerSideProps<
  LastMinutePageProps
> = async (context) => {
  // these are shared across all sessions and baked to page cache once it is loaded the first time until the page cache expires

  const { req, resolvedUrl, res } = context;
  const url = new URL(resolvedUrl, `https://${req.headers.host}`);
  const host = process.env.HOST_OVERRIDE ?? url.hostname;
  const clientIP = process.env.CLIENTIP_OVERRIDE ?? requestIp.getClientIp(req); // user location sensitive pages

  const apolloClient = initializeApollo(
    undefined,
    {
      fetch,
      headers: getHeaders(),
    },
    true
  );

  const pathname = stripSiteFromPathname(url.pathname);

  const [sharedProps, otherProps] = await Promise.all([
    sharedGetServerSideProps(apolloClient)(context),
    apolloClient
      .query<LastMinutePageQuery, LastMinutePageQueryVariables>({
        query: LastMinutePageDocument,
        variables: {
          host,
          pathname,
          clientIP,
        },
        fetchPolicy: "no-cache",
      })
      .then((d) => d.data),
  ]);

  if (otherProps.page?.__typename === "BPD_ListPage") {
    const { country, city } = otherProps.page;

    const statistics = await getProductStatistics(apolloClient)(
      country?.uniqueName,
      city?.uniqueName
    );
    res.setHeader(
      "Cache-Control",
      "private,max-age=60,s-maxage=300,stale-while-revalidate=60"
    ); // we don't want to cache location sensitive pages

    return addApolloState(
      apolloClient,
      {
        props: {
          ...sharedProps,
          ...otherProps,
          ...statistics,
        },
      },
      Level1Page,
      context
    );
  }
  return {
    props: {
      ...sharedProps,
      ...otherProps,
    },
  };
};
