import { gql } from "graphql-tag";
import { useEffect, useMemo, useState } from "react";
import find from "lodash/find";

import {
  BookingPricingQuery,
  useBookingPricingLazyQuery,
} from "./useBookingPricing.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useCommonBookingData } from "./useCommonBookingData";
import { formatPrice } from "@@/pages/components/PriceWidget/utils";

gql`
  fragment BookingPricingDetails on BookingPricingPayload {
    commission
    currency
    discount
    discountType
    fareTypesToBook {
      numberOfSeats
      resSystemFareTypeId
    }
    id
    recommendedRetailPrice
    totalOrderPrice
    promocode {
      name
      discountAmount
    }
  }

  query BookingPricing($bookingUid: String) {
    bookingPricing(bookingUid: $bookingUid) {
      ...BookingPricingDetails
    }
  }
`;

type BookingPricingPromocode = {
  isPromocodeApplied: boolean;
  promocode: {
    name: string;
    discountAmount: string;
  };
};

export default ({
  bookingUid,
}: {
  bookingUid: string;
}): {
  bookingPricingData: BookingPricingQuery;
  totalPrice: string;
  fareTypesWithPrices: { label: string; price: string }[];
  fetchBookingPricing: () => Promise<void>;
  isCurrencyMatch: boolean;
  bookingPricingPromocode: BookingPricingPromocode;
} => {
  const { supportedCurrencies } = useServerContext();
  const [bookingPricingData, setBookingPricingData] =
    useState<BookingPricingQuery>(null);
  const [getBookingPricing] = useBookingPricingLazyQuery();

  const { fareTypesData } = useCommonBookingData();

  const fetchBookingPricing = async () => {
    const res = await getBookingPricing({
      variables: {
        bookingUid: bookingUid,
      },
      fetchPolicy: "network-only",
    });

    setBookingPricingData(res?.data);
  };

  useEffect(() => {
    if (bookingUid) {
      fetchBookingPricing().catch((error: unknown) => console.error(error));
    }
  }, [bookingUid]);

  const totalPrice = useMemo(() => {
    if (bookingPricingData?.bookingPricing) {
      const originalCurrencyObj = find(supportedCurrencies, {
        isoSymbol: bookingPricingData.bookingPricing.currency,
      });

      const totalOrderPrice =
        bookingPricingData.bookingPricing.totalOrderPrice.toFixed(2);
      const convertTotalOrderPrice = parseFloat(totalOrderPrice);

      return `${originalCurrencyObj.symbol}${formatPrice(
        convertTotalOrderPrice,
        bookingPricingData.bookingPricing.currency
      )}`;
    }
    return "";
  }, [bookingPricingData, supportedCurrencies]);

  const isCurrencyMatch = useMemo(() => {
    const currencyBookingPricing = bookingPricingData?.bookingPricing?.currency;
    const fareTypeCurrencies = fareTypesData?.map(
      (i) => i?.value?.convertedAmount.currencyCode
    );

    return fareTypeCurrencies?.every((i) => i === currencyBookingPricing);
  }, [bookingPricingData, fareTypesData]);

  const fareTypesWithPrices = useMemo(() => {
    if (bookingPricingData?.bookingPricing) {
      return bookingPricingData?.bookingPricing?.fareTypesToBook
        .map((i) => {
          if (!Array.isArray(fareTypesData)) return null;

          const fareTypeData = fareTypesData.find(
            (id) => id?.id === i.resSystemFareTypeId
          );

          if (fareTypeData) {
            const fareTypePrices = fareTypeData?.value?.convertedAmount.amount;
            const convertFareTypePrices = fareTypePrices.replace(",", "");
            const totalFareTypePrices = (
              parseFloat(convertFareTypePrices) * i.numberOfSeats
            ).toFixed(2);
            const fareTypesCurrencyCode =
              fareTypeData?.value?.convertedAmount.currencyCode;
            const originalCurrencyObj = find(supportedCurrencies, {
              isoSymbol: fareTypesCurrencyCode,
            });

            const label = `${originalCurrencyObj?.symbol}${fareTypePrices} X ${i.numberOfSeats} ${i.resSystemFareTypeId}`;
            const price = `${originalCurrencyObj?.symbol}${formatPrice(
              parseFloat(totalFareTypePrices),
              fareTypesCurrencyCode
            )}`;

            return { label, price };
          }
        })
        .filter((item) => item !== null);
    }

    return [];
  }, [bookingPricingData, fareTypesData, supportedCurrencies]);

  const bookingPricingPromocode = useMemo(() => {
    const boookingPricingPromocode =
      bookingPricingData?.bookingPricing?.promocode;
    const isPromocodeApplied = boookingPricingPromocode !== null;
    const { name, discountAmount } = boookingPricingPromocode || {};

    return {
      isPromocodeApplied,
      promocode: {
        name,
        discountAmount: discountAmount?.toFixed(2),
      },
    };
  }, [bookingPricingData]);

  return {
    bookingPricingData,
    bookingPricingPromocode,
    totalPrice,
    fareTypesWithPrices,
    isCurrencyMatch,
    fetchBookingPricing,
  };
};
