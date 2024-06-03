import dayjs, { Dayjs } from "dayjs";
import { AvailabilitySlotStatusEnum, BpdFareType } from "@@/types.generated";
import {
  AvailableSlotFragment,
  AvailableSlotsQuery,
  useAvailableSlotsQuery,
} from "@@/features/calendar/queries/available-slots-query.generated";
import { PriceData } from "@@/pages/Product/hooks/usePriceData";
import { useMemo } from "react";
import find from "lodash/find";
import first from "lodash/first";
import sortBy from "lodash/sortBy";
import { useSelector } from "react-redux";
import { getSelectedCurrency } from "@@/features/price/model";
import {
  AvailabilitySlotFaresFragment,
  FareTypeFragment,
} from "@@/features/calendar/queries/availability-query.generated";
import { useProductFareTypesQuery } from "@@/pages/Product/queries/product-fare-type-queries.generated";
import { PriceFrom } from "@@/pages/Product/ProductContent/types";
import { isValidDateString } from "@@/features/calendar/utils/date";
import { useSavePriceFromAndNextAvailableDateMutation } from "@@/pages/Product/queries/product-next-available-date-and-price-from-mutations.generated";

interface NextAvailableDateAndPriceFromProps {
  productId: string;
  productPriceData?: PriceData;
  isAvailabilityV2Enabled?: boolean;
  enquireOnly?: boolean;
}

export interface NextAvailableDateAndPriceFromType {
  productId: string;
  nextAvailableDate: string;
  priceFrom: PriceFrom;
}

interface NextAvailableDateAndPriceFromReturnType {
  loading: boolean;
  getNextAvailableDateAndPriceFrom: () => Promise<
    NextAvailableDateAndPriceFromType[]
  >;
  hasTwoOrMoreVariantProducts: boolean;
  calculateNextAvailableDate: (
    productId: string,
    startDate: string,
    endDateParam?: Dayjs
  ) => Promise<string | null>;
}

interface FetchParamType {
  productId: string;
  currentNextAvailableDate: string;
  currentPriceFrom: PriceFrom;
}

