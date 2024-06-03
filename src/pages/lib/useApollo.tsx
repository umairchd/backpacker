/**
 * warning: this is experimental and hacky way do ssr with apollo client,
 * please make sure you fully understand how this works before attempting to use it
 */

import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { useMemo } from "react";
import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import ServerContextProvider from "./ServerContextProvider";
import StoreProvider from "../Store/StoreProvider";
import { GetServerSidePropsContext } from "next";
import AuthProvider from "../auth/AuthProvider";
import Layout from "../Layout/Layout";
import { SharedServerSideProps } from "./sharedGetServerSideProps-server";
import { setContext } from "@apollo/client/link/context";
import memoize from "lodash/memoize";
import { ClientInfoProvider } from "@@/app/lib/ClientInfoProvider";
import { ThemeProvider } from "next-themes";

import env from "@@/env";

const { travelloApiKey, travelloGraphServerSide, serviceName, version } = env;

const isServer = typeof window === "undefined";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

type IsomophicLinkOptions = {
  endpoint: string;
  apiKey: string;
  serviceName: string;
  version: string;
  fetch?: typeof fetch;
  headers: any;
};

const getIsomophicHttpLink = (options: Partial<IsomophicLinkOptions> = {}) => {
  const combinedOptions: IsomophicLinkOptions = {
    endpoint: travelloGraphServerSide,
    apiKey: travelloApiKey,
    serviceName,
    version,
    fetch,
    headers: {},
    ...options,
  };

  const headers = combinedOptions.headers;

  return new HttpLink({
    uri: combinedOptions.endpoint,
    headers,
    fetch: combinedOptions.fetch,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let apolloClient: ApolloClient<any>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export type HeadersResolver = () => Promise<Record<string, string>>;

export function initializeApollo(
  initialState = null,
  options?: Partial<IsomophicLinkOptions>,
  forceNew = false,
  authHeadersResolver: HeadersResolver = async () => ({}),
) {
  const memoizedAuthHeadersResolver = memoize(authHeadersResolver); // make sure all share the same authHeaderResolver
  const asyncAuthLink = setContext(async (op, prevContext) => {
    const headers = await memoizedAuthHeadersResolver();
    return { ...prevContext, headers: { ...prevContext.headers, ...headers } };
  });

  const _apolloClient =
    apolloClient && !forceNew
      ? apolloClient
      : new ApolloClient({
          ssrMode: isServer,
          ssrForceFetchDelay: 100, // in milliseconds
          link: from([errorLink, asyncAuthLink, getIsomophicHttpLink(options)]),
          cache: new InMemoryCache({
            typePolicies: {
              BPD_Category: {
                merge: true,
              },
              BPD_Country: {
                merge: true,
              },
              BPD_City: {
                merge: true,
              },
              BPD_SiteConfig: {
                merge: true,
              },
              BPD_Uri: {
                keyFields: ["url"],
                merge: true,
              },
              BPD_Channel: {
                merge: true,
              },
              Image: {
                merge: true,
              },
              Product: {
                keyFields: ["productId"],
                merge: true,
              },
              Money: {
                merge: false,
              },
            },
          }),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: isServer ? "network-only" : undefined,
              errorPolicy: "all",
            },
            query: {
              fetchPolicy: isServer ? "network-only" : undefined,
              errorPolicy: "all",
            },
            mutate: {
              fetchPolicy: isServer ? "network-only" : undefined,
              errorPolicy: "all",
            },
          },
        });

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = deepMergeCache(existingCache, initialState);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

function deepMergeCache(existingCache, newCache) {
  return merge(existingCache, newCache, {
    // combine arrays using object equality (like in sets)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
    ],
  });
}

export async function addApolloState(
  client,
  pageProps,
  Component?: AppProps["Component"],
  ctx?: GetServerSidePropsContext,
) {
  if (pageProps?.props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router: NextRouter | undefined = (ctx?.req as any)?.router;

    if (Component && router) {
      const { props } = pageProps;
      /**
       * hacky way to try to prepass the entire page to populate apolloClient.cache
       * this is meant to be almost the same as CustomApp component
       * except RouterContext.Provider and ApolloProvider
       */
      await getDataFromTree(
        <RouterContext.Provider value={router}>
          <AuthProvider {...props}>
            <ApolloProvider client={client}>
              <ServerContextProvider value={props.shared}>
                <StoreProvider {...props}>
                  <ClientInfoProvider host={props.shared.host}>
                    <ThemeProvider>
                      <Layout {...props}>
                        <Component {...props} />
                      </Layout>
                    </ThemeProvider>
                  </ClientInfoProvider>
                </StoreProvider>
              </ServerContextProvider>
            </ApolloProvider>
          </AuthProvider>
        </RouterContext.Provider>,
      );
    }

    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: AppProps<SharedServerSideProps>["pageProps"]) {
  const state = useMemo(() => {
    return pageProps[APOLLO_STATE_PROP_NAME];
  }, [pageProps]);
  const client = useMemo(() => {
    return initializeApollo(
      state,
      {
        endpoint: pageProps.shared?.travelloGraph,
        apiKey: pageProps.shared?.travelloApiKey,
        serviceName: pageProps.shared?.serviceName,
        version: pageProps.shared?.version,
      },
      false,
    );
  }, [state, pageProps.shared]);
  return client;
}
