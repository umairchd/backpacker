import { gql } from "graphql-tag";
import { useContext, useMemo } from "react";

import {
  CustomBookingFieldMapTypeConfigFragment,
  CustomBookingFieldStringTypeConfigFragment,
  CustomBookingFieldType,
  useCustomBookingFieldsQuery,
  useCustomBookingFieldStringTypeConfigsQuery,
  useCustomBookingFieldMapTypeConfigsQuery,
  CustomBookingFieldFragment,
} from "./useCustomBookingFields.generated";
import { VisibilityLevel } from "@@/types.generated";
import { BookingPageContext } from "../[slug]/components/BookingPage";

gql`
  fragment CustomBookingField on CustomBookingFieldsPayload {
    fieldType
    fieldTypeDataForeignId
    id
    placeholder
    productId
    label
    publishedLevel
    requiredLevel
  }

  fragment CustomBookingFieldStringTypeConfig on StringBookingFieldTypeConfigurationPayload {
    id
    maxLength
    regex
    shortDescription
  }

  fragment CustomBookingFieldMapTypeConfig on MapBookingFieldTypeConfigurationPayload {
    groupId
    id
    label
    resSystemAnswerId
  }

  query CustomBookingFields($filter: CustomBookingFieldsFilter!) {
    customBookingFields(filter: $filter) {
      ...CustomBookingField
    }
  }

  query CustomBookingFieldStringTypeConfigs(
    $filter: CustomBookingFieldsFilter!
  ) {
    customBookingFieldsStringTypeConfiguration(filter: $filter) {
      ...CustomBookingFieldStringTypeConfig
    }
  }

  query CustomBookingFieldMapTypeConfigs($filter: CustomBookingFieldsFilter!) {
    customBookingFieldsMapTypeConfiguration(filter: $filter) {
      ...CustomBookingFieldMapTypeConfig
    }
  }
`;

export default (): {
  customBookingFields: CustomBookingFieldFragment[];
  customBookingFieldsConfigs: {
    customBookingStringFieldsConfigs?: CustomBookingFieldStringTypeConfigFragment[];
    customBookingMapFieldsConfigs?: CustomBookingFieldMapTypeConfigFragment[];
  };
  customBookingFieldsPerson: CustomBookingFieldFragment[];
  customBookingFieldsBooking: CustomBookingFieldFragment[];
} => {
  const { product } = useContext(BookingPageContext);
  const productId = product.productId;

  const { data: customBookingFields } = useCustomBookingFieldsQuery({
    variables: {
      filter: {
        productId,
      },
    },
    skip: !productId,
  });

  const { data: customBookingStringFieldsConfigs } =
    useCustomBookingFieldStringTypeConfigsQuery({
      variables: {
        filter: {
          productId,
        },
      },
      skip:
        !productId ||
        !customBookingFields?.customBookingFields?.filter(
          (f) => f.fieldType === CustomBookingFieldType.String
        ).length,
    });

  const { data: customBookingMapFieldsConfigs } =
    useCustomBookingFieldMapTypeConfigsQuery({
      variables: {
        filter: {
          productId,
        },
      },
      skip:
        !productId ||
        !customBookingFields?.customBookingFields?.filter(
          (f) => f.fieldType === CustomBookingFieldType.Map
        ).length,
    });

  const customBookingFieldsConfigs: {
    customBookingStringFieldsConfigs?: CustomBookingFieldStringTypeConfigFragment[];
    customBookingMapFieldsConfigs?: CustomBookingFieldMapTypeConfigFragment[];
  } = useMemo(() => {
    return {
      customBookingStringFieldsConfigs:
        customBookingStringFieldsConfigs?.customBookingFieldsStringTypeConfiguration ||
        [],
      customBookingMapFieldsConfigs:
        customBookingMapFieldsConfigs?.customBookingFieldsMapTypeConfiguration ||
        [],
    };
  }, [customBookingStringFieldsConfigs, customBookingMapFieldsConfigs]);

  const customBookingFieldsPerson = useMemo(() => {
    const filteredFields = customBookingFields?.customBookingFields?.filter(
      (f) => f.publishedLevel === VisibilityLevel.Participant
    );

    if (filteredFields?.length > 0) {
      return filteredFields;
    }

    return null;
  }, [customBookingFields]);

  const customBookingFieldsBooking = useMemo(() => {
    const filteredFields = customBookingFields?.customBookingFields?.filter(
      (f) => f.publishedLevel === VisibilityLevel.Booking
    );

    if (filteredFields?.length > 0) {
      return filteredFields;
    }

    return null;
  }, [customBookingFields]);

  return {
    customBookingFields: customBookingFields?.customBookingFields || [],
    customBookingFieldsConfigs,
    customBookingFieldsPerson,
    customBookingFieldsBooking,
  };
};
