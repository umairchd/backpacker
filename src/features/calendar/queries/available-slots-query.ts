import gql from "graphql-tag";

gql`
  fragment AvailableSlot on AvailabilitySlot {
    hasAvailableSlots
    availableCount
    status
    startTimeLocal
    endTimeLocal
    fares {
      ...AvailabilitySlotFares
    }
  }

  query AvailableSlots(
    $input: AvailabilityDataFilter!
    $targetCurrency: String!
  ) {
    availability(input: $input) {
      resSystemType
      slots {
        ...AvailableSlot
      }
    }
  }
`;
