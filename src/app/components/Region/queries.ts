import gql from "graphql-tag";

gql`
  query ProductsByIds($filter: ProductFilter!, $targetCurrency: String) {
    products(filter: $filter, targetCurrency: $targetCurrency) {
      edges {
        node {
          ...ProductCard
        }
      }
    }
  }
`;
