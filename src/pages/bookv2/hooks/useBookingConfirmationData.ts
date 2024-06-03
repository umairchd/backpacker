import { useRouter } from "next/router";

import {
  useBookingQuery,
  BookingInfoFragment,
} from "./useBookingInfo.generated";
import {
  useBookingContactInfoQuery,
  useBookingParticipantDetailsQuery,
  BookingContactInfoValuesFragment,
  BookingParticipantDetailsValuesFragment,
} from "./useBookingFormData.generated";
import {
  useBookingPageProductQuery,
  ProductForBookingFragment,
} from "./useCommonBookingData.generated";
import {
  useBookingPricingQuery,
  BookingPricingDetailsFragment,
} from "./useBookingPricing.generated";
import { BookingStatus } from "@@/types.generated";

export default (): {
  booking: BookingInfoFragment;
  product: ProductForBookingFragment;
  bookingPricing: BookingPricingDetailsFragment;
  bookingContactInfo: BookingContactInfoValuesFragment;
  bookingParticipantDetails: BookingParticipantDetailsValuesFragment[];
} => {
  const { query } = useRouter();

  const bookingUid = query.bookingid as string;

  const { data: bookingData } = useBookingQuery({
    variables: {
      bookingUid: bookingUid,
    },
  });

  const isBookingCompleted =
    bookingData?.booking?.bookingStatus === BookingStatus.Completed;

  const { data: bookingPageProductData } = useBookingPageProductQuery({
    variables: {
      productId: bookingData?.booking?.productId,
    },
    skip: !isBookingCompleted,
  });

  const { data: bookingPricingData } = useBookingPricingQuery({
    variables: {
      bookingUid: bookingUid,
    },
    skip: !isBookingCompleted,
  });

  const { data: bookingContactInfoData } = useBookingContactInfoQuery({
    variables: {
      bookingUid: bookingUid,
    },
    skip: !isBookingCompleted,
  });

  const { data: bookingParticipantDetailsData } =
    useBookingParticipantDetailsQuery({
      variables: {
        bookingUid: bookingUid,
      },
      skip: !isBookingCompleted,
    });

  return {
    booking: bookingData?.booking,
    product: bookingPageProductData?.product,
    bookingPricing: bookingPricingData?.bookingPricing,
    bookingContactInfo: bookingContactInfoData?.bookingContactInfo,
    bookingParticipantDetails:
      bookingParticipantDetailsData?.bookingParticipantDetails,
  };
};
