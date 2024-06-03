import { DefaultValueForm, FIELDS } from "./types";

export const defaultValueForm: DefaultValueForm = {
  [FIELDS.EMAIL]: "",
  [FIELDS.FIRST_NAME]: "",
  [FIELDS.LAST_NAME]: "",
  [FIELDS.COUNTRY_CODE]: "+61",
  [FIELDS.CONTACT_NUMBER]: "",
  [FIELDS.ENQUIRY_TYPE]: "",
  [FIELDS.PRODUCT_NAME]: "",
  [FIELDS.DESCRIPTION]: "",
  [FIELDS.TOUR_DATE]: undefined,
  [FIELDS.INVOICE_NUMBER]: "",
  [FIELDS.CANCELLED_BY]: "",
  [FIELDS.REFUND_OPTION]: "",
};
