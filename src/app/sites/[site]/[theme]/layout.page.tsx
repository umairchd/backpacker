import Script from "next/script";

import type { Metadata, ResolvingMetadata } from "next";
import getChannelByHost from "@@/app/data/getChannelByHost";
import Layout from "./Layout";
import Providers from "@@/app/lib/Providers";
import { type SharedServerSideProps } from "@@/pages/lib/sharedGetServerSideProps-server";

import env from "@@/env";
import getAllProductStatistics from "@@/app/data/getAllProductStatistics";
import getSeodataByPathname from "@@/app/data/getSeodataByPathname";
import { getReq } from "@@/app/lib/utils";
import { use } from "react";
import BottomArea from "@@/pages/Layout/BottomArea";

const {
  travelloApiKey,
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

export type ThemeLayoutProps = {
  params: { channelId: string; site: string; theme: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: ThemeLayoutProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    other: {
      "travello:theme": params.theme,
    },
  };
}

export default function ThemeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ThemeLayoutProps["params"];
}) {
  const { theme } = params;
  const { host, pathname } = getReq();
  const [channel, allStatistics] = use(Promise.all([getChannelByHost(host), getAllProductStatistics()]));

  const shared: SharedServerSideProps["shared"] = {
    host,
    resolvedUrl: "invalid", // resolvedUrl is no longer available
    seoData: {} as any, // seoData should not be used here
    channel,
    ...channel,
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
  };

  const { seoConfig_schema } = use(getSeodataByPathname(channel.url, pathname));

  const { siteConfig: { tracking_google_tag_manager } = {} } = channel;

  return (
    <body className={theme}>
      <Providers pageProps={{ shared }}>
        <Layout
          {...{
            channel,
            bottomEl: <BottomArea theme={theme} />,
          }}
        >
          {children}
        </Layout>
      </Providers>

      {tracking_google_tag_manager && (
        <>
          <Script
            id={`gtm-${tracking_google_tag_manager}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${tracking_google_tag_manager}');
            `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tracking_google_tag_manager}" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`,
            }}
          />
        </>
      )}
      <div
        id="seoConfig_schema"
        dangerouslySetInnerHTML={{ __html: seoConfig_schema }}
        suppressHydrationWarning
      />
    </body>
  );
}
