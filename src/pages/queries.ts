import { gql } from "graphql-tag";

gql`
  fragment BannerImage on Image {
    bannerTop1400: imgSrc(transform: { width: 1272, height: 1272 })
    id
    bannerTop1024: imgSrc(transform: { width: 912, height: 912 })
    bannerTop480: imgSrc(transform: { width: 450, height: 450 })
    bannerTop768: imgSrc(transform: { width: 680, height: 680 })
    altText
    fileName
  }

  query HomePage($host: String!) {
    channel: bpd_channelByHost(host: $host) {
      id
      key
      banners(type: HOME) {
        id
        link
        heading
        images {
          id
          ...BannerImage
        }
      }
      siteConfig {
        id
        homeImage {
          ...HeroImage
        }
        home_header
        home_subheader
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
        promo_title_1
        promo_title_2
        promo_title_3
        promo_title_4
        promo_title_5
        is_homepage_content_active
        homepage_content
        home_schema
      }
    }
  }
`;
