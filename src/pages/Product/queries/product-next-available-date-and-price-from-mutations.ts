import gql from "graphql-tag";

gql`
  mutation SavePriceFromAndNextAvailableDate($input: EditProductInput!) {
    savePriceFromAndNextAvailableDate(input: $input) {
      id
      productId
    }
  }
`;
