import React, { FC, useCallback, useContext, useState } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/router";

import { BookingDetailsFormData, FIELDS } from "../../types";
import { CustomBookingFieldType, VisibilityLevel } from "@@/types.generated";
import {
  CustomBookingFieldFragment,
  CustomBookingFieldMapTypeConfigFragment,
} from "../../hooks/useCustomBookingFields.generated";
import { BookingInfoContext } from "./BookingPage";

import classes from "./BookingDetailsForm.module.scss";
import Button from "@@/pages/components/Button";
import { FaHeart, FaLocationDot, FaPencil, FaUser } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

interface BookingDetailsFormProps {
  pickupDetailsOptions: string[];
  formData: UseFormReturn<BookingDetailsFormData> & {
    personFieldsProps: UseFieldArrayReturn<BookingDetailsFormData>;
  };
  customBookingMapFieldsConfigs?: CustomBookingFieldMapTypeConfigFragment[];
  customBookingFieldsPerson: CustomBookingFieldFragment[];
  customBookingFieldsBooking: CustomBookingFieldFragment[];
}

const BookingDetailsForm: FC<BookingDetailsFormProps> = ({
  pickupDetailsOptions,
  formData,
  customBookingMapFieldsConfigs,
  customBookingFieldsPerson,
  customBookingFieldsBooking,
}) => {
  const router = useRouter();
  const fareTypeAmounts = router.query["ft"];
  const [expandedBlocks, setExpandedBlocks] = useState<{
    [key: number]: boolean;
  }>({ 0: true });
  const {
    register,
    trigger,
    formState: { errors, isValid },
  } = formData;
  const { data: bookingData } = useContext(BookingInfoContext);

  const onNextClick = useCallback(
    async (ind) => {
      const fields = formData.personFieldsProps.fields;
      const expandedBlockValues = fields[ind];
      const isValid = await trigger(
        Object.keys(expandedBlockValues).map((fieldName) => {
          return `${FIELDS.PERSON}.${ind}.${fieldName}`;
        }) as `person.${number}.${string}`[],
      );

      if (isValid) {
        const nextUnfilledBlockInd = fields.findIndex((f) => !(f[FIELDS.FIRST_NAME] && f[FIELDS.LAST_NAME]));

        if (nextUnfilledBlockInd > 0) {
          setExpandedBlocks({
            ...expandedBlocks,
            [ind]: false,
            [nextUnfilledBlockInd]: true,
          });
        } else {
          setExpandedBlocks({
            ...expandedBlocks,
            [ind]: false,
          });
        }
      }
    },
    [isValid, formData.personFieldsProps, expandedBlocks],
  );

  const fareTypeLabels = bookingData?.participantDetails?.map((p, index, array) => {
    if (p.firstName) {
      return `${p.firstName} ${p.lastName}`;
    } else {
      const count = array.filter(
        (item) => item.bookingFareTypeId === p.bookingFareTypeId && item.bookingFareTypeName === p.bookingFareTypeName,
      ).length;

      if (count > 1) {
        const currentCount = array
          .slice(0, index)
          .filter(
            (item) =>
              item.bookingFareTypeId === p.bookingFareTypeId && item.bookingFareTypeName === p.bookingFareTypeName,
          ).length;
        return `${p.bookingFareTypeName} ${currentCount + 1}`;
      } else {
        return p.bookingFareTypeName;
      }
    }
  });

  const getPersonBlockLabel = useCallback(
    (ind) => {
      const fieldValue = formData.personFieldsProps.fields[ind] || {};

      if (!expandedBlocks[ind] && fieldValue[FIELDS.FIRST_NAME] && fieldValue[FIELDS.LAST_NAME]) {
        return (
          <h3>
            {`${fieldValue[FIELDS.FIRST_NAME]} ${fieldValue[FIELDS.LAST_NAME]}`}
            {!expandedBlocks[ind] && (
              <span
                onClick={() =>
                  setExpandedBlocks({
                    ...expandedBlocks,
                    [ind]: true,
                  })
                }
              >
                <FaPencil />
                Edit
              </span>
            )}
          </h3>
        );
      }

      return (
        <h3>
          <FaPlusCircle
            onClick={() =>
              setExpandedBlocks({
                ...expandedBlocks,
                [ind]: true,
              })
            }
          />
          {`${fareTypeLabels[ind]}`}
        </h3>
      );
    },
    [expandedBlocks, fareTypeLabels, fareTypeAmounts],
  );

  const getCustomField = useCallback(
    (field: CustomBookingFieldFragment, type: "person" | "booking", ind?: number) => {
      const errorMessage =
        type === "person"
          ? errors[FIELDS.PERSON]?.[ind] && errors[FIELDS.PERSON][ind][field.id]?.message
          : errors[field.id]?.message;
      const fieldName = type === "person" ? `${FIELDS.PERSON}.${ind}.${field.id}` : field.id.toString();

      return (
        <div>
          {field.fieldType === CustomBookingFieldType.String && (
            <div className="form-group">
              <label className={field.requiredLevel !== VisibilityLevel.None ? "required" : ""}>{field.label}</label>
              <input
                {...register(fieldName)}
                placeholder={field.placeholder}
              />
              {!!errorMessage && <span className="text-red-500 text-xs">{errorMessage as string}</span>}
            </div>
          )}
          {field.fieldType === CustomBookingFieldType.Map && (
            <div key={field.id}>
              <label className={field.requiredLevel !== VisibilityLevel.None ? "required" : ""}>{field.label}</label>
              <label
                htmlFor="custom-booking-field"
                {...register(fieldName)}
                placeholder={field.placeholder}
              >
                <option>{field.placeholder || ""}</option>
                {customBookingMapFieldsConfigs
                  .filter((i) => i.groupId === field.fieldTypeDataForeignId)
                  .map((i) => (
                    <option
                      key={i.resSystemAnswerId}
                      value={i.resSystemAnswerId}
                    >
                      {i.label}
                    </option>
                  ))}
              </label>
              {!!errorMessage && <span className="text-red-500 text-xs">{errorMessage as string}</span>}
            </div>
          )}
        </div>
      );
    },
    [errors, customBookingMapFieldsConfigs],
  );

  return (
    <div className={classes["booking-details-form-wrapper"]}>
      <div
        className={`${classes["form-warning"]} relative p-4 mb-4 text-warningT rounded-md bg-warningBg border border-warninBorder`}
      >
        We need more information to complete your booking.
      </div>
      <label
        htmlFor="booking-details-form"
        className={`${classes["form-title"]} required`}
      >
        <FaUser />
        Add traveller information
      </label>
      <form
        className={classes["booking-details-form"]}
        noValidate
      >
        <div className="max-w-1320px px-3 sm:px-6 mx-auto">
          {formData.personFieldsProps.fields.map((fareType, ind) => (
            <div
              key={fareType.id}
              className={`${classes["person-block"]} ${expandedBlocks[ind] ? classes["selected"] : ""}`}
            >
              {getPersonBlockLabel(ind)}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <input
                    ref={register(`${FIELDS.PERSON}.${ind}.${[FIELDS.PERSON_ID]}`).ref}
                    type="hidden"
                    value={fareType[FIELDS.PERSON_ID]}
                  />
                  <div className="form-group">
                    <label
                      htmlFor="firstName"
                      className="required"
                    >
                      First name
                    </label>
                    <input
                      {...register(`${FIELDS.PERSON}.${ind}.${[FIELDS.FIRST_NAME]}`)}
                      maxLength={45}
                    />
                    {!!(errors[FIELDS.PERSON]?.[ind] && errors[FIELDS.PERSON][ind][FIELDS.FIRST_NAME]) && (
                      <span className="text-red-500 text-xs">
                        {errors[FIELDS.PERSON][ind][FIELDS.FIRST_NAME]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="form-group">
                    <label
                      htmlFor="lastName"
                      className="required"
                    >
                      Last name
                    </label>
                    <input
                      {...register(`${FIELDS.PERSON}.${ind}.${[FIELDS.LAST_NAME]}`)}
                      maxLength={45}
                    />
                    {!!(errors[FIELDS.PERSON]?.[ind] && errors[FIELDS.PERSON][ind][FIELDS.LAST_NAME]) && (
                      <span className="text-red-500 text-xs">
                        {errors[FIELDS.PERSON][ind][FIELDS.LAST_NAME]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`${classes["custom-booking-fields"]} col-span-12`}>
                  {customBookingFieldsPerson?.map((f) => getCustomField(f, "person", ind))}
                </div>
              </div>
              <div>
                <Button
                  type="button"
                  variant="primary"
                  className={classes["submit-button"]}
                  onClick={() => onNextClick(ind)}
                >
                  Next
                </Button>
              </div>
            </div>
          ))}
          {pickupDetailsOptions?.length > 0 && (
            <div>
              <label
                htmlFor="pickup-location"
                className={`${classes["form-title"]} required`}
              >
                <FaLocationDot />
                Pick-up location
              </label>
              <select {...register(FIELDS.PICKUP_LOCATION)}>
                {pickupDetailsOptions.map((i) => (
                  <option
                    key={i}
                    value={i}
                  >
                    {i}
                  </option>
                ))}
              </select>
              {errors[FIELDS.PICKUP_LOCATION] && (
                <span className="text-red-500 text-xs">{errors[FIELDS.PICKUP_LOCATION]?.message}</span>
              )}
            </div>
          )}
          <div>
            <div className={classes["custom-booking-fields"]}>
              {customBookingFieldsBooking?.map((f) => getCustomField(f, "booking"))}
            </div>
            <div>
              <label
                htmlFor="special-requirements"
                className={classes["form-title"]}
              >
                <FaHeart />
                Special requirements (optional)
              </label>
              <div className="form-group">
                <textarea
                  {...register(FIELDS.SPECIAL_REQUIREMENTS)}
                  rows={5}
                  placeholder="Please let us know if you have any special requirements"
                  maxLength={254}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingDetailsForm;
