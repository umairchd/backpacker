import React, { FC, Fragment, useEffect, useState } from "react";

import { useEnquireNowForm } from "./hooks";
import { FIELDS, defaultValues, EnquireNowFormData, EnquireNowIterableBody, EnquireNowModalProps } from "./types";

import useTracking from "@@/pages/lib/useTracking";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { postIterableEventTrack } from "@@/pages/utils/iterableEventTrack";
import { useCountryDialCode } from "@@/pages/hooks/useCountryDialCode";
import CountryCodeSelect from "@@/pages/components/CountryCodeSelect/CountryCodeSelect";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Button from "@@/pages/components/Button";
import { FaCircleCheck } from "react-icons/fa6";

const EnquireNowModal: FC<EnquireNowModalProps> = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { track } = useTracking();
  const { siteConfig } = useServerContext();
  const { iterable_key } = siteConfig ?? {};
  const { countryDialCode, isoCountryCode } = useCountryDialCode(defaultValues[FIELDS.COUNTRY_CODE]);

  const isLoading = props.isLoading || false;
  const isMobile = props.isMobile;

  const getDefaultFormValues = () => {
    defaultValues[FIELDS.PRODUCT_NAME] = props.productName || "";
    defaultValues[FIELDS.PRODUCT_URL] = props.productUrl || "";

    return defaultValues;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useEnquireNowForm(getDefaultFormValues());

  useEffect(() => {
    setValue(FIELDS.COUNTRY_CODE, countryDialCode);
  }, [setValue, countryDialCode]);

  const prepareZenDeskData = (formData: EnquireNowFormData) => {
    return {
      request: {
        requester: {
          email: formData[FIELDS.EMAIL],
          name: `${formData[FIELDS.FIRST_NAME]} ${formData[FIELDS.LAST_NAME]}`,
        },
        subject: "Multi Day Enquiry",
        comment: {
          body: `Contact number: ${formData[FIELDS.COUNTRY_CODE]} ${formData[FIELDS.CONTACT_NUMBER]}\n\nProduct name: ${
            formData[FIELDS.PRODUCT_NAME]
          }\n\n${formData[FIELDS.PRODUCT_URL]}`,
        },
      },
    };
  };

  const prepareIterableData = (formData: EnquireNowFormData): EnquireNowIterableBody => {
    return {
      user: {
        email: formData[FIELDS.EMAIL],
        dataFields: {
          phoneNumber: formData[FIELDS.COUNTRY_CODE] + formData[FIELDS.CONTACT_NUMBER],
          firstName: formData[FIELDS.FIRST_NAME],
          lastName: formData[FIELDS.LAST_NAME],
          multiDay: true,
          emailVerified: false,
        },
      },
      event: {
        email: formData[FIELDS.EMAIL],
        eventName: "multiDayEnquiry",
        dataFields: {
          productName: formData[FIELDS.PRODUCT_NAME],
        },
      },
    };
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const zendeskBody = prepareZenDeskData(formData);

      await window.submitContactUsForm({
        request: {
          ...zendeskBody.request,
          custom_fields: [{ id: 360017362554, value: "Web" }],
        },
      });

      if (iterable_key) {
        await postIterableEventTrack(prepareIterableData(formData), iterable_key);
      }

      track({
        event: "MultiDayFormSubmit",
      });

      reset(defaultValues);
      setSubmitted(true);
    } catch (e) {
      console.log(e);
      alert("Something went wrong, please try again later");
    }
  });

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        id="EnquireNowButtonClick"
        disabled={isLoading}
        variant={isMobile ? "primary-mobile" : "primary"}
      >
        Enquire Now
      </Button>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <h4 className="text-2xl font-medium mb-3">Request More Info</h4>
                  {!submitted ? (
                    <form
                      noValidate
                      onSubmit={onSubmit}
                    >
                      <h6 className="text-xl font-medium mb-4">{props.productName}</h6>
                      <div className="relative mb-4">
                        <label
                          htmlFor="email"
                          className="text-labelT text-sm font-normal block mb-1"
                        >
                          Email address
                        </label>
                        <input
                          {...register(FIELDS.EMAIL)}
                          placeholder="Enter your email"
                          type="email"
                          className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                        />
                        {errors[FIELDS.EMAIL] && (
                          <span className="text-red-500 text-xs">{errors[FIELDS.EMAIL]?.message}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="text-labelT text-sm font-normal block mb-1"
                          >
                            First name
                          </label>
                          <input
                            {...register(FIELDS.FIRST_NAME)}
                            placeholder="First Name"
                            type="text"
                            className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                          />
                          {errors[FIELDS.FIRST_NAME] && (
                            <span className="text-red-500 text-xs">{errors[FIELDS.FIRST_NAME]?.message}</span>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="text-labelT text-sm font-normal block mb-1"
                          >
                            Last name
                          </label>
                          <input
                            {...register(FIELDS.LAST_NAME)}
                            placeholder="Last Name"
                            type="text"
                            className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                          />
                          {errors[FIELDS.LAST_NAME] && (
                            <span className="text-red-500 text-xs">{errors[FIELDS.LAST_NAME]?.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-6">
                        <div className="sm:col-span-3 col-span-12">
                          <CountryCodeSelect
                            register={register}
                            fieldsDialCode={FIELDS.COUNTRY_CODE}
                            label="Country code"
                            dialCode={countryDialCode}
                            isoCode={isoCountryCode}
                            defaultFields={countryDialCode[FIELDS.COUNTRY_CODE]}
                          />
                        </div>
                        <div className="sm:col-span-9 col-span-12">
                          <div className="position-relative form-group">
                            <label
                              htmlFor="contactNumber"
                              className="text-labelT text-sm font-normal block mb-1"
                            >
                              Contact Number
                            </label>
                            <input
                              {...register(FIELDS.CONTACT_NUMBER)}
                              placeholder="Phone Number"
                              type="text"
                              className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                            />
                            {errors[FIELDS.CONTACT_NUMBER] && (
                              <span className="text-red-500 text-xs">{errors[FIELDS.CONTACT_NUMBER]?.message}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="my-6 shadow-box placeholder:font-light hover:bg-white hover:text-primary rounded-xl bg-primary sm:h-12 sm:text-base block w-full h-10 px-3 text-xs font-normal leading-6 text-white transition-all duration-300 ease-in-out outline-none"
                      >
                        Submit
                      </button>
                      <p className="text-sm text-center">
                        By submitting you agree to our{" "}
                        <a
                          className="text-primary"
                          href="/terms-and-conditions"
                          target="_blank"
                        >
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          className="text-primary"
                          href="/privacy-policy"
                          target="_blank"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </form>
                  ) : (
                    <div className="py-10 text-center">
                      <h1 className="py-4 text-4xl text-lightGreen flex items-center justify-center gap-2">
                        <FaCircleCheck className="w-9 h-9 text-inherit" />
                        THANKS
                      </h1>
                      <h4>One of our travel experts will be in touch with you shortly.</h4>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center outline-none absolute top-6 right-6"
                  >
                    <FiX className="w-7 h-7 text-primary" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EnquireNowModal;
