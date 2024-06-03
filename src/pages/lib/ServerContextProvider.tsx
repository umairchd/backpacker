"use client";
import { gql } from "graphql-tag";
import { createContext, useContext } from "react";
import { SharedServerSideProps } from "./sharedGetServerSideProps-server";

export type IServerContext = SharedServerSideProps["shared"];

gql`
  query SharedSiteConfigByPathname($host: String!) {
    # for building nav
    allStatistics: productsStatistics {
      countries: countryStatistic {
        ...CountryCardV2
      }
      categories: categoryStatistic {
        ...CategoryCardV2
      }
      cities: cityStatistic {
        ...CityCardV2
      }
    }

    channel: bpd_channelByHost(host: $host) {
      id
      key
      # Nav
      name
      url
      features
      theme
      categories {
        ...CategoryCard
      }
      siteConfig {
        id
        faviconImage {
          id
          favicon: imgSrc
          fileName
        }
        # BottomArea
        contact_company_id
        contact_phones
        contact_mail
        contact_address
        contact_physical_address
        footer_social_links
        contact_facebook_url
        iterable_key
        # Nav
        logoImage {
          id
          logo: imgSrc(transform: { width: 350, height: 350 })
          logo1_5x: imgSrc(transform: { width: 525, height: 525 })
          logo2x: imgSrc(transform: { width: 700, height: 700 })
          fileName
        }
        is_banner_active
        banner_background_color
        banner_background_secondary_color
        banner_heading
        banner_text
        banner_url
        bannerIconImage {
          id
          icon: imgSrc(transform: { width: 30, height: 30 })
        }
        home_last_minute
        contact_links_phone
        contact_physical_phone
        contact_phone_us
        contact_phone_default
        tracking_google_tag_manager
        promo_title_1
        promo_title_2
        promo_title_3
        promo_title_4
        promo_title_5
        is_homepage_content_active
        homepage_content
      }
      supportedCurrencies {
        id
        name
        isoSymbol
        uniRate
        symbol
      }
      paymentProviders
    }
  }
`;

const ServerContext = createContext<IServerContext>(null);
export const useServerContext = () => {
  const context = useContext(ServerContext);

  return {
    ...context,
    asset(src: string) {
      return src.startsWith("/") ? `${context.bpdAssetsBaseUrl}${src}` : src;
    },
    localAsset(src: string) {
      return src.startsWith("/") ? `https://${context.host}${src}` : src;
    },
    shouldShowCashback: context?.cashbackHosts?.includes(context.host),
    shouldShowReviewsIoSection: context?.reviewsIoSection,
    shouldShowMillionDollarLandingPage: context?.millionDollarLandingPage,
    shouldShowPopUp: context?.popUpEnabled,
  };
};

const ServerContextProvider = ServerContext.Provider;
export default ServerContextProvider;
