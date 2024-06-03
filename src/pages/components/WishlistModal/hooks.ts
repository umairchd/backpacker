import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useController } from "react-hook-form";

import { WishlistFormData, FIELDS } from "./types";

export const useWishlistForm = (defaultValues: WishlistFormData) => {
  const resolver = yupResolver(
    yup.object().shape({
      [FIELDS.EMAIL]: yup.string().email("Invalid email").required("Required"),
      [FIELDS.DATE]: yup.date().required("Required"),
    })
  );

  const form = useForm({
    resolver,
    defaultValues,
  });

  const { field: dateField } = useController({
    name: FIELDS.DATE,
    control: form.control,
    defaultValue: defaultValues[FIELDS.DATE],
  });

  return {
    ...form,
    dateField,
  };
};
