import gql from "graphql-tag";

gql`
  fragment RegionPage on BPD_RegionPage {
    id
    __typename
    template
    content
    title
  }

  query AppRouterRegionPage($host: String!, $pathname: String!) {
    page: bpd_page(host: $host, pathname: $pathname) {
      id
      __typename
      template
      ...RegionPage
    }
  }
`;
