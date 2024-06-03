"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import React, { FC, PropsWithChildren, useEffect, useMemo } from "react";
import type { SharedServerSideProps } from "../lib/sharedGetServerSideProps-server";
import { useRouter } from "next/router";
import { useServerContext } from "../lib/ServerContextProvider";
import SearchBarAnimationEffectStateProvider, {
  useSearchBarAnimationEffectState,
} from "@@/features/search/components/hooks/SearchBarAnimationEffectStateProvider";
import { Bpd_Page } from "@@/types.generated";
import { useBreakpoints } from "@@/features/utils";
import { getOpenGraphImage } from "./hooks";

import "../../styles/global.scss";
import "../../styles/themes.scss";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { MainProps } from "./types";
import clsx from "clsx";
import Nav from "./Nav";
import { useTheme } from "next-themes";
import { globalFonts } from "@@/themes/globalFonts";
import BottomArea from "./BottomArea";

const FullscreenSearch = dynamic(() => import("@@/features/search/components/FullscreenSearch/FullscreenSearch"), {
  ssr: false,
});

const Main: FC<MainProps> = ({ children, mainContainerClass, isBannerActive }) => {
  const [isObscured] = useSearchBarAnimationEffectState();
  const { mdUp: isDesktop } = useBreakpoints();
  const isBanner = isBannerActive ?? false;

  const navOffset = isBanner ? "" : "transition-all duration-200 ease-in-out";

  const getStyles = () => {
    return isObscured && navOffset;
  };

  const styleNav = getStyles();

  return <main className={clsx(isDesktop ? navOffset : styleNav, mainContainerClass)}>{children}</main>;
};

export const useLayoutConfig = () => {
  const { query } = useRouter();
  return {
    noLayout: query.raw === "1",
  };
};

const Layout: React.FC<PropsWithChildren<SharedServerSideProps> & { page?: Bpd_Page }> = ({ children, page }) => {
  const router = useRouter();

  const {
    version,
    theme,
    seoData: {
      seoConfig_title,
      seoConfig_description,
      seoConfig_keywords,
      seoConfig_schema,
      openGraph_title,
      openGraph_type,
      openGraph_description,
      openGraph_url,
      openGraphImage,
      openGraph_site_name,
      twitterCard_card,
      twitterCard_site,
      twitterCard_title,
      twitterCard_description,
      twitterCardImage,
      author_title,
      canonical_host,
      canonical_url,
      rss_title,
      rss_xml,
      language,
      noindex,
    } = {},
    siteConfig: { faviconImage, tracking_google_tag_manager, is_banner_active } = {},
    defaultShowSearchBar,
    mainContainerClass,
  } = useServerContext();

  const layoutConfig = useLayoutConfig();

  const { theme: nextTheme, setTheme } = useTheme();

  useEffect(() => {
    if (nextTheme !== theme) {
      setTheme(theme);
    }

    // hack to set global font
    globalFonts();
  }, [nextTheme, theme]);

  const contentEl = useMemo(() => {
    if (layoutConfig.noLayout) {
      return <>{children}</>;
    }

    return (
      <>
        <SearchBarAnimationEffectStateProvider initialValue={defaultShowSearchBar}>
          <Nav />
          <Main
            mainContainerClass={mainContainerClass}
            isBannerActive={is_banner_active}
          >
            {children}
          </Main>
          <BottomArea theme={theme} />

          <FullscreenSearch router={router} />
        </SearchBarAnimationEffectStateProvider>
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
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tracking_google_tag_manager}" height="0" width="0" style="display:none;visibility:hidden;" loading="lazy"></iframe>`,
              }}
            />
          </>
        )}
      </>
    );
  }, [
    BottomArea,
    children,
    defaultShowSearchBar,
    mainContainerClass,
    layoutConfig,
    tracking_google_tag_manager,
    is_banner_active,
    router,
  ]);

  const addNoIndex =
    noindex || (page && page["__typename"] === "BPD_ProductPage" && page["product"]?.legacy?.hasNoIndexMetaTag);

  const { openGraph_image, twitterCard_image } = getOpenGraphImage({
    openGraphImage,
    twitterCardImage,
  });

  const date = new Date().getTime();
  const ogImageNoCache = `${openGraph_image?.toString()}?v=${date}`;
  const twitterImageNoCache = `${twitterCard_image?.toString()}?v=${date}`;
  const isHomePath = router?.asPath === "/";
  const isBpdHome = isHomePath && router?.query?.site === "backpackerdeals";
  const canonicalUrl = isHomePath ? canonical_host : canonical_url;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          httpEquiv="x-ua-compatible"
          content="ie=edge"
        />
        <title>{seoConfig_title}</title>
        {addNoIndex && (
          <meta
            name="robots"
            content={"noindex,nofollow"}
          />
        )}
        {!isBpdHome && (
          <link
            rel="canonical"
            href={canonicalUrl}
          />
        )}
        <meta
          name="language"
          content={language}
        />
        <meta
          name="description"
          content={seoConfig_description}
        />
        {seoConfig_keywords && (
          <meta
            name="keywords"
            content={seoConfig_keywords}
          />
        )}
        <meta
          name="og:title"
          content={openGraph_title}
        />
        <meta
          name="og:type"
          content={openGraph_type}
        />
        <meta
          name="og:description"
          content={openGraph_description}
        />
        <meta
          name="og:url"
          content={openGraph_url}
        />
        <meta
          name="og:image"
          content={ogImageNoCache}
        />
        <meta
          name="og:site_name"
          content={openGraph_site_name}
        />
        <meta
          name="twitter:card"
          content={twitterCard_card}
        />
        <meta
          name="twitter:title"
          content={twitterCard_title}
        />
        <meta
          name="twitter:site"
          content={twitterCard_site}
        />
        <meta
          name="twitter:description"
          content={twitterCard_description}
        />
        <meta
          name="twitter:image"
          content={twitterImageNoCache}
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={faviconImage?.favicon}
        />
        <meta
          name="travello:version"
          content={version}
        />
        <meta
          name="travello:theme"
          content={theme}
        />
        <link
          href={canonical_host}
          rel="author"
          title={author_title}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={rss_title}
          href={rss_xml}
        />
      </Head>
      {contentEl}
      <div
        dangerouslySetInnerHTML={{ __html: seoConfig_schema }}
        suppressHydrationWarning
      />
    </>
  );
};

export default Layout;
