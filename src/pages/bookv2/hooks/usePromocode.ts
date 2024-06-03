import { gql } from "graphql-tag";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useApplyBookingPromocodeMutation } from "./usePromocode.generated";
import {
  PROMO_CODE_STATUS_ERROR,
  PROMO_CODE_STATUS_ERROR_MESSAGE,
} from "../types";
gql`
  mutation ApplyBookingPromocode($bookingUid: String, $promocode: String!) {
    applyBookingPromocode(bookingUid: $bookingUid, promocode: $promocode) {
      ... on BookingPromocodeErrorPayload {
        error
        success
        __typename
      }
      ... on BookingPromocodeSuccessPayload {
        promocodeName
        success
        __typename
      }
    }
  }
`;

export default ({
  bookingUid,
  fetchBookingPricing,
}: {
  bookingUid: string;
  fetchBookingPricing: () => void;
}): {
  promocode: string;
  status: boolean;
  statusError: string;
  handlePromocodeChange: (e: ChangeEvent<any>) => void;
  handleApplyPromocode: () => void;
  handleAlertClose: () => void;
} => {
  const [promocode, setPromocode] = useState<string>("");
  const [status, setStatus] = useState<boolean>(null);
  const [statusError, setStatusError] = useState<string>("");
  const [applyBookingPromocode] = useApplyBookingPromocodeMutation();

  const getErrorMessage = useMemo(() => {
    const errorMessages: PROMO_CODE_STATUS_ERROR_MESSAGE = {
      [PROMO_CODE_STATUS_ERROR.INVALID_PROMOCODE]:
        "The promo code is not valid",
      [PROMO_CODE_STATUS_ERROR.EXPIRED_PROMOCODE]: "The promo code is expired",
      [PROMO_CODE_STATUS_ERROR.DISABLED_PROMOCODE]:
        "The promo code is not valid",
      [PROMO_CODE_STATUS_ERROR.USED_COMPLETELY]: "The promo code is expired",
      [PROMO_CODE_STATUS_ERROR.GEO_WRONG]:
        "The promo code is not valid for this destination",
      [PROMO_CODE_STATUS_ERROR.CATEGORY_WRONG]: "The promo code is not valid",
      [PROMO_CODE_STATUS_ERROR.DISCOUNT_NOT_ALLOWED]:
        "The promo code cannot be used for a discounted tour",
      [PROMO_CODE_STATUS_ERROR.CURRENCY_WRONG]: "The promo code is not valid",
      [PROMO_CODE_STATUS_ERROR.MINIMUM_ORDER_NOT_MET]:
        "The promo code is not valid",
      [PROMO_CODE_STATUS_ERROR.PRODUCT_NOT_INCLUDED]:
        "The promo code is not valid for this product",
      [PROMO_CODE_STATUS_ERROR.PRODUCT_EXCLUDED]:
        "The promo code is not valid for this product",
    };

    return (status: string) => errorMessages[status];
  }, []);

  const applyPromocode = useCallback(
    async (code: string) => {
      try {
        const { data } = await applyBookingPromocode({
          variables: {
            bookingUid: bookingUid,
            promocode: code,
          },
        });

        const responsePromocode = data?.applyBookingPromocode;
        const getTypeName = responsePromocode?.__typename;

        if (getTypeName === "BookingPromocodeSuccessPayload") {
          fetchBookingPricing();
          setStatus(true);
          setPromocode("");
          setStatusError("");
        } else if (getTypeName === "BookingPromocodeErrorPayload") {
          const error = responsePromocode?.error;
          setStatus(false);
          setStatusError(getErrorMessage(error));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [applyBookingPromocode, bookingUid, fetchBookingPricing, getErrorMessage]
  );

  const handlePromocodeChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value;
    setPromocode(inputValue);

    if (inputValue.length === 0) {
      setStatusError("");
      setStatus(null);
    } else if (inputValue.length > 0 && (status || statusError)) {
      setStatus(null);
      setStatusError("");
    }
  };

  const handleApplyPromocode = useCallback(() => {
    applyPromocode(promocode).catch((error: unknown) => console.error(error));
  }, [applyPromocode, promocode]);

  const handleAlertClose = () => {
    setStatus(null);
  };

  return {
    promocode,
    status,
    statusError,
    handlePromocodeChange,
    handleApplyPromocode,
    handleAlertClose,
  };
};
