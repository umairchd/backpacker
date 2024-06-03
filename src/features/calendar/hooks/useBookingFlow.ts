import { getCookie } from "cookies-next";
import { BOOKING_V2_KEY } from "@@/middlewares/bookingv2";
import { useMemo } from "react";
import { Dayjs } from "dayjs";

export const useBookingFlow = (
  availabilityV2Enabled: boolean,
  dateForBookingV2?: Dayjs
) => {
  const isNewBookingFlowEnabled =
    !!getCookie(BOOKING_V2_KEY) && availabilityV2Enabled;

  const isNewBookingFlowDate = useMemo(() => {
    if (availabilityV2Enabled && dateForBookingV2) {
      return true;
    }

    return false;
  }, [availabilityV2Enabled, dateForBookingV2]);

  return {
    isNewBookingFlowEnabled,
    isNewBookingFlowDate,
  };
};
