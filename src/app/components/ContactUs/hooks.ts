import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useController, useWatch } from "react-hook-form";

import { ContactUsFormData, FIELDS } from "./types";

export const useContactUsForm = (defaultValues: ContactUsFormData) => {
  const requiredIfValue = (currentValue, schema, targetValues) => {
    return targetValues.includes(currentValue) ? schema.required("Required") : schema;
  };

  const resolver = yupResolver(
    yup.object().shape({
      [FIELDS.EMAIL]: yup.string().email("Invalid email").required("Required"),
      [FIELDS.FIRST_NAME]: yup.string().required("Required"),
      [FIELDS.LAST_NAME]: yup.string().required("Required"),
      [FIELDS.CONTACT_NUMBER]: yup.string().required("Required"),
      [FIELDS.ENQUIRY_TYPE]: yup.string().required("Required"),
      [FIELDS.TOUR_DATE]: yup.date().when(FIELDS.ENQUIRY_TYPE, (value, schema) => {
        return value === "enquiry_refund_or_cancellation" ? schema.required("Required") : schema.nullable();
      }),
      [FIELDS.INVOICE_NUMBER]: yup
        .string()
        .when(FIELDS.ENQUIRY_TYPE, (value, schema) =>
          requiredIfValue(value, schema, ["enquiry_booking_amendment", "enquiry_refund_or_cancellation"]),
        ),
      [FIELDS.CANCELLED_BY]: yup
        .string()
        .when(FIELDS.ENQUIRY_TYPE, (value, schema) =>
          requiredIfValue(value, schema, ["enquiry_refund_or_cancellation"]),
        ),
      [FIELDS.REFUND_OPTION]: yup
        .string()
        .when(FIELDS.ENQUIRY_TYPE, (value, schema) =>
          requiredIfValue(value, schema, ["enquiry_refund_or_cancellation"]),
        ),
      [FIELDS.DESCRIPTION]: yup
        .string()
        .when(FIELDS.ENQUIRY_TYPE, (value, schema) =>
          requiredIfValue(value, schema, ["enquiry_refund_or_cancellation"]),
        ),
    }),
  );

  const form = useForm({
    resolver,
    defaultValues,
  });

  const enquiryTypeValue = useWatch({
    name: FIELDS.ENQUIRY_TYPE,
    control: form.control,
    defaultValue: defaultValues[FIELDS.ENQUIRY_TYPE],
  });

  const { field: tourDateField } = useController({
    name: FIELDS.TOUR_DATE,
    control: form.control,
    defaultValue: defaultValues[FIELDS.TOUR_DATE],
  });

  return {
    ...form,
    tourDateField,
    enquiryTypeValue,
  };
};
