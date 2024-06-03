import env from "@@/env";

import type { Metadata } from "next";
import { getReq } from "./lib/utils";
import { globalFonts } from "@@/themes/globalFonts";

import getSeodataByPathname from "./data/getSeodataByPathname";
import getChannelByHost from "./data/getChannelByHost";
import clsx from "clsx";

import "../styles/global.scss";
import "../styles/themes.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export async function generateMetadata(): Promise<Metadata> {
  const { host, pathname } = getReq();
  const [
    {
      seoConfig_title,
      seoConfig_description,
      seoConfig_keywords,
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
    },
    {
      siteConfig: { faviconImage, logoImage },
    },
  ] = await Promise.all([getSeodataByPathname(host, pathname), getChannelByHost(host)]);

  return {
    viewport: "width=device-width, initial-scale=1",
    title: seoConfig_title,
    description: seoConfig_description,
    keywords: seoConfig_keywords,
    alternates: {
      canonical: canonical_url,
      types: {
        "application/rss+xml": [{ url: rss_xml, title: rss_title }],
      },
    },
    openGraph: {
      title: openGraph_title,
      type: openGraph_type as "website",
      description: openGraph_description,
      url: openGraph_url,
      images: [openGraphImage?.fileName ?? logoImage?.logo2x],
      siteName: openGraph_site_name,
    },
    twitter: {
      card: twitterCard_card as "summary",
      title: twitterCard_title,
      site: twitterCard_site,
      description: twitterCard_description,
      images: [twitterCardImage?.fileName ?? logoImage?.logo2x],
    },
    authors: {
      url: canonical_host,
      name: author_title,
    },
    other: {
      language: language,
      "travello:version": env.version,
      "next:router": "app",
    },
    robots: noindex ? "noindex,nofollow" : undefined,
    icons: faviconImage?.favicon,
  };
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const { poppins } = globalFonts();
  return (
    <html
      lang="en"
      className={clsx("theme", poppins.variable)}
    >
      {children}
    </html>
  );
}
