import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { EnquireNowFormData, FIELDS } from "./types";

export const useEnquireNowForm = (defaultValues: EnquireNowFormData) => {
  const resolver = yupResolver(
    yup.object().shape({
      [FIELDS.EMAIL]: yup.string().email("Invalid email").required("Required"),
      [FIELDS.FIRST_NAME]: yup.string().required("Required"),
      [FIELDS.LAST_NAME]: yup.string().required("Required"),
      [FIELDS.CONTACT_NUMBER]: yup.string().required("Required"),
    })
  );

  return useForm({
    resolver,
    defaultValues,
  });
};
