import { FIELDS, sortByOptions } from "./model/types";
const getStringArrayFromFieldValue = (
  value: {
    map: (arg0: (v: any) => number) => any;
    split: (arg0: string) => string[];
  },
  separator = " "
) => {
  return Array.isArray(value)
    ? value.map((v) => v)
    : value.split(separator).map((v: string) => v);
};

export const getConvertedFieldValues = (field: string, value: any) => {
  switch (field) {
    case FIELDS.ORDER: {
      const currentOption =
        typeof value === "string"
          ? sortByOptions.find((o) => o.value === value.toUpperCase())
          : value;
      return [currentOption, currentOption?.value];
    }
    case FIELDS.DESTINATION: {
      return [value, value];
    }
    case FIELDS.CATEGORIES: {
      const convertedValue: string[] = getStringArrayFromFieldValue(value);
      return [convertedValue, convertedValue];
    }
    case FIELDS.PAGE: {
      const valueFromQuery = Array.isArray(value) ? value[0] : value;

      if (valueFromQuery === "all") {
        return [0, value];
      }

      const convertedPageNumber = Array.isArray(value)
        ? parseInt(value[0], 10)
        : parseInt(value, 10);

      return [convertedPageNumber, value];
    }
    default:
      return;
  }
};

export const updateQueryParams = (field, value) => {
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);

  if (value?.toString()) {
    queryParams.set(
      field,
      Array.isArray(value) ? value.join(" ") : value.toString()
    );
  } else {
    queryParams.delete(field);
  }

  url.search = queryParams.toString();

  window.history.replaceState(null, null, url);
};
