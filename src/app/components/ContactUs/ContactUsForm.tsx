"use client";

import React, { useState, useMemo, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import keys from "lodash/keys";
import pick from "lodash/pick";

import { FIELDS, ENQUIRY_TYPES, ContactUsFormData, CANCELLED_BY_OPTIONS, REFUND_OPTIONS } from "./types";
import { defaultValues, getConvertedDate } from "./utils";
import { useContactUsForm } from "./hooks";
import NotificationPopup from "@@/features/notificationPopup";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import useTracking from "@@/pages/lib/useTracking";
import CountryCodeSelect from "@@/pages/components/CountryCodeSelect/CountryCodeSelect";
import { useCountryDialCode } from "@@/pages/hooks/useCountryDialCode";
import { defaultValueForm } from "@@/pages/utils/defaultValueForm";
import DatePickerComponent from "@@/pages/components/DatePicker/DatePicker";

const ContactUsForm = () => {
  const [modalShown, setModalShown] = useState(false);
  const query = useSearchParams();
  const { name } = useServerContext();
  const { track } = useTracking();

  const { countryDialCode, isoCountryCode } = useCountryDialCode(defaultValueForm[FIELDS.COUNTRY_CODE]);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    tourDateField,
    enquiryTypeValue,
    setValue,
    getValues,
  } = useContactUsForm({
    ...defaultValues,
    ...pick(Object.fromEntries(query), keys(defaultValues)),
  });

  const isRefundOrCancellation = useMemo(
    () => enquiryTypeValue === "enquiry_refund_or_cancellation",
    [enquiryTypeValue],
  );

  useEffect(() => {
    setValue(FIELDS.COUNTRY_CODE, countryDialCode);
    console.log(getValues());
  }, [setValue, countryDialCode, getValues]);

  const prepareBody = (formData: ContactUsFormData) => {
    return {
      request: {
        requester: {
          email: formData[FIELDS.EMAIL],
          name: `${formData[FIELDS.FIRST_NAME]} ${formData[FIELDS.LAST_NAME]}`,
        },
        subject: `Contact - ${ENQUIRY_TYPES.find((i) => i.value === formData[FIELDS.ENQUIRY_TYPE]).label} - ${name}`,
        comment: {
          body: `
            Contact number: ${formData[FIELDS.COUNTRY_CODE]} ${formData[FIELDS.CONTACT_NUMBER]}\n\n
            ${formData[FIELDS.PRODUCT_NAME] ? `Product name: ${formData[FIELDS.PRODUCT_NAME]}\n\n` : ""}
            ${
              ["enquiry_booking_amendment", "enquiry_refund_or_cancellation"].includes(formData[FIELDS.ENQUIRY_TYPE])
                ? `
                Booking Ref. / Invoice Number: ${formData[FIELDS.INVOICE_NUMBER]}\n\n
              `
                : ""
            }
            ${
              isRefundOrCancellation
                ? `
                Tour date: ${getConvertedDate(formData[FIELDS.TOUR_DATE])}\n\n
                Cancelled by: ${CANCELLED_BY_OPTIONS.find((i) => i.value === formData[FIELDS.CANCELLED_BY]).label}\n\n
                Refund Option: ${REFUND_OPTIONS.find((i) => i.value === formData[FIELDS.REFUND_OPTION]).label}\n\n
              `
                : ""
            }
            ${formData[FIELDS.DESCRIPTION]}
          `,
        },
      },
    };
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const body = prepareBody(formData);
      await window.submitContactUsForm?.({
        request: {
          ...body.request,
          custom_fields: [
            { id: 360017362554, value: "Web" },
            {
              id: 4732733426191,
              value: formData ? formData?.[FIELDS.ENQUIRY_TYPE] : "",
            },
          ],
        },
      });
      track({
        event: "ContactUsFormSubmit",
      });
      setModalShown(true);
    } catch (e) {
      alert("Something went wrong, please try again later");
    }
  });

  const closeModal = () => {
    reset(defaultValues);
    setModalShown(false);
  };

  return (
    <div className="shadow-box rounded-xl py-5 px-10 bg-white">
      <h2 className="text-2xl font-bold mb-4 heading">Make an Enquiry</h2>
      <div>
        <NotificationPopup
          show={modalShown}
          type="success"
          size="sm"
          title="Message Sent"
          text={`Your message is sent to our customer support team and someone from our team will be in contact with you within the next ${
            isRefundOrCancellation ? "72" : "24"
          } hours.`}
          centered={true}
          buttonText="Close"
          buttonAction={closeModal}
          closeModal={closeModal}
        />
        <form
          className="contact-us-form"
          noValidate
          onSubmit={onSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="text-black text-xs font-bold inline-block mb-2 relative required-label"
            >
              Email address
            </label>
            <input
              {...register(FIELDS.EMAIL)}
              placeholder="jane@adventures.com"
              className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
            />
            {errors[FIELDS.EMAIL] && <span className="text-red-500 text-xs">{errors[FIELDS.EMAIL]?.message}</span>}
          </div>
          <div className="grid grid-cols-12 gap-6 my-4">
            <div className="col-span-12 md:col-span-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="text-black text-xs font-bold inline-block mb-2 relative required-label"
                >
                  First name
                </label>
                <input
                  {...register(FIELDS.FIRST_NAME)}
                  className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                />
                {errors[FIELDS.FIRST_NAME] && (
                  <span className="text-red-500 text-xs">{errors[FIELDS.FIRST_NAME]?.message}</span>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div>
                <label
                  htmlFor="last-name"
                  className="text-black text-xs font-bold inline-block mb-2 relative required-label"
                >
                  Last name
                </label>
                <input
                  {...register(FIELDS.LAST_NAME)}
                  className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                />
                {errors[FIELDS.LAST_NAME] && (
                  <span className="text-red-500 text-xs">{errors[FIELDS.LAST_NAME]?.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 mb-4">
            <div className="col-span-5 lg:col-span-3">
              <CountryCodeSelect
                labelClass="text-black text-xs font-bold block mb-2"
                register={register}
                fieldsDialCode={FIELDS.COUNTRY_CODE}
                label="Country code"
                dialCode={countryDialCode}
                isoCode={isoCountryCode}
                defaultFields={countryDialCode[FIELDS.COUNTRY_CODE]}
              />
            </div>
            <div className="col-span-7 lg:col-span-9">
              <div>
                <label
                  htmlFor="contact-number"
                  className="text-black text-xs font-bold inline-block mb-2 relative required-label"
                >
                  Phone number
                </label>
                <input
                  {...register(FIELDS.CONTACT_NUMBER)}
                  className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light  "
                />
                {errors[FIELDS.CONTACT_NUMBER] && (
                  <span className="text-red-500 text-xs">{errors[FIELDS.CONTACT_NUMBER]?.message}</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="enquiry-type"
              className="text-black text-xs font-bold inline-block mb-2 relative required-label"
            >
              Enquiry Type
            </label>
            <select
              {...register(FIELDS.ENQUIRY_TYPE)}
              className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light  "
            >
              <option
                key="default"
                value=""
                disabled
              >
                Select an option
              </option>
              {ENQUIRY_TYPES.map((i) => (
                <option
                  key={i.value}
                  value={i.value}
                >
                  {i.label}
                </option>
              ))}
            </select>
            {errors[FIELDS.ENQUIRY_TYPE] && (
              <span className="text-red-500 text-xs">{errors[FIELDS.ENQUIRY_TYPE]?.message}</span>
            )}
          </div>
          {["enquiry_booking_amendment", "enquiry_refund_or_cancellation"].includes(enquiryTypeValue) && (
            <div className="mt-4">
              <label
                htmlFor="invoice-number"
                className="text-black text-xs font-bold inline-block mb-2 relative required-label"
              >
                Booking Ref. / Invoice Number
              </label>
              <input
                {...register(FIELDS.INVOICE_NUMBER)}
                placeholder="Hint:  Starts with TINV"
                className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light  "
              />
              {errors[FIELDS.INVOICE_NUMBER] && (
                <span className="text-red-500 text-xs">{errors[FIELDS.INVOICE_NUMBER]?.message}</span>
              )}
            </div>
          )}
          <div className="my-4">
            <label
              htmlFor="product-name"
              className="text-black text-xs font-bold block mb-2"
            >
              Product Name
            </label>
            <input
              {...register(FIELDS.PRODUCT_NAME)}
              placeholder="Type the name of your Product"
              className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light  "
            />
          </div>
          {isRefundOrCancellation && (
            <>
              <div>
                <label
                  htmlFor="tour-date"
                  className="text-black text-xs font-bold inline-block mb-2 relative required-label"
                >
                  Tour Date
                </label>
                <DatePickerComponent
                  value={tourDateField.value}
                  dateFormat="dd/MM/yyyy"
                  error={!!errors[FIELDS.TOUR_DATE]}
                  onChange={tourDateField.onChange}
                />
                {errors[FIELDS.TOUR_DATE] && (
                  <span className="text-red-500 text-xs">{errors[FIELDS.TOUR_DATE]?.message}</span>
                )}
              </div>
              <div className="my-4">
                <label
                  htmlFor="cancelled-by"
                  className="text-black text-xs font-bold inline-block mb-2 relative required-label"
                >
                  Who was the booking cancelled by?
                </label>
                <select
                  {...register(FIELDS.CANCELLED_BY)}
                  className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light  "
                >
                  <option
                    key="default"
                    value=""
                    disabled
                  >
                    Select an option
                  </option>
                  {CANCELLED_BY_OPTIONS.map((i) => (
                    <option
                      key={i.value}
                      value={i.value}
                    >
                      {i.label}
                    </option>
                  ))}
                </select>
                {errors[FIELDS.CANCELLED_BY] && (
                  <span className="text-red-500 text-xs">{errors[FIELDS.CANCELLED_BY]?.message}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="refund-option"
                  className="text-black text-xs font-bold inline-block mb-2 relative required-label"
                >
                  Refund Option
                </label>
                <select
                  {...register(FIELDS.REFUND_OPTION)}
                  className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light  "
                >
                  <option
                    key="default"
                    value=""
                    disabled
                  >
                    Select an option
                  </option>
                  {REFUND_OPTIONS.map((i) => (
                    <option
                      key={i.value}
                      value={i.value}
                    >
                      {i.label}
                    </option>
                  ))}
                </select>
                {errors[FIELDS.REFUND_OPTION] && (
                  <span className="text-red-500 text-xs">{errors[FIELDS.REFUND_OPTION]?.message}</span>
                )}
              </div>
            </>
          )}
          <div className="my-4">
            <label
              htmlFor="description"
              className={
                isRefundOrCancellation
                  ? "text-black text-xs font-bold inline-block mb-2 relative required-label"
                  : "text-black text-xs font-bold inline-block mb-2"
              }
            >
              How can we help you?
            </label>
            <input
              {...register(FIELDS.DESCRIPTION)}
              placeholder={
                isRefundOrCancellation
                  ? "Please provide additional information about your refund / credit / cancellation request"
                  : "Enter your queries"
              }
              className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg flex items-center gap-2 overflow-hidden py-3 px-2 ring-theme outline-primary  "
            />
            {errors[FIELDS.DESCRIPTION] && (
              <span className="text-red-500 text-xs">{errors[FIELDS.DESCRIPTION]?.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 block w-fit bg-primary px-4 py-10px text-white rounded-lg text-sm font-medium hover:bg-primary/80"
          >
            {isSubmitting ? <div className="spinner" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
