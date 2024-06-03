import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { useMemo } from "react";

import {
  BookingDetailsFormData,
  ContactDetailsFormData,
  FIELDS,
} from "../../types";
import {
  CustomBookingFieldFragment,
  CustomBookingFieldMapTypeConfigFragment,
  CustomBookingFieldStringTypeConfigFragment,
} from "../../hooks/useCustomBookingFields.generated";
import { CustomBookingFieldType, VisibilityLevel } from "@@/types.generated";

export const useContactDetailsForm = (
  defaultValues: ContactDetailsFormData
) => {
  const resolver = yupResolver(
    yup.object().shape({
      [FIELDS.EMAIL]: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
      [FIELDS.FIRST_NAME]: yup
        .string()
        .required("First Name is required")
        .matches(/^[a-zA-Z\s]+$/, "First Name is not valid")
        .transform((value) => (value ? value.trim() : value)),
      [FIELDS.LAST_NAME]: yup
        .string()
        .required("Last Name is required")
        .matches(/^[a-zA-Z\s]+$/, "Last Name is not valid")
        .transform((value) => (value ? value.trim() : value)),
      [FIELDS.CONTACT_NUMBER]: yup
        .string()
        .required("Phone Number is required")
        .matches(
          /^(?=.{7,20}$)([0-9]{2,4}[-\s]?[0-9]{3,4}[-\s]?[0-9]{3,9})$/,
          "Invalid phone number"
        )
        .transform((value) => (value ? value.trim() : value)),
      [FIELDS.COUNTRY_CODE]: yup.string(),
    })
  );

  const form = useForm<ContactDetailsFormData>({
    mode: "onChange",
    resolver,
    defaultValues,
  });

  return form;
};

const getCustomFieldsResolvers = (
  fields: CustomBookingFieldFragment[],
  customBookingStringFieldsConfigs,
  customBookingMapFieldsConfigs
) => {
  const resolvers = {};

  fields.forEach((f) => {
    if (f.fieldType === CustomBookingFieldType.String) {
      const fieldConfig = customBookingStringFieldsConfigs.find(
        (i) => i.id === f.fieldTypeDataForeignId
      );
      let resolver = yup.string().max(fieldConfig?.maxLength || 99999);

      if (fieldConfig?.maxLength) {
        resolver = resolver.max(
          fieldConfig.maxLength,
          `Max ${fieldConfig.maxLength} characters`
        );
      }

      if (f.requiredLevel === VisibilityLevel.None) {
        resolver = resolver.notRequired();
      } else {
        resolver = resolver.required(`${f.label} is required`);
      }

      if (fieldConfig?.regex) {
        resolver = resolver.matches(new RegExp(fieldConfig.regex), {
          excludeEmptyString: true,
          message: fieldConfig.shortDescription,
        });
      }

      resolvers[f.id] = resolver;
    } else if (f.fieldType === CustomBookingFieldType.Map) {
      const options = customBookingMapFieldsConfigs.filter(
        (i) => i.groupId === f.fieldTypeDataForeignId
      );
      let resolver = yup.string();

      if (options.length > 0) {
        resolver = resolver.oneOf(options.map((o) => o.resSystemAnswerId));
      }

      if (f.requiredLevel === VisibilityLevel.None) {
        resolver = resolver.notRequired();
      } else {
        resolver = resolver.required(`${f.label} is required`);
      }

      resolvers[f.id] = resolver;
    }
  });

  return resolvers;
};

export const useBookingDetailsForm = (
  defaultValues: BookingDetailsFormData,
  pickUpLocationOptions: string[] | null,
  customBookingFields: CustomBookingFieldFragment[],
  customBookingStringFieldsConfigs?: CustomBookingFieldStringTypeConfigFragment[],
  customBookingMapFieldsConfigs?: CustomBookingFieldMapTypeConfigFragment[]
): UseFormReturn<BookingDetailsFormData> & {
  personFieldsProps: UseFieldArrayReturn<BookingDetailsFormData>;
} => {
  const [customBookingFieldsPerson, customBookingFieldsBooking] =
    useMemo(() => {
      const filteredPersonFields = customBookingFields?.filter(
        (f) => f.publishedLevel === VisibilityLevel.Participant
      );
      const filteredBookingFields = customBookingFields?.filter(
        (f) => f.publishedLevel === VisibilityLevel.Booking
      );

      return [filteredPersonFields, filteredBookingFields];
    }, [customBookingFields]);

  let personFieldsShape = {
    [FIELDS.FIRST_NAME]: yup
      .string()
      .required("First Name is required")
      .matches(/^[a-zA-Z\s]+$/, "First Name is not valid")
      .transform((value) => (value ? value.trim() : value)),
    [FIELDS.LAST_NAME]: yup
      .string()
      .required("Last Name is required")
      .matches(/^[a-zA-Z\s]+$/, "Last Name is not valid")
      .transform((value) => (value ? value.trim() : value)),
    [FIELDS.PERSON_ID]: yup.number().nullable(),
  };

  if (customBookingFieldsPerson && customBookingStringFieldsConfigs) {
    const resolvers = getCustomFieldsResolvers(
      customBookingFieldsPerson,
      customBookingStringFieldsConfigs,
      customBookingMapFieldsConfigs
    );

    personFieldsShape = { ...personFieldsShape, ...resolvers };
  }

  let resolverShape = {
    [FIELDS.PERSON]: yup.array().of(yup.object().shape(personFieldsShape)),
    [FIELDS.SPECIAL_REQUIREMENTS]: yup.string().nullable(),
  };

  if (customBookingFieldsBooking && customBookingStringFieldsConfigs) {
    const resolvers = getCustomFieldsResolvers(
      customBookingFieldsBooking,
      customBookingStringFieldsConfigs,
      customBookingMapFieldsConfigs
    );

    resolverShape = { ...resolverShape, ...resolvers };
  }

  if (pickUpLocationOptions?.length > 0) {
    resolverShape[FIELDS.PICKUP_LOCATION] = yup.string().required("Required");
  }

  const resolver = yupResolver(yup.object().shape(resolverShape));

  const form = useForm<BookingDetailsFormData>({
    mode: "onChange",
    resolver,
    defaultValues:
      pickUpLocationOptions?.length > 0
        ? {
            ...defaultValues,
            [FIELDS.PICKUP_LOCATION]: pickUpLocationOptions[0],
          }
        : defaultValues,
  });

  const personFieldsProps = useFieldArray<BookingDetailsFormData>({
    control: form.control,
    name: FIELDS.PERSON,
  });

  const watchedPersonFields = form.watch(FIELDS.PERSON);
  form.watch(customBookingFieldsBooking?.map((f) => f.id.toString()));

  return {
    ...form,
    personFieldsProps: {
      ...personFieldsProps,
      fields: personFieldsProps.fields.map((f, ind) => ({
        ...f,
        ...(watchedPersonFields ? watchedPersonFields[ind] : {}),
      })),
    },
  };
};
