import React, { FC, useState, useContext, useEffect, useCallback } from "react";

import ContactDetailsForm from "./ContactDetailsForm";
import BookingDetailsForm from "./BookingDetailsForm";
import GreenAlertBox from "./GreenAlertBox";
import {
  BookingDetailsFormData,
  ContactDetailsFormData,
  FIELDS,
} from "../../types";
import { useBookingDetailsForm, useContactDetailsForm } from "./forms";
import PageFooter from "./PageFooter";
import useBookingFormData from "../../hooks/useBookingFormData";
import usePickUpDropOffData from "../../hooks/usePickUpDropOffData";
import { PickupDropOffType } from "@@/types.generated";
import useCustomBookingFields from "../../hooks/useCustomBookingFields";
import { BookingInfoContext } from "./BookingPage";
import { Disclosure } from "@headlessui/react";

import classes from "./DetailsAccordion.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

export const contactDetailsDefaultValues: ContactDetailsFormData = {
  [FIELDS.EMAIL]: "",
  [FIELDS.FIRST_NAME]: "",
  [FIELDS.LAST_NAME]: "",
  [FIELDS.COUNTRY_CODE]: "+61",
  [FIELDS.CONTACT_NUMBER]: "",
};

interface DetailsAccordionProps {
  bookingUid?: string;
  isExistingBooking: boolean;
  validateBookingAnP: (bookingUid: string) => void;
}

const DetailsAccordion: FC<DetailsAccordionProps> = ({
  bookingUid,
  isExistingBooking,
  validateBookingAnP,
}) => {
  const [activeKey, setActiveKey] = useState(["contact"]);
  const { data: bookingData } = useContext(BookingInfoContext);

  const contactDetailsFormData = useContactDetailsForm(
    contactDetailsDefaultValues
  );

  const bookingDetailsDefaultValues: BookingDetailsFormData = {
    [FIELDS.SPECIAL_REQUIREMENTS]: "",
    [FIELDS.PERSON]: bookingData.participantDetails?.map((i) => ({
      [FIELDS.FIRST_NAME]: "",
      [FIELDS.LAST_NAME]: "",
      [FIELDS.PERSON_ID]: i?.id,
    })),
  };

  const pickUpDropOffData = usePickUpDropOffData();

  const pickUpLocationOptions = pickUpDropOffData
    ?.filter((i) => i.type === PickupDropOffType.Pickup)
    .map((i) => i.name);

  const {
    customBookingFields,
    customBookingFieldsConfigs,
    customBookingFieldsPerson,
    customBookingFieldsBooking,
  } = useCustomBookingFields();

  const bookingDetailsFormData = useBookingDetailsForm(
    bookingDetailsDefaultValues,
    pickUpLocationOptions,
    customBookingFields,
    customBookingFieldsConfigs?.customBookingStringFieldsConfigs,
    customBookingFieldsConfigs?.customBookingMapFieldsConfigs
  );

  useEffect(() => {
    if (bookingData?.participantDetails) {
      const newValues = bookingData.participantDetails.map((i) => ({
        [FIELDS.FIRST_NAME]: i?.firstName || "",
        [FIELDS.LAST_NAME]: i?.lastName || "",
        [FIELDS.PERSON_ID]: i?.id || 0,
      }));

      bookingDetailsFormData.reset({
        [FIELDS.PERSON]: newValues,
      });
    }
  }, [bookingData?.participantDetails, customBookingFieldsConfigs]);

  const { onSubmit, onContactDetailsSubmit } = useBookingFormData({
    contactDetailsFormData,
    bookingDetailsFormData,
    bookingUid: bookingUid,
    isExistingBooking,
    validateBookingAnP,
    setActiveKey,
    pickUpDropOffData,
  });

  const {
    formState: { isValid: isContactDetailsFormValid },
  } = contactDetailsFormData;

  const {
    formState: { isValid: isBookingDetailsFormValid },
  } = bookingDetailsFormData;

  const handleAccordionItemClick = useCallback(
    (key: string) => {
      const updatedKeys = [...activeKey];

      setActiveKey(
        updatedKeys.includes(key)
          ? updatedKeys.filter((k) => k !== key)
          : updatedKeys.concat([key])
      );
    },
    [activeKey]
  );

  return (
    <div>
      <GreenAlertBox />
      <div className={`white-card ${classes["contact-details-card"]}`}>
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lgfocus:outline-none">
                  <h2 onClick={() => handleAccordionItemClick("contact")}>
                    <FaPlus />
                    <FaMinus />
                    Contact details
                    {isContactDetailsFormValid && (
                      <div className={classes["check-icon-wrapper"]}>
                        <FaCheckCircle />
                      </div>
                    )}
                  </h2>
                </Disclosure.Button>
                <Disclosure.Panel>
                  <ContactDetailsForm
                    formData={contactDetailsFormData}
                    onSubmit={onContactDetailsSubmit}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lgfocus:outline-none">
                  <h2 onClick={() => handleAccordionItemClick("booking")}>
                    <FaPlus />
                    <FaMinus />
                    Booking details
                    {isBookingDetailsFormValid && (
                      <div className={classes["check-icon-wrapper"]}>
                        <FaCheckCircle />
                      </div>
                    )}
                  </h2>
                </Disclosure.Button>
                <Disclosure.Panel>
                  <div className={classes["booking-details-wrapper"]}>
                    <BookingDetailsForm
                      formData={bookingDetailsFormData}
                      pickupDetailsOptions={pickUpLocationOptions}
                      customBookingMapFieldsConfigs={
                        customBookingFieldsConfigs.customBookingMapFieldsConfigs
                      }
                      customBookingFieldsPerson={customBookingFieldsPerson}
                      customBookingFieldsBooking={customBookingFieldsBooking}
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      <PageFooter
        isButtonDisabled={
          !isContactDetailsFormValid || !isBookingDetailsFormValid
        }
        onSubmit={onSubmit}
        buttonText="Continue to Payment"
      />
    </div>
  );
};

export default DetailsAccordion;
