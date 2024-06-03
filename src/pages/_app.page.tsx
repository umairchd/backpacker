import React, { useEffect } from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import ServerContextProvider from "@@/pages/lib/ServerContextProvider";
import { disableFragmentWarnings } from "graphql-tag";
import AuthProvider from "@@/pages/auth/AuthProvider";
import { SharedServerSideProps } from "@@/pages/lib/sharedGetServerSideProps-server";
import { ClientInfoProvider } from "@@/app/lib/ClientInfoProvider";
import reportError from "../pages/utils/errorReport";

disableFragmentWarnings();

const StoreProvider = dynamic(() => import("@@/pages/Store/StoreProvider"));
const CustomApolloProvider = dynamic(() => import("@@/pages/lib/CustomApolloProvider"));
const Layout = dynamic(() => import("./Layout/Layout"));

const isServer = typeof window === "undefined";

const CustomApp = function App({ Component, pageProps }: AppProps<SharedServerSideProps>) {
  useEffect(() => {
    //attach built-in global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      const errInfo = {
        message,
        source,
        lineno,
        colno,
        error,
        location: window.location?.href,
      };
      reportError(errInfo);
      return true;
    };
  }, []);

  return (
    <AuthProvider {...pageProps}>
      <CustomApolloProvider pageProps={pageProps}>
        <ServerContextProvider value={pageProps.shared}>
          <StoreProvider {...pageProps}>
            <ThemeProvider>
              <ClientInfoProvider host={pageProps.shared.host}>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </ClientInfoProvider>
            </ThemeProvider>
          </StoreProvider>
        </ServerContextProvider>
      </CustomApolloProvider>
    </AuthProvider>
  );
};

CustomApp.getInitialProps = async ({ Component, ctx, router }: AppContext): Promise<AppInitialProps> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageProps: any = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (isServer) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ctx.req as any).router = router; // hacky way to pass server router to Page level
  }

  return {
    pageProps,
  };
};

export default CustomApp;
