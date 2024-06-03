import gql from "graphql-tag";

gql`
  fragment BlogImage on Image {
    id
    blog: imgSrc(transform: { width: 585, height: 367, enlarge: true, resizeType: FILL })
    regionCategoryCard: imgSrc(transform: { width: 900, height: 350, enlarge: true, resizeType: FILL })
    fileName
  }

  fragment ImageSliderImage on Image {
    id
    small1400: imgSrc(transform: { width: 408, height: 600 })
    fileName
  }

  fragment PlaceImage on Image {
    id
    medium3200: imgSrc(transform: { width: 840, height: 600 })
    medium1100: imgSrc(transform: { width: 600, height: 600 })
    medium800: imgSrc(transform: { width: 500, height: 600 })
    fileName
  }

  query SharedChannelByHost($host: String!) {
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

  query BlogImage($url: String!) {
    transformImage: imgTransformImage(url: $url) {
      ...BlogImage
    }
  }

  query GalleryImage($url: String!) {
    transformImage: imgTransformImage(url: $url) {
      id
      ...HeroImage
      ...BlogImage
    }
  }

  query ImageSliderImage($url: String!) {
    transformImage: imgTransformImage(url: $url) {
      ...ImageSliderImage
    }
  }

  query PlaceImage($url: String!) {
    transformImage: imgTransformImage(url: $url) {
      ...PlaceImage
    }
  }

  query SeodataByPathname($host: String!, $pathname: String!) {
    seoData: bpd_seoData(host: $host, pathname: $pathname) {
      id
      openGraph_title
      openGraph_type
      openGraph_url
      openGraphImage {
        id
        fileName
      }
      openGraph_description
      twitterCard_card
      twitterCard_title
      twitterCard_description
      twitterCardImage {
        id
        fileName
      }
      seoConfig_title
      seoConfig_description
      seoConfig_keywords
      openGraph_site_name
      twitterCard_site
      seoConfig_schema
      canonical_url
      amp_url
      author_title
      rss_title
      rss_xml
      language
      noindex
      canonical_host
    }
  }

  query AllProductStatistics {
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
  }
`;
