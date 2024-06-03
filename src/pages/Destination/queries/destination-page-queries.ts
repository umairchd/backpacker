import gql from "graphql-tag";

gql`
  fragment DestinationHeader on BPD_LandingPage {
    image {
      id
      ...HeroImage
    }
    header
    subheader
    teaser
  }

  fragment TopActivityBannerCardImage on Image {
    id
    topActivityCard: imgSrc(transform: { width: 415, height: 372, resizeType: FILL })
    altText
    fileName
  }

  query ProductStatistics($filter: ProductFilter) {
    productsStatistics(filter: $filter) {
      countryStatistic {
        id
        name
        uniqueName
        productCount
      }
      cityStatistic {
        id
        name
        uniqueName
        productCount
      }
      categoryStatistic {
        id
        name
        uniqueName
        productCount
      }
    }
  }

  query MoreActivities($host: String!, $pathname: String!, $targetCurrency: String!) {
    bpd_page(host: $host, pathname: $pathname) {
      ... on BPD_ListPage {
        id
        products {
          ...ProductCard
        }
      }
    }
  }

  query TopActivityBanner($host: String!) {
    bpd_channelByHost(host: $host) {
      id
      banners(type: LISTING) {
        id
        images {
          id
          ...TopActivityBannerCardImage
        }
        link
      }
    }
  }
`;
