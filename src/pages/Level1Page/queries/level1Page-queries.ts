import { gql } from "graphql-tag";

gql`
  query Level1Page(
    $host: String!
    $pathname: String!
    $currencyCode: String
    $targetCurrency: String
  ) {
    page: bpd_page(host: $host, pathname: $pathname) {
      id
      __typename
      template
      ...RegionPage
      ...StaticPage
      ...ListPage
      ...ProductPage
    }
  }

  query ListPageProductStatistics($filter: ProductFilter) {
    productsStatistics(filter: $filter) {
      countries: countryStatistic {
        id
        country {
          id
          name
          uniqueName
          uri {
            url
          }
        }
        productCount
      }

      cities: cityStatistic {
        id
        city {
          id
          name
          uniqueName
          uri {
            url
          }
          country {
            id
            name
            uniqueName
          }
        }
        productCount
      }
      categories: categoryStatistic {
        id
        category {
          id
          name
          uniqueName
        }
        productCount
      }
    }
  }
`;
