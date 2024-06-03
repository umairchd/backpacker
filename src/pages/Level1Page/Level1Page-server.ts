import type { GetServerSideProps } from "next";

import sharedGetServerSideProps, { SharedServerSideProps } from "@@/pages/lib/sharedGetServerSideProps-server";
import {
  Level1PageQuery,
  Level1PageQueryVariables,
  Level1PageDocument,
  ListPageProductStatisticsQuery,
  ListPageProductStatisticsQueryVariables,
  ListPageProductStatisticsDocument,
} from "@@/pages/Level1Page/queries/level1Page-queries.generated";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { addApolloState, initializeApollo } from "../lib/useApollo";
import Level1Page from "./Level1Page";

import { fetch } from "../lib/serverUtils";
import compact from "lodash/compact";
import { ApolloClient } from "@apollo/client";
import { getHeaders } from "../auth/sessionUtils";
import { stripSiteFromPathname } from "@@/pages/utils/pathnameUtils";

export type OneSlugPageProps = SharedServerSideProps &
  Level1PageQuery &
  ListPageProductStatisticsQuery & { mdxSource?: MDXRemoteSerializeResult };

export const getServerSideProps: GetServerSideProps<OneSlugPageProps> = async (context) => {
  // these are shared across all sessions and baked to page cache once it is loaded the first time until the page cache expires

  const { req, resolvedUrl, res } = context;
  const url = new URL(resolvedUrl, `https://${req.headers.host}`);
  const host = process.env.HOST_OVERRIDE ?? url.hostname;

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
      .query<Level1PageQuery, Level1PageQueryVariables>({
        query: Level1PageDocument,
        variables: {
          host,
          pathname,
        },
        fetchPolicy: "no-cache",
      })
      .then((d) => d.data),
  ]);

  if (otherProps.page?.__typename === "BPD_ProductPage") {
    if (process.env.CACHE_CONTROL) {
      res.setHeader("Cache-Control", process.env.CACHE_CONTROL);
    }

    return addApolloState(
      apolloClient,
      {
        props: {
          ...sharedProps,
          ...otherProps,
        },
      },
      Level1Page,
      context
    );
  }

  if (otherProps.page?.__typename === "BPD_ListPage") {
    if (process.env.CACHE_CONTROL) {
      res.setHeader("Cache-Control", process.env.CACHE_CONTROL);
    }

    const { country, city, category } = otherProps.page;

    const statistics = await getProductStatistics(apolloClient)(
      country?.uniqueName,
      city?.uniqueName,
      category?.uniqueName
    );

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

  if (process.env.CACHE_CONTROL) {
    res.setHeader("Cache-Control", process.env.CACHE_CONTROL);
  }

  return addApolloState(
    apolloClient,
    {
      props: {
        ...sharedProps,
        ...otherProps,
      },
    },
    Level1Page,
    context
  );
};

export const getProductStatistics =
  (apolloClient: ApolloClient<unknown>) =>
  async (countryUniqueName?: string, cityUniqueName?: string, categoryUniqueName?: string) => {
    const [
      {
        productsStatistics: { cities },
      },
      {
        productsStatistics: { categories },
      },
    ] = await Promise.all([
      apolloClient
        .query<ListPageProductStatisticsQuery, ListPageProductStatisticsQueryVariables>({
          query: ListPageProductStatisticsDocument,
          variables: {
            filter: {
              countryUniqueNames: compact([countryUniqueName]),
              categoryUniqueNames: compact([categoryUniqueName]),
            },
          },
          fetchPolicy: "no-cache",
        })
        .then((d) => d.data),
      apolloClient
        .query<ListPageProductStatisticsQuery, ListPageProductStatisticsQueryVariables>({
          query: ListPageProductStatisticsDocument,
          variables: {
            filter: {
              countryUniqueNames: compact([countryUniqueName]),
              cityUniqueNames: compact([cityUniqueName]),
            },
          },
          fetchPolicy: "no-cache",
        })
        .then((d) => d.data),
    ]);

    return <ListPageProductStatisticsQuery>{
      productsStatistics: { categories, cities },
    };
  };
