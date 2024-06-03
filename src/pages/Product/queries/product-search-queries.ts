import gql from "graphql-tag";

gql`
  query BPDProductSearch(
    $filter: BPD_ProductFilter
    $sortOrder: ProductSortOrder
    $limit: Int
    $offset: Int
    $targetCurrency: String!
  ) {
    products: bpd_products(
      filter: $filter
      sortOrder: $sortOrder
      limit: $limit
      offset: $offset
    ) {
      edges {
        node {
          ...ProductCard
        }
        cursor
      }
      limitOffsetPageInfo {
        totalCount
      }
    }
  }

  query ProductSearch(
    $filter: ProductFilter!
    $sortOrder: ProductSortOrder
    $limit: Int!
    $offset: Int
    $hedgeMode: HedgeMode
    $targetCurrency: String!
  ) {
    products(
      filter: $filter
      limit: $limit
      offset: $offset
      sortOrder: $sortOrder
      hedgeMode: $hedgeMode
      targetCurrency: $targetCurrency
    ) {
      edges {
        node {
          ...ProductCard
        }
      }
      limitOffsetPageInfo {
        totalCount
      }
    }
  }
`;
