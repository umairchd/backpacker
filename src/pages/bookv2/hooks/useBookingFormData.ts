import { gql } from "graphql-tag";
import { FormEvent, useCallback, useContext, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  BookingParticipantDetailsInput,
  useBookingContactInfoLazyQuery,
  useBookingExtraInfoLazyQuery,
  useCreateBookingContactInfoMutation,
  useCreateBookingExtraInfoMutation,
  useUpdateBookingContactInfoMutation,
  useUpdateBookingExtraInfoMutation,
  useUpdateBookingParticipantDetailsMutation,
  useUpdateBookingPickupMutation,
} from "./useBookingFormData.generated";
import {
  BookingDetailsFormData,
  ContactDetailsFormData,
  FIELDS,
} from "../types";
import { BookingAnswerLevel } from "@@/types.generated";
import { BookingInfoContext } from "../[slug]/components/BookingPage";

gql`
  query ValidateAvailabilityAndPricing($bookingUid: String) {
    validateAvailabilityAndPricing(bookingUid: $bookingUid)
  }

  fragment BookingContactInfoValues on BookingContactInfoPayload {
    email
    firstName
    id
    lastName
    phone
  }

  query BookingContactInfo($bookingUid: String) {
    bookingContactInfo(bookingUid: $bookingUid) {
      ...BookingContactInfoValues
    }
  }

  fragment BookingParticipantDetailsValues on BookingParticipantDetailsPayload {
    bookingFareTypeId
    bookingFareTypeName
    firstName
    id
    lastName
  }

  query BookingParticipantDetails($bookingUid: String) {
    bookingParticipantDetails(bookingUid: $bookingUid) {
      ...BookingParticipantDetailsValues
    }
  }

  query BookingExtraInfo($bookingUid: String) {
    bookingExtraInfo(bookingUid: $bookingUid) {
      message
    }
  }

  mutation CreateBookingContactInfo(
    $bookingUid: String
    $input: BookingContactInfoInput!
  ) {
    bookingContactInfo(bookingUid: $bookingUid, input: $input) {
      email
      firstName
      id
      lastName
      phone
    }
  }

  mutation CreateBookingExtraInfo($bookingUid: String, $message: String!) {
    bookingExtraInfo(bookingUid: $bookingUid, message: $message) {
      message
    }
  }

  mutation UpdateBookingContactInfo(
    $bookingUid: String
    $input: BookingContactInfoInput!
  ) {
    updateBookingContactInfo(bookingUid: $bookingUid, input: $input) {
      email
      firstName
      id
      lastName
      phone
    }
  }

  mutation UpdateBookingParticipantDetails(
    $bookingUid: String
    $input: [BookingParticipantDetailsInput!]!
  ) {
    updateBookingParticipantDetails(bookingUid: $bookingUid, input: $input) {
      bookingFareTypeId
      bookingFareTypeName
      firstName
      id
      lastName
    }
  }

  mutation UpdateBookingExtraInfo($bookingUid: String, $message: String!) {
    updateBookingExtraInfo(bookingUid: $bookingUid, message: $message) {
      message
    }
  }

  mutation UpdateBookingPickup(
    $bookingUid: String
    $input: BookingPickupInput!
  ) {
    bookingPickup(bookingUid: $bookingUid, input: $input) {
      name
      address
      pickupId
      offset
      additionalNotes
    }
  }
`;

