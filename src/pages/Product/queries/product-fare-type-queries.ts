import gql from "graphql-tag";

gql`
  query ProductFareTypes($fareTypeFilter: FareTypeFilter!) {
    fareType(filter: $fareTypeFilter) {
      ...FareType
    }
  }
`;
