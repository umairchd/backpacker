import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";

import {
  getCounters,
  getProductTimezoneOffset,
  getSelectedDate,
  setCounters,
} from "@@/features/calendar/model";
import {
  AvailabilitySlotFragment,
  useAvailabilityV1Query,
  useAvailabilityV2Query,
} from "@@/features/calendar/queries/availability-query.generated";
import {
  useProductQuery,
  AvailabilityDataFilter,
} from "@@/pages/Product/queries/product-queries.generated";
import { getDayInfo } from "@@/features/calendar/utils/date";
import { convertAvailabilityV2 } from "@@/features/calendar/utils/availability";
import { BpdFareType, FareTypeEnum } from "@@/types.generated";
import { getSelectedCurrency } from "@@/features/price/model";
import { useAuth } from "@@/pages/auth/AuthProvider";
import { useBookingFlow } from "@@/features/calendar/hooks/useBookingFlow";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

export const useCalendar = (productId: string, dateForBookingV2?: Dayjs) => {
  dayjs.extend(utc);
  const dispatch = useDispatch();

  const {
    query: { ft: ftCounts, "ft-id": ftIds },
  } = useRouter();

  const { isAuthenticated } = useAuth();
  const productTimezoneOffset = useSelector(getProductTimezoneOffset);

  const counters = useSelector(getCounters);
  const selectedCurrency = useSelector(getSelectedCurrency);

  const selectedDate = useSelector(getSelectedDate); //Always local date for calendar no timezoneOffset

  //The first day of the month for any selected date
  const startOfMonth = selectedDate.startOf("month");

  const { data: currentProduct, loading: currentProductLoading } =
    useProductQuery({
      variables: {
        productId,
        targetCurrency: selectedCurrency,
      },
      fetchPolicy: "network-only",
      skip: !isAuthenticated,
    });

  const { enabledResProviders } = useServerContext();

  const productResSystemType = useMemo(() => {
    return currentProduct?.product?.resSystemType?.toUpperCase();
  }, [currentProduct]);

  const forceAvailabilityV1 = useMemo(() => {
    return currentProduct?.product?.legacy?.forceAvailabilityV1;
  }, [currentProduct]);

  const isAvailabilityV2Enabled = useMemo(() => {
    const resProviderEnabled =
      enabledResProviders?.includes(productResSystemType);

    return !forceAvailabilityV1 && resProviderEnabled;
  }, [enabledResProviders, forceAvailabilityV1, productResSystemType]);

  const { isNewBookingFlowEnabled, isNewBookingFlowDate } = useBookingFlow(
    isAvailabilityV2Enabled,
    dateForBookingV2
  );

  // TODO: Fix below logic as it makes the selected date not displayed on the BookingInfoCard
  // const datesToFetch = new Array(isNewBookingFlowDate ? 1 : 32)
  const datesToFetch = new Array(32)
    .fill(null)
    .map((_, ind) => startOfMonth.add(ind, "days").format("YYYY-MM-DD"));

  const availabilityV1Input = {
    productId,
    startDate: startOfMonth,
    targetCurrency: selectedCurrency,
    days: 32,
  };

  const availabilityV2Input: AvailabilityDataFilter = {
    productId,
    startDate: startOfMonth,
    ignoreCache: false,
    endDate: startOfMonth.add(32, "days"),
  };

  if (currentProduct?.product?.parentProduct?.productId) {
    availabilityV2Input.parentProductId =
      currentProduct.product.parentProduct.productId;
  }

  const { data: availabilityV1, loading: availabilityV1Loading } =
    useAvailabilityV1Query({
      variables: availabilityV1Input,
      fetchPolicy: "network-only",
      skip: isAvailabilityV2Enabled || !currentProduct,
    });

  const { data: availabilityV2, loading: availabilityV2Loading } =
    useAvailabilityV2Query({
      variables: {
        input: availabilityV2Input,
        targetCurrency: selectedCurrency,
        fareTypesFilter: {
          showHidden: false,
          productId,
        },
      },
      fetchPolicy: "network-only",
      skip: !isAvailabilityV2Enabled || !currentProduct,
    });

  const [product, availability] = useMemo(() => {
    if (availabilityV1 && currentProduct?.product) {
      return [currentProduct.product, availabilityV1.product?.availability];
    }

    const productWithAvailability = convertAvailabilityV2(
      currentProduct?.product,
      availabilityV2,
      isNewBookingFlowEnabled,
      datesToFetch
    );

    return [productWithAvailability, productWithAvailability?.availability];
  }, [availabilityV1, availabilityV2, currentProduct, datesToFetch]);

  const displayedFareTypes = useMemo(() => {
    if (availabilityV2?.fareType?.length > 0) {
      const filteredFareTypes = availabilityV2.fareType.filter(
        (i) => i.bpdFareType !== null && i.bpdFareType !== BpdFareType.Undefined
      );

      return [BpdFareType.Adult, BpdFareType.Child, BpdFareType.Family]
        .map((i) => {
          return (
            filteredFareTypes.find((ft) => ft.bpdFareType === i)
              ?.resSystemFareTypeId || null
          );
        })
        .filter((i) => !!i);
    }

    return (
      !isAvailabilityV2Enabled && [
        FareTypeEnum.Adult,
        FareTypeEnum.Child,
        FareTypeEnum.Family,
      ]
    );
  }, [availabilityV2, isAvailabilityV2Enabled]);

  useEffect(() => {
    if (
      displayedFareTypes &&
      Object.keys(counters)
        .filter((k) => displayedFareTypes.includes(k))
        .every((k) => counters[k] === 0) &&
      displayedFareTypes.filter((ft) => !!ft).length > 0
    ) {
      if (ftIds && ftCounts) {
        const fareTypeIds = Array.isArray(ftIds) ? ftIds : [ftIds];
        const fareTypeCount = Array.isArray(ftCounts) ? ftCounts : [ftCounts];
        const updatedCounters = {};

        displayedFareTypes.forEach((ft) => {
          updatedCounters[ft] =
            parseInt(
              fareTypeCount[fareTypeIds.findIndex((ftId) => ftId === ft)],
              10
            ) || 0;
        });

        dispatch(setCounters(updatedCounters));
      } else {
        dispatch(setCounters({ [displayedFareTypes.find((ft) => !!ft)]: 1 }));
      }
    }
  }, [displayedFareTypes, ftIds, ftCounts]);

  const availableDates = useMemo(() => {
    return availability?.availableDates;
  }, [availability]);

  const relativeUrl = useMemo(() => {
    const url =
      product?.variantProducts?.length === 1
        ? product.variantProducts[0]?.uri?.url?.split("/")
        : product?.uri?.url?.split("/");

    return url && url.slice(-1).pop();
  }, [product]);

  const [minimumUnitOrder, maximumUnitOrder] = useMemo(() => {
    return [availability?.minimumUnitOrder, availability?.maximumUnitOrder];
  }, [product]);

  const selectedSeats = useMemo(() => {
    return Object.values(counters).reduce((acc, curr) => acc + curr, 0);
  }, [counters]);

  const availableSlotList: { [key: string]: AvailabilitySlotFragment[] } =
    useMemo(() => {
      if (availableDates && selectedDate) {
        const dayInfo = getDayInfo(availableDates, selectedDate.toDate());

        if (dayInfo) {
          const slots = dayInfo.slots;

          return slots
            .filter((slot: AvailabilitySlotFragment) => {
              return slot.prices.length > 0 && slot.remainingCount > 0;
            })
            .reduce(
              (state, current) => {
                if (!state[current.startTime]) {
                  state[current.startTime] = [current];
                } else {
                  state[current.startTime].push(current);
                }

                return state;
              },
              {} as {
                [key: string]: AvailabilitySlotFragment[];
              }
            );
        }
      }

      return {};
    }, [availableDates, selectedDate]);

  const sortedAvailableSlots = useMemo(() => {
    return (
      availableSlotList &&
      Object.keys(availableSlotList).sort((a: string, b: string) => {
        return (
          new Date(`1970-01-01 ${a}`).getTime() -
          new Date(`1970-01-01 ${b}`).getTime()
        );
      })
    );
  }, [availableSlotList]);

  const selectedDeal = useMemo(
    () =>
      selectedDate &&
      availableDates &&
      getDayInfo(availableDates, selectedDate.toDate()),
    [availableDates, selectedDate]
  );

  const selectedDealSlots = useMemo(() => {
    return selectedDeal?.slots.filter((slot: AvailabilitySlotFragment) => {
      return slot.prices.length > 0;
    });
  }, [selectedDeal]);

  return {
    availableDates,
    selectedSeats,
    relativeUrl,
    minimumUnitOrder,
    maximumUnitOrder,
    counters,
    selectedDate: selectedDate,
    availableSlotList,
    sortedAvailableSlots,
    selectedDeal,
    selectedDealSlots,
    displayedFareTypes,
    product: currentProduct?.product,
    loading:
      currentProductLoading || availabilityV1Loading || availabilityV2Loading,
    // this will use for check availability slots for new booking flow
    productAvailability: availableDates,
    productTimezoneOffset,
    isAvailabilityV2Enabled,
  };
};
