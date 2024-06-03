import { useForm, useWatch } from "react-hook-form";

import { FIELDS, defaultFormValues } from "./model/types";

export const useFilterForm = () => {
  const form = useForm({
    defaultValues: defaultFormValues,
  });
  const fieldsArr = [
    FIELDS.ORDER,
    FIELDS.DESTINATION,
    FIELDS.CATEGORIES,
    FIELDS.PAGE,
  ];

  useWatch({
    name: fieldsArr,
    control: form.control,
    defaultValue: defaultFormValues,
  });

  return form;
};
