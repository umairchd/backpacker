import { GiveawaySingUpFormDatas, FIELDS } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const useGiveawayForm = (defaultValues: GiveawaySingUpFormDatas) => {
  const resolver = yupResolver(
    yup.object().shape({
      [FIELDS.EMAIL]: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
      [FIELDS.FIRST_NAME]: yup.string().required("First Name is required"),
      [FIELDS.LAST_NAME]: yup.string().required("Last Name is required"),
      [FIELDS.CONTACT_NUMBER]: yup
        .number()
        .typeError("A valid Phone Number is required")
        .required("Phone Number is required"),
    })
  );

  const form = useForm({
    resolver,
    defaultValues,
  });

  return {
    ...form,
  };
};
