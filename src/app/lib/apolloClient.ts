import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import env from "@@/env";
import { memoryCacheConfig } from "./apolloConfig";

const { travelloApiKey, travelloGraphServerSide, serviceName, version } = env;

/**
 * this requires all queries for RSC to work without auth
 * all code are tied to req and res objects currently, where it is absent in the new structure
 * unfortunately this means all auth code will need to be modified to make it work without req and res objects
 */
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    ssrMode: true,
    name: serviceName,
    version,
    cache: new InMemoryCache(memoryCacheConfig),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: travelloGraphServerSide,
      headers: {
        "X-API-KEY": travelloApiKey,
        "Content-Type": "application/json",
      },
    }),
    ssrForceFetchDelay: 100,
  });
});
