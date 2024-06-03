import { gql } from "graphql-tag";
import dayjs from "dayjs";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

import {
  BookingInfoFragment,
  useBookingLazyQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from "./useBookingInfo.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { ProductForBookingFragment } from "./useCommonBookingData.generated";
import { BookingStatus, BookingType, DiscountType } from "@@/types.generated";
import { BookingInfoContext } from "../[slug]/components/BookingPage";
import { useBookingParticipantDetailsLazyQuery } from "./useBookingFormData.generated";

gql`
  fragment BookingParticipantDetail on BookingParticipantDetailsPayload {
    bookingFareTypeId
    bookingFareTypeName
    firstName
    lastName
    id
  }

  fragment BookingInfo on BookingDataPayload {
    availabilitySlotKey
    bookingId
    bookingUid
    bookingStatus
    bookingType
    departureDate
    productId
    userId
    participantDetails {
      ...BookingParticipantDetail
    }
  }

  query Booking($bookingUid: String) {
    booking(bookingUid: $bookingUid) {
      ...BookingInfo
    }
  }

  mutation CreateBooking($input: BookingDataInput!) {
    createBooking(input: $input) {
      ...BookingInfo
    }
  }

  mutation UpdateBooking($bookingUid: String, $input: UpdateBookingDataInput!) {
    updateBooking(bookingUid: $bookingUid, input: $input) {
      data {
        ...BookingInfo
      }
    }
  }
`;

export default ({
  product,
  showErrorPopup,
}: {
  product: ProductForBookingFragment;
  showErrorPopup: () => void;
}): {
  onBookingDetailsChange: (updatedHref?: string) => void;
  bookingUid: string | null;
  isExistingBooking: boolean;
  bookingData: BookingInfoFragment;
} => {
  const { host } = useServerContext();
  const {
    query: { ft, "ft-id": ftIds, "ft-booking-id": ftbookingIds, date, slot },
  } = useRouter();
  const fareTypesAmounts = Array.isArray(ft) ? ft : [ft];
  const fareTypesBookingIds = Array.isArray(ftbookingIds)
    ? ftbookingIds
    : [ftbookingIds];
  const fareTypesIds = Array.isArray(ftIds) ? ftIds : [ftIds];
  const availabilitySlotKey = Array.isArray(slot) ? slot[0] : slot;
  const departureDate = dayjs(Array.isArray(date) ? date[0] : date).format();
  const [getBooking] = useBookingLazyQuery();
  const [getBookingParticipantDetails] =
    useBookingParticipantDetailsLazyQuery();
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [bookingIds, setBookingIds] = useLocalStorage<{
    [productId: string]: string;
  }>("bookingIds", {});
  const bookingLSKey = `${product.productId}:${date}:${slot}`;
  const bookingUid = bookingIds[bookingLSKey];
  const [currentBookingUid, setCurrentBookingUid] =
    useState<string>(bookingUid);
  const [isExistingBooking, setIsExistingBooking] = useState<boolean>(false);
  const { data: bookingData, setBookingData } = useContext(BookingInfoContext);

  const handleError = useCallback((key?: string) => {
    if (key) {
      const updatedBookingIds = { ...bookingIds };

      delete updatedBookingIds[key];
      setBookingIds(updatedBookingIds);
    }

    showErrorPopup();
  }, []);

  const handleCreateBooking = useCallback(async () => {
    const res = await createBooking({
      variables: {
        input: {
          availabilitySlotKey,
          bookingReferrals: {
            channelId: host,
            merchantId: "42335",
          },
          bookingType: BookingType.Regular,
          departureDate,
          productId: product.productId,
          fareTypesToBook: fareTypesIds
            .filter((_, ind) => !!parseInt(fareTypesAmounts[ind], 10))
            .map((resSysId, ind) => ({
              resSystemFareTypeId: resSysId,
              numberOfSeats: parseInt(fareTypesAmounts[ind], 10),
              resSystemBookingId: fareTypesBookingIds[ind],
            })),
          discountType: DiscountType.None,
        },
      },
    });

    const createdBookingUid = res?.data?.createBooking?.bookingUid;
    const isCreated =
      res?.data?.createBooking?.bookingStatus === BookingStatus.Created;

    if (isCreated) {
      setBookingData(res.data.createBooking);
      setBookingIds({
        ...bookingIds,
        [bookingLSKey]: createdBookingUid.toString(),
      });
      setCurrentBookingUid(createdBookingUid.toString());
    } else {
      handleError();
    }
  }, [
    availabilitySlotKey,
    departureDate,
    fareTypesIds,
    fareTypesAmounts,
    fareTypesBookingIds,
    bookingLSKey,
  ]);

  const replaceLSBookingId = useCallback(
    (oldId: string, newId: string) => {
      const updatedBookingIds = {
        ...bookingIds,
        [newId]: currentBookingUid,
      };

      if (oldId !== newId) {
        delete updatedBookingIds[oldId];
      }

      setBookingIds(updatedBookingIds);
    },
    [currentBookingUid]
  );

  const handleUpdateBooking = useCallback(
    async (updatedHref: string) => {
      const searchParams = new URLSearchParams(updatedHref);
      const oldBookingLSInd = Object.values(bookingIds).findIndex(
        (v) => v === currentBookingUid
      );
      const oldBookingLSKey = Object.keys(bookingIds)[oldBookingLSInd];
      const updatedBookingLSKey = `${product.productId}:${searchParams.get(
        "date"
      )}:${searchParams.get("slot")}`;

      const res = await updateBooking({
        variables: {
          bookingUid: currentBookingUid,
          input: {
            availabilitySlotKey: searchParams.get("slot"),
            departureDate: dayjs(searchParams.get("date")).format(),
            fareTypesToBook: searchParams
              .getAll("ft-id")
              .filter(
                (_, ind) => !!parseInt(searchParams.getAll("ft")[ind], 10)
              )
              .map((resSysId, ind) => ({
                resSystemFareTypeId: resSysId,
                numberOfSeats: parseInt(searchParams.getAll("ft")[ind], 10),
                resSystemBookingId: searchParams.getAll("ft-booking-id")[ind],
              })),
            discountType: DiscountType.None,
          },
        },
      });

      if (
        !res?.data?.updateBooking?.data?.bookingId ||
        ![
          BookingStatus.Created,
          BookingStatus.Completed,
          BookingStatus.VoucherUsed,
        ].includes(res?.data?.updateBooking?.data?.bookingStatus)
      ) {
        handleError(bookingLSKey);
      } else {
        replaceLSBookingId(oldBookingLSKey, updatedBookingLSKey);
        setBookingData(res.data.updateBooking.data);
      }
    },
    [
      date,
      slot,
      ft,
      fareTypesIds,
      ftbookingIds,
      bookingIds,
      currentBookingUid,
      bookingLSKey,
    ]
  );

  const handleGetBooking = useCallback(async () => {
    const res = await getBooking({
      variables: {
        bookingUid: bookingUid,
      },
      fetchPolicy: "no-cache",
    });

    const participantDetailsRes = await getBookingParticipantDetails({
      variables: {
        bookingUid: bookingUid,
      },
      fetchPolicy: "no-cache",
    });

    if (res?.data?.booking?.bookingId) {
      setIsExistingBooking(true);
      setBookingData({
        ...res.data.booking,
        participantDetails:
          participantDetailsRes.data?.bookingParticipantDetails,
      });
    } else {
      handleError();
    }
  }, [bookingUid]);

  useEffect(() => {
    (async () => {
      if (!bookingUid) {
        await handleCreateBooking();
      } else {
        await handleGetBooking();
      }
    })();
  }, []);

  const handleBookingDetailsChange = useCallback(
    async (updatedHref?: string) => {
      if (currentBookingUid && updatedHref) {
        await handleUpdateBooking(updatedHref);
      }
    },
    [currentBookingUid, bookingLSKey]
  );

  return {
    onBookingDetailsChange: handleBookingDetailsChange,
    bookingUid: bookingUid,
    isExistingBooking,
    bookingData,
  };
};
