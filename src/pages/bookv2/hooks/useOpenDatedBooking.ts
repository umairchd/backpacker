import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import { useCallback, useContext, useMemo } from "react";

import { ContactDetailsFormData, FIELDS } from "../types";
import { BookingStatus, BookingType, DiscountType } from "@@/types.generated";
import { useCreateBookingMutation } from "./useBookingInfo.generated";
import { useCreateBookingContactInfoMutation } from "./useBookingFormData.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { BookingInfoContext } from "@@/pages/bookv2/[slug]/components/BookingPage";
import { FareTypePrice } from "@@/pages/Product/utils";
import dayjs from "dayjs";
import { PriceData } from "@@/pages/Product/hooks/usePriceData";

interface OpenDatedBookingParams {
  productId: string;
  fareTypesCounts: {
    [key: string]: number;
  };
  showErrorPopup: () => void;
  fareTypePrices: FareTypePrice[];
  priceData: PriceData;
}

interface OpenDatedBookingReturnValues {
  onSubmit: (contactDetails: ContactDetailsFormData) => void;
}

/**
 * Open dated bookings which are regular or gift
 */
export default ({
  productId,
  fareTypesCounts,
  showErrorPopup,
  fareTypePrices,
  priceData,
}: OpenDatedBookingParams): OpenDatedBookingReturnValues => {
  const router = useRouter();
  const { gift, slug } = router.query;
  const { host } = useServerContext();

  const [bookingIds, setBookingIds] = useLocalStorage<{
    [productId: string]: string;
  }>("bookingIds", {});

  const [createBooking] = useCreateBookingMutation();
  const [createBookingContactInfo] = useCreateBookingContactInfoMutation();

  const { setBookingData } = useContext(BookingInfoContext);

  const handleError = () => {
    showErrorPopup();
  };

  const firstAvailableSlot = useMemo(() => {
    return priceData?.availability?.availableDates.find(
      (i) => i.hasAvailableSlots
    )?.slots[0];
  }, [priceData]);

  const generatePaymentUrl = (bookingId): string => {
    //use stuff for the fare types
    const fareTypesResSystemIds =
      fareTypePrices?.map((fp) => fp.resSystemFareTypeId) || [];

    const slot = firstAvailableSlot;

    if (slot) {
      const pricesQuery = fareTypesResSystemIds.reduce((acc, curr) => {
        acc += `&ft-price=${
          slot.prices.find((p) => p.fareType.typeName === curr)?.value.amount ||
          0
        }`;
        return acc;
      }, "");

      const fareTypeIdQuery = fareTypesResSystemIds.reduce((acc, curr) => {
        acc += `&ft-id=${encodeURIComponent(curr)}`;
        return acc;
      }, "");

      const fareTypeBookingIdQuery = fareTypesResSystemIds.reduce(
        (acc, curr) => {
          const bookingId = slot.prices.find(
            (p) => p.fareType.typeName === curr
          )?.fareType["bookingId"];
          acc += `&ft-booking-id=${bookingId}`;
          return acc;
        },
        ""
      );

      const fareTypeNames = fareTypesResSystemIds.reduce((acc, curr) => {
        const fareType = slot.prices.find(
          (p) => p.fareType.typeName === curr
        )?.fareType;

        acc += `&ft-name=${encodeURIComponent(fareType?.displayName)}`;
        return acc;
      }, "");

      const dateString = slot.date.substr(
        0,
        slot.date.indexOf(slot.date.includes("T") ? "T" : " ")
      );

      return `/bookv2/payment/${slug}/${bookingId}?slot=${slot.slotId}&date=${dateString}${pricesQuery}${fareTypeIdQuery}${fareTypeBookingIdQuery}${fareTypeNames}&id=${productId}`;
    }
  };

  const createContactInfo = async (
    contactDetails: ContactDetailsFormData,
    bookingUid: string
  ) => {
    const res = await createBookingContactInfo({
      variables: {
        bookingUid,
        input: {
          email: contactDetails[FIELDS.EMAIL],
          firstName: contactDetails[FIELDS.FIRST_NAME],
          lastName: contactDetails[FIELDS.LAST_NAME],
          phone: `${contactDetails[FIELDS.COUNTRY_CODE]}${
            contactDetails[FIELDS.CONTACT_NUMBER]
          }`,
        },
      },
    });

    if (res?.data?.bookingContactInfo?.id) {
      const href = generatePaymentUrl(bookingUid);
      router.push(href, href);
    } else {
      handleError();
    }
  };

  const findSlotBookingId = (resSystemFareTypeId) =>
    firstAvailableSlot?.prices?.find(
      (p) => p.fareType.typeName === resSystemFareTypeId
    )?.fareType["bookingId"];

  const handleCreateBooking = useCallback(async () => {
    const variables = {
      variables: {
        input: {
          //...bookingInputCommon,
          availabilitySlotKey: firstAvailableSlot["slotId"],
          departureDate: dayjs(firstAvailableSlot["slotId"]).format(),
          fareTypesToBook: fareTypePrices
            .map((fareTypePrice, ind) => ({
              resSystemFareTypeId: fareTypePrice.resSystemFareTypeId,
              numberOfSeats: fareTypesCounts[fareTypePrice.id],
              resSystemBookingId: findSlotBookingId(
                fareTypePrice.resSystemFareTypeId
              ),
            }))
            .filter((i) => !!i.numberOfSeats),
          discountType: DiscountType.None,
          bookingReferrals: {
            channelId: host,
            merchantId: "42335",
          },
          bookingType: gift ? BookingType.BuyAsAGift : BookingType.Regular, //Gift or Open Dated Booking
          productId,
        },
      },
    };

    const res = await createBooking(variables);

    const createdBookingId: string = res?.data?.createBooking?.bookingUid;
    const isCreated =
      res?.data?.createBooking?.bookingStatus === BookingStatus.Created;

    if (createdBookingId && isCreated) {
      setBookingData(res.data.createBooking);
      setBookingIds({
        ...bookingIds,
        [`${productId}:${firstAvailableSlot.slotId}`]:
          createdBookingId.toString(),
      });

      return createdBookingId;
    } else {
      handleError();
      return undefined;
    }
  }, [fareTypesCounts, fareTypePrices, firstAvailableSlot]);

  const onSubmit = useCallback(
    async (contactDetails: ContactDetailsFormData) => {
      const bookingUid = await handleCreateBooking();
      if (bookingUid) {
        await createContactInfo(contactDetails, bookingUid);
      }
    },
    [fareTypesCounts, bookingIds]
  );

  return {
    onSubmit,
  };
};
