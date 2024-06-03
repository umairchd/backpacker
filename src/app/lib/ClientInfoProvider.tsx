"use client";

import { useEffectOnce } from "react-use";
import { ClientInfoQuery, useClientInfoLazyQuery } from "./ClientInfoProvider.generated";
import { PropsWithChildren, createContext, useContext } from "react";
import gql from "graphql-tag";

gql`
  query ClientInfo($host: String!) {
    clientInfo: bpd_clientInfo(host: $host) {
      clientIP
      countryName
      cityName
      isoCountryCode
      timeZone
      subdivisionName
      currencyCode
    }
  }
`;

const ClientInfoContext = createContext<ClientInfoQuery>({});

function ClientInfoProvider({ host, children }: PropsWithChildren<{ host: string }>) {
  const [getClientInfo, { data = {} }] = useClientInfoLazyQuery({
    variables: { host },
  });
  useEffectOnce(() => {
    getClientInfo(); // make sure this is fetched on client side
  });

  return <ClientInfoContext.Provider value={data}>{children}</ClientInfoContext.Provider>;
}

const useClientContext = () => useContext(ClientInfoContext);

export { ClientInfoProvider, useClientContext };

export type { ClientInfoQuery };
