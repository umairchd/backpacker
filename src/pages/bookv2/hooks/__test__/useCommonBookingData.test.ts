import { renderHook } from "@testing-library/react";
import { formatPrice } from "@@/pages/components/PriceWidget/utils";
import { useEffect, useMemo, useState } from "react";
import { productAvailability } from "./fixtures/productAvailabilityMocks";

describe("useCommonBookingData", () => {
  it("should return the correct data", () => {
    const currentSlot = "35596919";
    const dateStr = "2023-06-07";
    const fareTypeIds = ["3008", "3009"];
    const selectedCurrency = "AUD";

    const { result } = renderHook(() => {
      const [fareTypesData, setFareTypesData] = useState(null);

      const availabilityData = useMemo(() => {
        if (productAvailability) {
          const availabilityData = productAvailability.find(
            (item) => item.date === dateStr
          );

          if (availabilityData) {
            const slotData = availabilityData.slots.find(
              (item) => item.slotId === currentSlot
            );

            if (slotData) {
              return slotData;
            }
          }
        }

        return null;
      }, [productAvailability, dateStr, currentSlot]);

      useEffect(() => {
        if (fareTypesData === null) {
          if (fareTypeIds.length > 0 && availabilityData) {
            const updatedFareTypesData = fareTypeIds.map((fareId) => {
              const fareType = availabilityData.prices.find(
                (id) => id.fareType.typeName === fareId
              );

              if (fareType) {
                return {
                  id: fareType.fareType.typeName,
                  label: fareType.fareType.displayName,
                  bookingId: fareType.fareType["bookingId"],
                  value: {
                    amount: fareType.value.amount,
                    currencyCode: fareType.value.currencyCode,
                    convertedAmount: {
                      amount: formatPrice(
                        fareType.value.convertedAmount,
                        selectedCurrency
                      ),
                      currencyCode: selectedCurrency,
                    },
                  },
                };
              }

              return null;
            });

            setFareTypesData(updatedFareTypesData);
          }
        }
      }, [availabilityData, fareTypeIds, fareTypesData, selectedCurrency]);

      return { fareTypesData, setFareTypesData };
    });

    const expectedFareTypesData = [
      {
        id: "3008",
        label: "Adult - General Admission",
        bookingId: "2524000208",
        value: {
          amount: 45.94,
          currencyCode: "USD",
          convertedAmount: {
            amount: "69.66",
            currencyCode: "AUD",
          },
        },
      },
      {
        id: "3009",
        label: "Child - General Admission",
        bookingId: "2524000209",
        value: {
          amount: 36.56,
          currencyCode: "USD",
          convertedAmount: {
            amount: "55.44",
            currencyCode: "AUD",
          },
        },
      },
    ];

    expect(result.current.fareTypesData).toEqual(expectedFareTypesData);
  });
});
