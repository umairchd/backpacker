import gql from "graphql-tag";

gql`
  fragment BlogPost on BPD_BlogPost {
    title
    link
    categories
    featuredImage {
      id
      homeBlog: imgSrc(transform: { width: 600, height: 800, resizeType: FILL })
      fileName
    }
  }

  query LatestPosts($baseUrl: String!) {
    blog: bpd_blog(first: 12, baseUrl: $baseUrl) {
      url
      posts {
        id
        ...BlogPost
      }
    }
  }

  query LastMinuteProductGrid($targetCurrency: String) {
    products: bpd_lastMinuteDeals {
      ...ProductCard
    }
  }

  query LocalProductGrid($targetCurrency: String) {
    homeLocalDeals: bpd_homeLocalDeals {
      title
      seeAllRelativeUrl
      products {
        ...ProductCard
      }
    }
  }
`;
