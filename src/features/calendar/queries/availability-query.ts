import { gql } from "graphql-tag";

gql`
  fragment AvailabilitySlot on Slot {
    slotId
    prices {
      __typename
      fareType {
        typeName
        displayName
      }
      value {
        ...ProductVariantMoney
      }
      ...LevyFields
      ...TravelloPriceFields
    }
    orderedId
    remainingCount
    totalCount
    date
    isLastMinute
    isTopDeal
    startTime
    endTime
    title
    status
  }

  fragment AvailableDate on AvailableDate {
    date
    slots {
      ...AvailabilitySlot
    }
    hasAvailableSlots
  }

  fragment Availability on ProductAvailability {
    nextAvailableDate
    maximumUnitOrder
    minimumUnitOrder
    availableDates {
      ...AvailableDate
    }
  }

  fragment AvailabilityV2 on AvailabilityDataPayload {
    resSystemType
    slots {
      ...AvailabilityV2Slot
    }
  }

  fragment AvailabilityV2Slot on AvailabilitySlot {
    availabilitySlotKey
    availableCount
    endTime
    endTimeLocal
    isLastMinute
    minQuantity
    maxQuantity
    fares {
      ...AvailabilitySlotFares
    }
    hasAvailableSlots
    startTimeLocal
    status
    totalCount
  }

  fragment AvailabilitySlotFares on AvailabilityFare {
    price {
      discountRulePrice {
        adjustedMoney {
          ...ProductVariantMoney
        }
      }
      fareDiscountPrice {
        adjustedMoney {
          ...ProductVariantMoney
        }
      }
      recommendedRetailPrice {
        adjustedMoney {
          ...ProductVariantMoney
        }
      }
      levyPrice {
        included
        value {
          adjustedMoney {
            ...ProductVariantMoney
          }
        }
      }
      totalPrice {
        adjustedMoney {
          ...ProductVariantMoney
        }
      }
      totalSaving {
        adjustedMoney {
          ...ProductVariantMoney
        }
      }
    }
    availableCount
    maxQuantity
    minQuantity
    resSystemFareTypeId
    resSystemBookingId
    seatUsed
    bpdFareType
    levyLabel
  }

  fragment FareType on FareTypePayload {
    id
    displayName
    originalName
    resSystemFareTypeId
    bpdFareType
  }

  fragment NextAvailablePriceAndDateData on NextAvailableData {
    productId
    nextAvailableDate
    priceFrom {
      amount
      currencyCode
      convertedAmount: bpd_convertedAmount(currencyCode: $targetCurrency)
    }
    priceFromAvailableAt
  }
  fragment NextAvailableData on NextAvailableDateAndPricePayload {
    hasOnlyOneVariant
    hasTwoOrMoreVariantProducts
    availableDateAndPrice {
      ...NextAvailablePriceAndDateData
    }
  }

  query AvailabilityV1($productId: String!, $startDate: DateTime, $days: Int, $targetCurrency: String!) {
    product(productId: $productId) {
      productId
      availability(startDate: $startDate, days: $days) {
        ...Availability
      }
    }
  }

  query AvailabilityV2($input: AvailabilityDataFilter!, $targetCurrency: String!, $fareTypesFilter: FareTypeFilter!) {
    availability(input: $input) {
      ...AvailabilityV2
    }
    fareType(filter: $fareTypesFilter) {
      ...FareType
    }
  }

  query NextAvailableDateAndPrice($input: NextAvailableDateAndPriceFromFilter!, $targetCurrency: String!) {
    nextAvailableDateAndPriceFrom(input: $input) {
      ...NextAvailableData
    }
  }
`;
