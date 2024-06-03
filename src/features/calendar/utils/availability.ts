import dayjs from "dayjs";
import { nanoid } from "nanoid";

import {
  AvailabilityFragment,
  AvailabilitySlotFaresFragment,
  AvailabilityV2Query,
  FareTypeFragment,
} from "@@/features/calendar/queries/availability-query.generated";
import { ProductFragment } from "@@/pages/Product/queries/product-queries.generated";
import { AvailabilitySlotStatusEnum, SlotStatusEnum } from "@@/types.generated";

const availabilitySlotStatusToSlotStatus = (status: AvailabilitySlotStatusEnum): SlotStatusEnum => {
  switch (status) {
    case AvailabilitySlotStatusEnum.Available:
      return SlotStatusEnum.Available;
    case AvailabilitySlotStatusEnum.SoldOut:
      return SlotStatusEnum.SoldOut;
    case AvailabilitySlotStatusEnum.Unavailable:
      return SlotStatusEnum.Unavailable;
  }
};

const hasValidFareType = (
  fares: Array<AvailabilitySlotFaresFragment>,
  enabledFareTypes: Array<FareTypeFragment>,
): boolean => {
  return (
    fares.length > 0 &&
    enabledFareTypes.length > 0 &&
    fares.some((fare) => {
      return enabledFareTypes.some((enabledFareType) => {
        return fare?.resSystemFareTypeId === enabledFareType?.resSystemFareTypeId;
      });
    })
  );
};

