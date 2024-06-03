import React, { FC, FormEvent, useEffect } from "react";

import CountryCodeSelect from "@@/pages/components/CountryCodeSelect/CountryCodeSelect";

import { UseFormReturn } from "react-hook-form";
import { useCountryDialCode } from "@@/pages/hooks/useCountryDialCode";
import { ContactDetailsFormData, FIELDS } from "../../types";

import classes from "./ContactDetailsForm.module.scss";
import { contactDetailsDefaultValues } from "./DetailsAccordion";
import Button from "@@/pages/components/Button";

interface ContactDetailsFormProps {
  formData: UseFormReturn<ContactDetailsFormData>;
  noNextButton?: boolean;
  onSubmit: (e?: FormEvent) => Promise<any>;
}

const ContactDetailsForm: FC<ContactDetailsFormProps> = ({ formData, noNextButton, onSubmit }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = formData;
  const { countryDialCode, isoCountryCode } = useCountryDialCode(contactDetailsDefaultValues[FIELDS.COUNTRY_CODE]);

  useEffect(() => {
    setValue(FIELDS.COUNTRY_CODE, countryDialCode);
  }, [countryDialCode]);

  return (
    <form
      className={classes["contact-details-form"]}
      noValidate
      onSubmit={onSubmit}
    >
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="required"
            >
              Your email
            </label>
            <input
              {...register(FIELDS.EMAIL)}
              placeholder="jane@adventures.com"
              maxLength={100}
            />
            {errors[FIELDS.EMAIL] && <span className="text-red-500 text-xs">{errors[FIELDS.EMAIL]?.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:justify-start">
          <div className="col-span-5 lg:col-span-3">
            <CountryCodeSelect
              label="Country code"
              isoCode={isoCountryCode}
              dialCode={countryDialCode}
              fieldsDialCode={FIELDS.COUNTRY_CODE}
              register={register}
              defaultFields={contactDetailsDefaultValues[FIELDS.COUNTRY_CODE]}
              required={true}
            />
          </div>
          <div className="col-span-7 lg:col-span-9">
            <div className="form-group">
              <label
                htmlFor="contactNumber"
                className="required"
              >
                Phone number
              </label>
              <input
                {...register(FIELDS.CONTACT_NUMBER)}
                maxLength={20}
              />
              {errors[FIELDS.CONTACT_NUMBER] && (
                <span className="text-red-500 text-xs">{errors[FIELDS.CONTACT_NUMBER]?.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 sm:justify-start">
          <div className="col-span-6">
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="required"
              >
                First name
              </label>
              <input
                {...register(FIELDS.FIRST_NAME)}
                maxLength={45}
              />
              {errors[FIELDS.FIRST_NAME] && (
                <span className="text-red-500 text-xs">{errors[FIELDS.FIRST_NAME]?.message}</span>
              )}
            </div>
          </div>
          <div className="col-span-6">
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="required"
              >
                Last name
              </label>
              <input
                {...register(FIELDS.LAST_NAME)}
                maxLength={45}
              />
              {errors[FIELDS.LAST_NAME] && (
                <span className="text-red-500 text-xs">{errors[FIELDS.LAST_NAME]?.message}</span>
              )}
            </div>
          </div>
        </div>
        {!noNextButton ? (
          <div>
            <Button
              type="submit"
              variant="primary"
              className={classes["submit-button"]}
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ContactDetailsForm;
