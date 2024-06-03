"use client";

import { ApolloWrapper } from "@@/app/lib/ApolloWrapper";
import AuthProvider from "@@/pages/auth/AuthProvider";
import ServerContextProvider from "@@/pages/lib/ServerContextProvider";
import { type SharedServerSideProps } from "@@/pages/lib/sharedGetServerSideProps-server";
import { disableFragmentWarnings } from "graphql-tag";
import dynamic from "next/dynamic";
import { ClientInfoProvider } from "@@/app/lib/ClientInfoProvider";

disableFragmentWarnings();

const StoreProvider = dynamic(() => import("@@/pages/Store/StoreProvider"));

export default function Providers({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: { shared: SharedServerSideProps["shared"] };
}) {
  return (
    <AuthProvider>
      <ApolloWrapper>
        <ServerContextProvider value={pageProps.shared}>
          <StoreProvider>
            <ClientInfoProvider host={pageProps.shared.host}>
              {children}
            </ClientInfoProvider>
          </StoreProvider>
        </ServerContextProvider>
      </ApolloWrapper>
    </AuthProvider>
  );
}