export const useNextAvailableDateAndPriceFrom = ({
  productId,
  productPriceData,
  isAvailabilityV2Enabled,
  enquireOnly,
}: NextAvailableDateAndPriceFromProps): NextAvailableDateAndPriceFromReturnType => {
  const startDate: Dayjs | null = null;
  const endDateRange: Dayjs | null = null;
  const priceFromFetchPeriodDays = process.env.PRICE_FROM_FETCH_PERIOD_DAYS;

  const selectedCurrency = useSelector(getSelectedCurrency);

  const { fetchMore: availableSlotFetchMore, loading: availableSlotLoading } =
    useAvailableSlotsQuery({
      variables: {
        input: {
          productId,
          startDate: startDate,
          endDate: endDateRange,
          ignoreCache: false,
        },
        targetCurrency: selectedCurrency,
      },
      fetchPolicy: "cache-and-network",
      skip: true,
    });

  const {
    fetchMore: productFareTypeFetchMore,
    loading: productFareTypeLoading,
  } = useProductFareTypesQuery({
    variables: {
      fareTypeFilter: {
        showHidden: false,
        productId: productId,
      },
    },
    fetchPolicy: "cache-and-network",
    skip: true,
  });

  const [savePriceFromAndNextAvailableDateMutation] =
    useSavePriceFromAndNextAvailableDateMutation();

  const hasNextAvailableDatePassed = (
    nextAvailableDateString: string
  ): boolean => {
    const convertedNextAvailableDate = dayjs(nextAvailableDateString);
    const today = dayjs();

    return today.isAfter(convertedNextAvailableDate);
  };

  const formatNextAvailableDateParam = (
    nextAvailableDateString: string
  ): string => {
    let day: string,
      month: string,
      year: string,
      hour: string,
      minute: string,
      second: string;
    const dateTimeRegExp =
      /\d{4}([-/ .])\d{2}[-/ .]\d{2}([T ])\d{2}(:)\d{2}:\d{2}/;
    const result = dateTimeRegExp.exec(nextAvailableDateString);

    if (result) {
      const dateTimeSplit = result[0].split(result[2]);
      const dateSplit = dateTimeSplit[0].split(result[1]);
      const timeSplit = dateTimeSplit[1].split(result[3]);

      day = dateSplit[2];
      month = dateSplit[1];
      year = dateSplit[0];
      hour = timeSplit[0];
      minute = timeSplit[1];
      second = timeSplit[2];
    }

    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    if (isValidDateString(formattedDate)) {
      return formattedDate;
    }

    return nextAvailableDateString;
  };

  const hasValidSlot = (slot: AvailableSlotFragment): boolean => {
    return (
      slot.hasAvailableSlots &&
      slot.availableCount > 0 &&
      slot.status === AvailabilitySlotStatusEnum.Available
    );
  };

  const getFirstAvailableSlot = (
    availableSlotData: AvailableSlotsQuery,
    startDateRange: Dayjs
  ) => {
    const activeYearMonth = (startDateRange ? startDateRange : dayjs()).format(
      "YYYYMM"
    );

    return availableSlotData?.availability?.slots?.find(
      (slot: AvailableSlotFragment) => {
        const convertedStartTimeLocal = dayjs(slot.startTimeLocal);

        return (
          convertedStartTimeLocal.format("YYYYMM") >= activeYearMonth &&
          hasValidSlot(slot)
        );
      }
    );
  };

  const fetchFromFutureDate = async (
    productId: string,
    startDate: string,
    endDateParam?: Dayjs,
    currentPriceFrom?: PriceFrom
  ): Promise<NextAvailableDateAndPriceFromType> => {
    let nextAvailableDate = startDate;
    let priceFrom: PriceFrom = currentPriceFrom || {
      amount: 0,
      convertedAmount: 0,
      currencyCode: null,
    };

    try {
      nextAvailableDate = await calculateNextAvailableDate(
        productId,
        startDate,
        endDateParam
      );

      if (nextAvailableDate) {
        const calculatedPriceFrom = await calculatePriceFrom(
          productId,
          nextAvailableDate
        );

        if (calculatedPriceFrom) {
          priceFrom = calculatedPriceFrom;
        }
      }
    } catch (e) {
      console.error("fetchFromFutureDate thrown an error: ", e);
    }

    return {
      productId,
      nextAvailableDate: nextAvailableDate || null,
      priceFrom: priceFrom || null,
    };
  };

  const calculateNextAvailableDate = async (
    productId: string,
    startDate: string,
    endDateParam?: Dayjs
  ): Promise<string | null> => {
    const now = dayjs();
    let convertedStartDate = startDate ? dayjs(startDate) : dayjs();
    const activeStartDate = convertedStartDate;

    let endDate =
      endDateParam ||
      convertedStartDate
        .add(Number(priceFromFetchPeriodDays), "days")
        .endOf("month");
    let nextAvailableDate: string | null = null;

    while (
      !nextAvailableDate &&
      convertedStartDate.diff(activeStartDate, "year") < 1
    ) {
      const { data: availableSlotData } = await availableSlotFetchMore({
        variables: {
          input: {
            productId,
            startDate: convertedStartDate,
            endDate: endDate,
            ignoreCache: false,
          },
          targetCurrency: selectedCurrency,
        },
      });

      const firstAvailableSlotInMonth = getFirstAvailableSlot(
        availableSlotData,
        convertedStartDate
      );

      if (!firstAvailableSlotInMonth) {
        convertedStartDate = endDate.add(1, "day");
        endDate = endDate.add(3, "month");
        continue;
      }

      if (firstAvailableSlotInMonth) {
        nextAvailableDate = hasNextAvailableDatePassed(
          firstAvailableSlotInMonth?.startTimeLocal
        )
          ? now.format("YYYY-MM-DDT00:00:00Z")
          : firstAvailableSlotInMonth?.startTimeLocal;
      } else {
        nextAvailableDate = startDate;
      }
    }

    return nextAvailableDate;
  };

  const getActiveProductFareTypes = async (
    productId: string
  ): Promise<FareTypeFragment[]> => {
    const { data: enabledProductFareTypes } = await productFareTypeFetchMore({
      variables: {
        fareTypeFilter: {
          productId: productId,
          showHidden: false,
        },
      },
    });

    return enabledProductFareTypes?.fareType
      ?.filter((fareType: FareTypeFragment) => {
        return fareType.bpdFareType !== BpdFareType.Undefined;
      })
      .sort((fareTypeA: FareTypeFragment, fareTypeB: FareTypeFragment) => {
        if (fareTypeA.bpdFareType < fareTypeB.bpdFareType) {
          return -1;
        } else if (fareTypeA.bpdFareType > fareTypeB.bpdFareType) {
          return 1;
        } else {
          return 0;
        }
      });
  };

  const calculatePriceFrom = async (
    productId: string,
    nextAvailableDate: string
  ): Promise<PriceFrom> => {
    let priceFrom: PriceFrom = {
      amount: 0.0,
      convertedAmount: 0.0,
      currencyCode: "AUD",
    };

    const { data: availableSlotData } = await availableSlotFetchMore({
      variables: {
        input: {
          productId,
          startDate: formatNextAvailableDateParam(nextAvailableDate),
          endDate: dayjs(nextAvailableDate).add(
            Number(priceFromFetchPeriodDays),
            "days"
          ),
          ignoreCache: false,
        },
        targetCurrency: selectedCurrency,
      },
    });

    if (availableSlotData?.availability?.slots) {
      const activeProductFareTypes = await getActiveProductFareTypes(productId);
      const defaultProductFareType = activeProductFareTypes.length
        ? first(activeProductFareTypes)
        : null;

      if (defaultProductFareType) {
        const slotPriceForDefaultFareType =
          availableSlotData?.availability?.slots
            .filter((slot: AvailableSlotFragment) => {
              return hasValidSlot(slot);
            })
            .map((slot: AvailableSlotFragment) => {
              const matchFareType = find(
                slot?.fares,
                (fare: AvailabilitySlotFaresFragment) => {
                  return (
                    fare.bpdFareType === defaultProductFareType.bpdFareType ||
                    fare.resSystemFareTypeId ===
                      defaultProductFareType.resSystemFareTypeId
                  );
                }
              ) as AvailabilitySlotFaresFragment;

              return {
                amount:
                  matchFareType?.price?.totalPrice?.adjustedMoney?.amount || 0,
                currencyCode:
                  matchFareType?.price?.totalPrice?.adjustedMoney?.currencyCode,
                convertedAmount:
                  matchFareType?.price?.totalPrice?.adjustedMoney
                    ?.convertedAmount || 0,
              };
            });

        if (slotPriceForDefaultFareType.length > 0) {
          const sortedSlotPriceForDefaultFareType = sortBy(
            slotPriceForDefaultFareType.filter((slotPrice) => slotPrice.amount),
            [(o) => o.amount]
          );

          priceFrom = first(sortedSlotPriceForDefaultFareType) as PriceFrom;
        }
      }
    }

    return priceFrom;
  };

  const hasTwoOrMoreVariantProducts = useMemo(() => {
    return productPriceData?.variantProducts?.length > 1;
  }, [productPriceData]);

  const hasOnlyOneVariant = productPriceData?.variantProducts?.length === 1;

  const updateProductNextAvailableDateAndPriceFrom = (
    currentData: FetchParamType,
    newData: NextAvailableDateAndPriceFromType
  ) => {
    if (!newData?.priceFrom || !newData.nextAvailableDate) {
      return;
    }

    if (
      currentData.currentNextAvailableDate !== newData.nextAvailableDate ||
      currentData.currentPriceFrom.amount != newData.priceFrom.amount
    ) {
      savePriceFromAndNextAvailableDateMutation({
        variables: {
          input: {
            productId: currentData.productId,
            nextAvailableDate: newData.nextAvailableDate,
            priceFrom: newData.priceFrom?.amount,
            priceFromCurrency: newData.priceFrom?.currencyCode,
          },
        },
      })
        .then((r) =>
          console.info(
            `Next Available Date for Product with ID: ${currentData.productId} has been updated`,
            r
          )
        )
        .catch((error: unknown) =>
          console.error(
            `savePriceFromAndNextAvailableDateMutation for Product with ID: ${currentData.productId} has been failed`,
            error
          )
        );
    }
  };

  const addParentProductData = (
    parentProductId: string,
    nextAvailableDateAndPriceFromList: NextAvailableDateAndPriceFromType[],
    currentParentProductData: FetchParamType = null
  ) => {
    const filteredList = nextAvailableDateAndPriceFromList.filter(
      (item) => item.priceFrom
    );

    const lowestPriceFromData = first(
      sortBy(filteredList, [(o) => o.priceFrom.amount])
    );

    const nearestNextAvailableDate = first(
      sortBy(filteredList, [(o) => o.nextAvailableDate])
    );

    const newData = {
      productId: parentProductId,
      priceFrom: lowestPriceFromData?.priceFrom,
      nextAvailableDate: nearestNextAvailableDate?.nextAvailableDate,
    };

    nextAvailableDateAndPriceFromList.push(newData);

    if (currentParentProductData) {
      updateProductNextAvailableDateAndPriceFrom(
        currentParentProductData,
        newData
      );
    }

    return nextAvailableDateAndPriceFromList;
  };

  const loadLegacyData = (): NextAvailableDateAndPriceFromType[] => {
    const legacyNextAvailableDateAndPriceFromList: NextAvailableDateAndPriceFromType[] =
      [];

    if (hasTwoOrMoreVariantProducts) {
      const variantProducts = productPriceData.variantProducts;

      for (const key in variantProducts) {
        legacyNextAvailableDateAndPriceFromList.push({
          productId: variantProducts[key].productId,
          nextAvailableDate: variantProducts[key].nextAvailableDate,
          priceFrom: variantProducts[key].legacy?.priceFrom,
        });
      }
    } else if (hasOnlyOneVariant) {
      const firstVariantProduct = first(productPriceData.variantProducts);

      legacyNextAvailableDateAndPriceFromList.push({
        productId: firstVariantProduct?.productId,
        nextAvailableDate: firstVariantProduct?.nextAvailableDate,
        priceFrom: firstVariantProduct?.legacy?.priceFrom,
      });
    } else {
      const currentNextAvailableDate =
        productPriceData?.nextAvailableDate || null;

      legacyNextAvailableDateAndPriceFromList.push({
        productId: productPriceData?.productId,
        nextAvailableDate: !enquireOnly ? currentNextAvailableDate : null,
        priceFrom: productPriceData?.legacy?.priceFrom,
      });
    }

    if (hasOnlyOneVariant || hasTwoOrMoreVariantProducts) {
      addParentProductData(
        productPriceData.productId,
        legacyNextAvailableDateAndPriceFromList
      );
    }

    return legacyNextAvailableDateAndPriceFromList;
  };

  const getNextAvailableDatesAndPriceFroms = async (): Promise<
    NextAvailableDateAndPriceFromType[]
  > => {
    if (!productPriceData) return null;

    if (!isAvailabilityV2Enabled || enquireOnly) {
      return loadLegacyData();
    }

    const nextAvailableDateAndPriceFromList: NextAvailableDateAndPriceFromType[] =
      [];
    const fetchParams: FetchParamType[] = [];

    if (hasTwoOrMoreVariantProducts) {
      const variantProducts = productPriceData.variantProducts;

      for (const key in variantProducts) {
        fetchParams.push({
          productId: variantProducts[key].productId,
          currentNextAvailableDate: variantProducts[key].nextAvailableDate,
          currentPriceFrom: variantProducts[key]?.priceFrom,
        });
      }
    } else if (hasOnlyOneVariant) {
      const firstVariantProduct = first(productPriceData.variantProducts);

      fetchParams.push({
        productId: firstVariantProduct.productId,
        currentNextAvailableDate: firstVariantProduct.nextAvailableDate || null,
        currentPriceFrom: firstVariantProduct?.priceFrom,
      });
    } else {
      const currentNextAvailableDate =
        productPriceData?.nextAvailableDate || null;

      fetchParams.push({
        productId: productPriceData?.productId,
        currentNextAvailableDate: currentNextAvailableDate,
        currentPriceFrom: productPriceData?.priceFrom,
      });
    }

    for (const key in fetchParams) {
      const result = await fetchFromFutureDate(
        fetchParams[key].productId,
        fetchParams[key].currentNextAvailableDate,
        null,
        fetchParams[key].currentPriceFrom
      );

      nextAvailableDateAndPriceFromList.push(result);

      updateProductNextAvailableDateAndPriceFrom(fetchParams[key], result);
    }

    if (hasOnlyOneVariant || hasTwoOrMoreVariantProducts) {
      addParentProductData(
        productPriceData?.productId,
        nextAvailableDateAndPriceFromList,
        {
          productId: productPriceData.productId,
          currentNextAvailableDate: productPriceData.nextAvailableDate,
          currentPriceFrom: productPriceData.priceFrom,
        }
      );
    }

    return nextAvailableDateAndPriceFromList;
  };

  const availableDataFetching =
    availableSlotLoading || productFareTypeLoading || isAvailabilityV2Enabled;

  return {
    loading: availableDataFetching,
    getNextAvailableDateAndPriceFrom: getNextAvailableDatesAndPriceFroms,
    hasTwoOrMoreVariantProducts,
    calculateNextAvailableDate,
  };
};
