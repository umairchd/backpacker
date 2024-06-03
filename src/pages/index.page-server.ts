import type { GetServerSideProps } from "next";
import { HomePageDocument } from "./queries.generated";
import sharedGetServerSideProps, {
  SharedServerSideProps,
} from "@@/pages/lib/sharedGetServerSideProps-server";
import { addApolloState, initializeApollo } from "@@/pages/lib/useApollo";

import { fetch } from "@@/pages/lib/serverUtils";
import HomePage from "./sites/[site]/[theme]/next/index.page";
import { getHeaders } from "@@/pages/auth/sessionUtils";

export const getServerSideProps: GetServerSideProps<
  SharedServerSideProps
> = async (context) => {
  // these are shared across all sessions and baked to page cache once it is loaded the first time until the page cache expires

  const { req, res } = context;

  const url = new URL(req.url, `https://${req.headers.host}`);
  const host = process.env.HOST_OVERRIDE ?? url.hostname;

  const apolloClient = initializeApollo(
    undefined,
    { fetch, headers: getHeaders() },
    true
  );

  const [sharedProps, { data: pageProps }] = await Promise.all([
    sharedGetServerSideProps(apolloClient)(context),
    apolloClient.query({
      query: HomePageDocument,
      variables: {
        host,
      },
      fetchPolicy: "no-cache",
    }),
  ]);

  if (process.env.CACHE_CONTROL) {
    res.setHeader("Cache-Control", process.env.CACHE_CONTROL);
  }

  return addApolloState(
    apolloClient,
    {
      props: {
        ...sharedProps,
        ...pageProps,
        shared: {
          ...sharedProps.shared,
          defaultShowSearchBar: false,
          mainContainerClass: "home-page",
        },
      },
    },
    HomePage,
    context
  );
};
