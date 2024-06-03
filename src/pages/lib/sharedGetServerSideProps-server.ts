import { ApolloClient } from "@apollo/client";
import {
  SharedSiteConfigByPathnameDocument,
  SharedSiteConfigByPathnameQuery,
  SharedSiteConfigByPathnameQueryVariables,
} from "./ServerContextProvider.generated";
import {
  SeodataByPathnameDocument,
  SeodataByPathnameQuery,
  SeodataByPathnameQueryVariables,
} from "@@/app/data/queries.generated";
import { stripSiteFromPathname } from "@@/pages/utils/pathnameUtils";

import env from "@@/env";

const {
  travelloApiKey,
  travelloGraph,
  travelloGraphServerSide,
  travelloRestApi,
  blogUrl,
  serviceName,
  version,
  bpdAssetsBaseUrl,
  shareASaleEnabled,
  shareASaleExpiryDays,
  commissionFactoryExpiryDays,
  enabledResProviders,
  cashbackHosts,
  reviewsIoSection,
  millionDollarLandingPage,
  popUpEnabled,
} = env;

export interface SharedServerSideProps {
  shared: {
    host: string;
    resolvedUrl: string;
    channel: SharedSiteConfigByPathnameQuery["channel"];
    seoData: SeodataByPathnameQuery["seoData"];
    travelloGraph: string;
    travelloGraphServerSide: string;
    travelloRestApi: string;
    travelloApiKey: string;
    version: string;
    blogUrl: string;
    serviceName: string;
    defaultShowSearchBar: boolean;
    mainContainerClass?: string;
    bpdAssetsBaseUrl: string;
    shareASaleEnabled: boolean;
    shareASaleExpiryDays: string;
    commissionFactoryExpiryDays: string;
    clientIP?: string;
    enabledResProviders?: string;
    allStatistics: SharedSiteConfigByPathnameQuery["allStatistics"];
    cashbackHosts?: string[];
    reviewsIoSection?: boolean;
    millionDollarLandingPage?: boolean;
    popUpEnabled?: boolean;
  } & SharedSiteConfigByPathnameQuery["channel"];
}

const sharedGetServerSideProps =
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apolloClient: ApolloClient<any>,
  ) =>
  async ({ req, resolvedUrl }): Promise<SharedServerSideProps> => {
    // these are shared across all sessions and baked to page cache once it is loaded the first time until the page cache expires

    const url = new URL(resolvedUrl, `https://${req.headers.host}`);
    const host = process.env.HOST_OVERRIDE ?? url.hostname;

    const pathname = stripSiteFromPathname(url.pathname);

    const [{ channel, allStatistics }, seoData] = await Promise.all([
      apolloClient
        .query<SharedSiteConfigByPathnameQuery, SharedSiteConfigByPathnameQueryVariables>({
          query: SharedSiteConfigByPathnameDocument,
          variables: {
            host,
          },
          fetchPolicy: "no-cache",
        })
        .then((d) => {
          return d.data;
        }),
      apolloClient
        .query<SeodataByPathnameQuery, SeodataByPathnameQueryVariables>({
          query: SeodataByPathnameDocument,
          variables: {
            host,
            pathname,
          },
          fetchPolicy: "no-cache",
        })
        .then((d) => {
          return d.data.seoData;
        }),
    ]);

    return {
      shared: {
        channel,
        ...channel,
        seoData,
        host,
        resolvedUrl,
        travelloGraph: "/api/next/graphql",
        travelloGraphServerSide,
        travelloRestApi,
        travelloApiKey,
        version,
        serviceName,
        blogUrl,
        defaultShowSearchBar: true,
        bpdAssetsBaseUrl,
        shareASaleEnabled: !!shareASaleEnabled,
        shareASaleExpiryDays,
        commissionFactoryExpiryDays,
        enabledResProviders,
        allStatistics,
        cashbackHosts: (() => {
          try {
            return JSON.parse(cashbackHosts ?? "[]");
          } catch (e) {
            console.error(e);
            return [];
          }
        })(),
        reviewsIoSection,
        millionDollarLandingPage,
        popUpEnabled,
      },
    };
  };

export default sharedGetServerSideProps;
