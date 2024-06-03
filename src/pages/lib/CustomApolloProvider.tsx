import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren, useEffect } from "react";
import { useApollo } from "../lib/useApollo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomApolloProvider: React.FC<PropsWithChildren<{ pageProps: any }>> = ({ pageProps, children }) => {
  const client = useApollo(pageProps);

  useEffect(() => {
    client.disableNetworkFetches = true;
    return () => {
      client.disableNetworkFetches = false;
    };
  }, [client]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