export const convertAvailabilityV2 = (
  product: ProductFragment,
  availabilityData: AvailabilityV2Query,
  isNewBookingFlowEnabled: boolean,
  availableDates?: string[],
): ProductFragment & { availability?: AvailabilityFragment } => {
  if (product && availabilityData) {
    const { availability, fareType: fareTypes } = availabilityData;
    const discounts = [];

    const result = {
      ...product,
      priceFrom: product.priceFrom || product.legacy.priceFrom,
      availability: {
        nextAvailableDate: product?.nextAvailableDate,
        minimumUnitOrder: availability?.slots ? availability.slots[0]?.minQuantity : 0,
        maximumUnitOrder: availability?.slots ? availability.slots[0]?.maxQuantity : null,
        availableDates: availableDates?.map((date) => {
          const availableSlots =
            availability?.slots?.filter((slot) => {
              return slot.startTimeLocal.split(" ")[0] === date && hasValidFareType(slot?.fares, fareTypes);
            }) || [];

          const getConvertedTime = (dateString: string) => {
            return dayjs(dateString).format("hh:mm A");
          };

          return {
            date,
            hasAvailableSlots: availableSlots.length > 0,
            slots: availableSlots
              .map((availabilitySlot) => {
                const res = [];
                const commonData = {
                  date: availabilitySlot.startTimeLocal,
                  title: null,
                  startTime: getConvertedTime(availabilitySlot.startTimeLocal),
                  endTime: getConvertedTime(availabilitySlot.endTimeLocal),
                  status: availabilitySlotStatusToSlotStatus(availabilitySlot.status),
                  isTopDeal: false,
                  remainingCount: availabilitySlot.availableCount || 0,
                  totalCount: availabilitySlot.fares[0]?.availableCount || 0,
                  slotId: isNewBookingFlowEnabled
                    ? availabilitySlot.availabilitySlotKey
                    : dayjs(availabilitySlot.startTimeLocal).format("HHmm"),
                  orderedId: nanoid(),
                };

                res.push({
                  ...commonData,
                  isLastMinute: false,
                  prices: availabilitySlot.fares
                    .map((fare) => {
                      const fareType = fareTypes.find((type) => type.resSystemFareTypeId === fare.resSystemFareTypeId);
                      const pricesArr = [];

                      if (!fareType) {
                        return [];
                      }

                      const fareTypeData = {
                        displayName: fareType.displayName || fareType.originalName,
                        typeName: fareType.resSystemFareTypeId,
                        bpdFareType: fareType.bpdFareType,
                        bookingId: fare.resSystemBookingId,
                      };

                      pricesArr.push({
                        __typename: "TravelloPrice",
                        value: availabilitySlot.isLastMinute
                          ? fare.price.fareDiscountPrice.adjustedMoney
                          : fare.price.totalPrice.adjustedMoney,
                        fareType: fareTypeData,
                        rateId: fare.resSystemBookingId,
                        totalSaving: availabilitySlot.isLastMinute
                          ? {
                              ...fare.price.fareDiscountPrice.adjustedMoney,
                              amount:
                                fare.price.recommendedRetailPrice.adjustedMoney.amount -
                                fare.price.fareDiscountPrice.adjustedMoney.amount,
                              convertedAmount:
                                fare.price.recommendedRetailPrice.adjustedMoney.convertedAmount -
                                fare.price.fareDiscountPrice.adjustedMoney.convertedAmount,
                            }
                          : fare.price.totalSaving?.adjustedMoney?.amount > 0
                          ? fare.price.totalSaving.adjustedMoney
                          : null,
                      });

                      pricesArr.push({
                        __typename: "Levy",
                        included: fare.price.levyPrice.included,
                        value: fare.price.levyPrice.value.adjustedMoney,
                        fareType: fareTypeData,
                        label: fare?.levyLabel,
                      });

                      if (fare.price.recommendedRetailPrice) {
                        pricesArr.push({
                          __typename: "RecommendedRetailPrice",
                          value: fare.price.recommendedRetailPrice.adjustedMoney,
                          fareType: fareTypeData,
                          seatUsed: fare.seatUsed || 1,
                          minimumUnitOrder: fare.minQuantity || 0,
                          maximumUnitOrder: fare.maxQuantity,
                          rateId: fare.resSystemBookingId,
                        });
                      }

                      if (fare.price.totalSaving?.adjustedMoney?.amount > 0) {
                        discounts.push({
                          discountAmount: fare.price.totalSaving.adjustedMoney,
                          __typename: "ProductDiscount",
                        });
                      }

                      return pricesArr;
                    })
                    .flat(),
                });

                if (availabilitySlot.isLastMinute) {
                  res.push({
                    ...commonData,
                    slotId: `L${dayjs(availabilitySlot.startTimeLocal).format("HHmm")}`,
                    isLastMinute: true,
                    prices: availabilitySlot.fares
                      .map((fare) => {
                        const fareType = fareTypes.find(
                          (type) => type.resSystemFareTypeId === fare.resSystemFareTypeId,
                        );
                        const pricesArr = [];

                        if (!fareType) {
                          return [];
                        }

                        const fareTypeData = {
                          displayName: fareType.displayName || fareType.originalName,
                          typeName: fareType.resSystemFareTypeId,
                          bpdFareType: fareType.bpdFareType,
                          bookingId: fare.resSystemBookingId,
                        };

                        pricesArr.push({
                          __typename: "TravelloPrice",
                          value: {
                            ...fare.price.recommendedRetailPrice.adjustedMoney,
                            convertedAmount: fare.price.discountRulePrice.adjustedMoney.convertedAmount,
                            amount: fare.price.discountRulePrice.adjustedMoney.amount,
                          },
                          fareType: fareTypeData,
                          rateId: fare.resSystemBookingId,
                          totalSaving:
                            fare.price.totalSaving?.adjustedMoney?.amount > 0
                              ? fare.price.totalSaving.adjustedMoney
                              : null,
                        });

                        pricesArr.push({
                          __typename: "Levy",
                          included: fare.price.levyPrice.included,
                          value: fare.price.levyPrice.value.adjustedMoney,
                          fareType: fareTypeData,
                          label: fare?.levyLabel,
                        });

                        if (fare.price.recommendedRetailPrice) {
                          pricesArr.push({
                            __typename: "RecommendedRetailPrice",
                            value: fare.price.recommendedRetailPrice.adjustedMoney,
                            fareType: fareTypeData,
                            seatUsed: fare.seatUsed || 1,
                            minimumUnitOrder: fare.minQuantity || 0,
                            maximumUnitOrder: fare.maxQuantity,
                            rateId: fare.resSystemBookingId,
                          });
                        }

                        if (fare.price.totalSaving?.adjustedMoney?.amount > 0) {
                          discounts.push({
                            discountAmount: fare.price.totalSaving.adjustedMoney,
                            __typename: "ProductDiscount",
                          });
                        }

                        return pricesArr;
                      })
                      .flat(),
                  });
                }

                return res;
              })
              .flat(),
          };
        }),
      },
    };

    return {
      ...result,
      discounts: discounts.length > 0 ? discounts : product.discounts,
    };
  }

  return product;
};
