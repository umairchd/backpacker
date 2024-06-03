import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import find from "lodash/find";

import { useValidateAvailabilityAndPricingLazyQuery } from "./useBookingFormData.generated";
import { useBookingPricingLazyQuery } from "./useBookingPricing.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

export default (
  bookingUid: string
): {
  updatedPrice: string | null;
  validateBookingAnP: (bookingUid: string) => Promise<boolean>;
  onPriceChangedContinueClick: (isContinue: boolean) => void;
} => {
  const router = useRouter();
  const { slug } = router.query;
  const { supportedCurrencies } = useServerContext();
  const [updatedPrice, setUpdatedPrice] = useState(null);
  const [getBookingPrice] = useBookingPricingLazyQuery();
  const [validateAnP] = useValidateAvailabilityAndPricingLazyQuery();

  const handePriceChangedContinueClick = useCallback(
    (isContinue: boolean) => {
      setUpdatedPrice(null);

      if (isContinue) {
        const href = `/bookv2/payment/${slug}/${bookingUid}?${
          router.asPath.split("?")[1] || ""
        }`;

        return router.push(href, href);
      }
    },
    [bookingUid]
  );

  const validateBookingAnP = async (bookingUid: string) => {
    const validationResult = await validateAnP({
      variables: {
        bookingUid: bookingUid,
      },
    });

    if (!validationResult?.data?.validateAvailabilityAndPricing) {
      const bookingPricingRes = await getBookingPrice({
        variables: {
          bookingUid: bookingUid,
        },
      });
      const originalCurrencyObj = find(supportedCurrencies, {
        isoSymbol: bookingPricingRes?.data?.bookingPricing.currency,
      });

      setUpdatedPrice(
        `${originalCurrencyObj.symbol}${bookingPricingRes?.data?.bookingPricing.totalOrderPrice}`
      );
    } else {
      const href = `/bookv2/payment/${slug}/${bookingUid}?${
        router.asPath.split("?")[1] || ""
      }`;

      return router.push(href, href);
    }
  };

  return {
    updatedPrice,
    validateBookingAnP,
    onPriceChangedContinueClick: handePriceChangedContinueClick,
  };
};