export default ({
  contactDetailsFormData,
  bookingDetailsFormData,
  bookingUid,
  isExistingBooking,
  validateBookingAnP,
  setActiveKey,
  pickUpDropOffData,
}: {
  contactDetailsFormData: UseFormReturn<ContactDetailsFormData>;
  bookingDetailsFormData: UseFormReturn<BookingDetailsFormData>;
  bookingUid: string;
  isExistingBooking: boolean;
  validateBookingAnP: (bookingUid: string) => void;
  setActiveKey: (key: string[]) => void;
  pickUpDropOffData;
}) => {
  const [setBookingContactInfo] = useCreateBookingContactInfoMutation();
  const [setBookingExtraInfo] = useCreateBookingExtraInfoMutation();
  const [updateBookingContactInfo] = useUpdateBookingContactInfoMutation();
  const [updateBookingParticipantsDetails] =
    useUpdateBookingParticipantDetailsMutation();
  const [updateBookingExtraInfo] = useUpdateBookingExtraInfoMutation();
  const [getBookingContactInfo, { data: bookingContactInfoData }] =
    useBookingContactInfoLazyQuery();
  const [getBookingExtraInfo, { data: bookingExtraInfoData }] =
    useBookingExtraInfoLazyQuery();
  const [updateBookingPickup] = useUpdateBookingPickupMutation();
  const { data: bookingData } = useContext(BookingInfoContext);

  useEffect(() => {
    if (isExistingBooking && bookingUid) {
      getBookingContactInfo({
        variables: {
          bookingUid: bookingUid,
        },
      });

      getBookingExtraInfo({
        variables: {
          bookingUid: bookingUid,
        },
      });
    }
  }, [isExistingBooking, bookingUid]);

  useEffect(() => {
    if (bookingContactInfoData?.bookingContactInfo) {
      contactDetailsFormData.reset(bookingContactInfoData.bookingContactInfo);
    }
  }, [bookingContactInfoData]);

  useEffect(() => {
    if (bookingExtraInfoData?.bookingExtraInfo) {
      bookingDetailsFormData.resetField(FIELDS.SPECIAL_REQUIREMENTS, {
        defaultValue: bookingExtraInfoData.bookingExtraInfo.message,
      });
    }
  }, [bookingExtraInfoData]);

  const onContactDetailsSubmit: (e?: FormEvent) => Promise<any> = async (e) => {
    e?.preventDefault();
    let res = null;

    await contactDetailsFormData.handleSubmit(async (formData) => {
      contactDetailsFormData.reset(formData, { keepDirty: false });

      if (bookingData?.participantDetails?.length > 0) {
        bookingDetailsFormData.resetField(`${FIELDS.PERSON}.0`, {
          defaultValue: {
            [FIELDS.FIRST_NAME]: formData[FIELDS.FIRST_NAME],
            [FIELDS.LAST_NAME]: formData[FIELDS.LAST_NAME],
            [FIELDS.PERSON_ID]: bookingData.participantDetails[0].id,
          },
        });
      }

      setActiveKey(["booking"]);
      res = formData;
    })();

    return res;
  };

  const onContactDetailFinalsSubmit: (e?: FormEvent) => Promise<any> = async (
    e
  ) => {
    e?.preventDefault();
    let res = null;

    await contactDetailsFormData.handleSubmit(async (formData) => {
      contactDetailsFormData.reset(formData, { keepDirty: false });

      setActiveKey(["booking"]);
      res = formData;
    })();

    return res;
  };

  const onBookingDetailsSubmit = async () => {
    let res = null;

    await bookingDetailsFormData.handleSubmit(async (formData) => {
      res = formData;
    })();

    return res;
  };

  const onSubmit = useCallback(async () => {
    const bookingDetails = await onBookingDetailsSubmit();
    const contactDetails = await onContactDetailFinalsSubmit();

    if (pickUpDropOffData) {
      const bookingPickUp = pickUpDropOffData.find(
        (p) => p.name === bookingDetails[FIELDS.PICKUP_LOCATION]
      );

      const bookingPickUpVariables = {
        bookingUid: bookingUid,
        input: {
          pickupId: bookingPickUp?.id,
          name: bookingDetails[FIELDS.PICKUP_LOCATION],
          address: bookingPickUp?.address,
          offset: bookingPickUp?.offset,
          additionalNotes: bookingDetails[FIELDS.SPECIAL_REQUIREMENTS],
        },
      };

      await updateBookingPickup({
        variables: {
          ...bookingPickUpVariables,
        },
      });
    }

    if (bookingDetails && contactDetails) {
      const customBookingFieldsKeys = Object.keys(bookingDetails).filter(
        (k) =>
          ![
            FIELDS.PERSON,
            FIELDS.SPECIAL_REQUIREMENTS,
            FIELDS.PICKUP_LOCATION,
          ].includes(k as FIELDS)
      );
      const customBookingFieldsData = customBookingFieldsKeys.map((k) => ({
        answerValue: bookingDetails[k],
        // TODO: Comment the answerLevel first due to become a blocker on the pipeline build
        // answerLevel: BookingAnswerLevel.Booking,
        // TODO: Need to change the customBookingFieldId type from int to String on both FE & BE side
        customBookingFieldId: parseInt(k),
      }));
      const participantDetailVariables: {
        bookingUid: string;
        input: BookingParticipantDetailsInput[];
      } = {
        bookingUid: bookingUid,
        input: bookingDetails[FIELDS.PERSON].map((p, ind) => ({
          firstName: p[FIELDS.FIRST_NAME],
          lastName: p[FIELDS.LAST_NAME],
          id: p[FIELDS.PERSON_ID],
          customBookingFields: Object.keys(p)
            .filter(
              (k) =>
                ![
                  FIELDS.FIRST_NAME,
                  FIELDS.LAST_NAME,
                  FIELDS.PERSON_ID,
                ].includes(k as FIELDS)
            )
            .map((k) => ({
              answer: p[k],
              answerLevel: BookingAnswerLevel.Participant,
              customBookingFieldId: k,
            })),
        })),
      };
      const contactInfoVariables = {
        bookingUid: bookingUid,
        input: {
          email: contactDetails[FIELDS.EMAIL],
          firstName: contactDetails[FIELDS.FIRST_NAME],
          lastName: contactDetails[FIELDS.LAST_NAME],
          phone: `${contactDetails[FIELDS.COUNTRY_CODE]}${
            contactDetails[FIELDS.CONTACT_NUMBER]
          }`,
          customBookingFields: customBookingFieldsData,
        },
      };

      await updateBookingParticipantsDetails({
        variables: participantDetailVariables,
      });

      if (isExistingBooking && bookingContactInfoData?.bookingContactInfo) {
        await updateBookingContactInfo({
          variables: contactInfoVariables,
        });
      } else {
        await setBookingContactInfo({
          variables: contactInfoVariables,
        });
      }

      if (isExistingBooking && bookingExtraInfoData?.bookingExtraInfo) {
        await updateBookingExtraInfo({
          variables: {
            bookingUid: bookingUid,
            message: bookingDetails[FIELDS.SPECIAL_REQUIREMENTS],
          },
        });
      } else if (bookingDetails[FIELDS.SPECIAL_REQUIREMENTS]) {
        await setBookingExtraInfo({
          variables: {
            bookingUid: bookingUid,
            message: bookingDetails[FIELDS.SPECIAL_REQUIREMENTS],
          },
        });
      }

      validateBookingAnP(bookingUid);
    }
  }, [isExistingBooking, bookingExtraInfoData, pickUpDropOffData]);

  return {
    onSubmit,
    onContactDetailsSubmit,
  };
};
