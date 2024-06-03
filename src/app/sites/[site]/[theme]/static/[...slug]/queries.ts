import gql from "graphql-tag";

gql`
  fragment StaticPage on BPD_StaticPage {
    id
    __typename
    template
    content
    title
    subTemplate
    menu {
      id
      name
      uri {
        __typename
        ... on BPD_ExternalUri {
          url
        }
        ... on BPD_Uri {
          url
        }
      }
    }
  }

  query AppRouterStaticPage($host: String!, $pathname: String!) {
    page: bpd_page(host: $host, pathname: $pathname) {
      id
      __typename
      template
      ...StaticPage
    }
  }
`;
