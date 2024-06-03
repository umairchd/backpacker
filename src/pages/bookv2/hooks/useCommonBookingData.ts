import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import find from "lodash/find";
import { gql } from "graphql-tag";

import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import {
  useBookingPageProductQuery,
  ProductForBookingFragment,
} from "./useCommonBookingData.generated";
import { currenciesWithoutDecimals } from "@@/pages/components/PriceWidget/PriceWidget";
import { useSelector } from "react-redux";
import { getSelectedCurrency } from "@@/features/price/model";
import { formatPrice } from "@@/pages/components/PriceWidget/utils";
import { useBookingAvailabilitySlot } from "./useBookingAvailabilitySlot";

gql`
  fragment ProductForBookingMoney on Money {
    currencyCode
    amount
    convertedAmount: bpd_convertTo(currencyCode: $currencyCode) {
      amount
      currencyCode
    }
  }

  fragment ProductForBookingLegacy on ProductLegacy {
    priceFrom {
      ...ProductForBookingMoney
    }
    updatedAt
    forceAvailabilityV1
    excludedBookingInfo
    bookingUrl
    openDatedBooking
    showMerchant
    hasNoIndexMetaTag
    hidePickupOnFrontend
    isDisplayGooglePay
    isDisplayPaypal
    isDisplayApplePay
    isDisplayAfterpay
    defaultDeparturePoint
    isDisplayHotelPickupWarning
  }

  fragment ProductForBooking on Product {
    productId
    title
    instantConfirmation
    duration {
      label
      maxDuration
      minDuration
    }
    images {
      productImages {
        ...ProductImage
      }
    }
    bookingRequired
    uri {
      country
      city
      url
    }
    location {
      city
      country
      region
    }
    categories {
      categoryId
    }
    variantProducts {
      productId
    }
    parentProduct {
      productId
      uri {
        url
      }
    }
    legacy {
      ...ProductForBookingLegacy
    }
  }

  query BookingPageProduct($productId: String, $currencyCode: String) {
    product(productId: $productId) {
      ...ProductForBooking
    }
  }
`;

export type fareTypesData = {
  id: string;
  label: string;
  bookingId: string;
  value: {
    amount: number;
    currencyCode: string;
    convertedAmount: {
      amount: string;
      currencyCode: string;
    };
  };
};

export const useCommonBookingData = (): {
  formattedDate: string;
  fareTypesData: fareTypesData[] | null;
  loadingAvailability: boolean;
  currencySymbol: string;
  currencyRounding: number;
  product: ProductForBookingFragment;
  convertedAmountAndCurrency: { amount: string; currencyCode: string } | null;
  hasParentProduct: string | null;
} => {
  const selectedCurrency = useSelector(getSelectedCurrency);
  const { supportedCurrencies } = useServerContext();
  const routerId = useRouter();
  const { id } = routerId.query;

  const [fareTypesData, setFareTypesData] = useState<fareTypesData[] | null>(
    null
  );

  const productId: string = useMemo(() => {
    if (typeof id === "string") {
      return id;
    }
    return "";
  }, [id]);

  const { data: productForBookingData } = useBookingPageProductQuery({
    variables: {
      productId,
      currencyCode: selectedCurrency,
    },
  });

  const product = productForBookingData?.product;

  const { router, availabilityData, loadingAvailability } =
    useBookingAvailabilitySlot();

  const convertedAmountAndCurrency = useMemo(() => {
    if (product?.legacy?.priceFrom?.convertedAmount) {
      return {
        amount: formatPrice(
          product?.legacy?.priceFrom?.convertedAmount?.amount,
          selectedCurrency
        ),
        currencyCode: selectedCurrency,
      };
    }

    return null;
  }, [product, selectedCurrency]);

  useEffect(() => {
    if (!fareTypesData) {
      if (router.ftIds?.length > 0 && availabilityData) {
        const updatedFareTypesData = router.ftIds.map((fareId) => {
          const fareType = availabilityData?.prices?.find(
            (id) => id.fareType.typeName === fareId
          );

          if (fareType) {
            return {
              id: fareType.fareType.typeName,
              label: fareType.fareType.displayName,
              bookingId: fareType?.fareType["bookingId"],
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
  }, [availabilityData, router, fareTypesData, selectedCurrency]);

  const currencyRounding = currenciesWithoutDecimals.includes(
    product?.legacy?.priceFrom?.currencyCode
  )
    ? 0
    : 2;

  const originalCurrencyObj = useMemo(() => {
    return find(supportedCurrencies, {
      isoSymbol: product?.legacy?.priceFrom?.currencyCode || "AUD",
    });
  }, [product, supportedCurrencies]);

  const formattedDate = useMemo(() => {
    if (availabilityData) {
      const currentSlotData = availabilityData?.date;
      return `${dayjs(currentSlotData).format("HH:mm")} on ${dayjs(
        currentSlotData.split("T")[0]
      ).format("ddd, MMM D YYYY")}`;
    }

    return null;
  }, [availabilityData]);

  const hasParentProduct = useMemo(() => {
    return product?.parentProduct?.productId;
  }, [product]);

  return {
    currencySymbol: originalCurrencyObj?.symbol,
    convertedAmountAndCurrency,
    loadingAvailability,
    currencyRounding,
    hasParentProduct,
    formattedDate,
    fareTypesData,
    product,
  };
};
