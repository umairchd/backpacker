import { gql } from "graphql-tag";

gql`
  query TextSearch($query: String!, $limit: Int, $channelHost: String) {
    products(
      filter: { textQuery: { text: $query }, channelHostFilter: $channelHost }
      limit: $limit
    ) {
      edges {
        node {
          uri {
            url
          }
          title
        }
      }
    }

    others: bpd_otherSearch(query: $query) {
      cities {
        id
        uri {
          url
        }
        name
      }
      countries {
        id
        uri {
          url
        }
        name
      }
      categories {
        id
        uri {
          url
        }
        name
      }
    }
  }
`;
