import { getCountryListMap } from "country-flags-dial-code";
import { IconType } from "react-icons/lib";

export type Requester = {
  name: string;
  email: string;
};

export type Comment = {
  body: string;
};

export type CustomField = {
  id: number;
  value: string;
};

export type Request = {
  requester: Requester;
  subject: string;
  comment: Comment;
  custom_fields: Array<CustomField>;
};

export type CreateRequestBody = {
  request: Request;
};

declare global {
  interface Window {
    submitContactUsForm?: (body: CreateRequestBody) => Promise<any>;
  }
}

export type SocialLink = {
  href: string;
  icon: IconType;
};

export enum FIELDS {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  COUNTRY_CODE = "countryCode",
  CONTACT_NUMBER = "contactNumber",
  ENQUIRY_TYPE = "enquiryType",
  PRODUCT_NAME = "productName",
  DESCRIPTION = "description",
  TOUR_DATE = "tourDate",
  INVOICE_NUMBER = "invoiceNumber",
  CANCELLED_BY = "cancelledBy",
  REFUND_OPTION = "refundOption",
}

export interface ContactUsFormData {
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.EMAIL]: string;
  [FIELDS.COUNTRY_CODE]: string;
  [FIELDS.CONTACT_NUMBER]: string;
  [FIELDS.ENQUIRY_TYPE]: string;
  [FIELDS.PRODUCT_NAME]: string;
  [FIELDS.DESCRIPTION]: string;
  [FIELDS.TOUR_DATE]: Date;
  [FIELDS.INVOICE_NUMBER]: string;
  [FIELDS.CANCELLED_BY]: string;
  [FIELDS.REFUND_OPTION]: string;
}

export type CountryInfoItem = {
  country: string;
  code: string;
  dialCode: string;
};

export const COUNTRIES_DATA: Array<CountryInfoItem> = Object.values(getCountryListMap());

type EnquityTypeItem = {
  label: string;
  value: string;
};

export const ENQUIRY_TYPES: EnquityTypeItem[] = [
  { label: "Booking Amendment", value: "enquiry_booking_amendment" },
  { label: "Refund or Cancellation", value: "enquiry_refund_or_cancellation" },
  { label: "Cashback", value: "enquiry_cashback" },
  { label: "Coupon Enquiry", value: "enquiry_coupon_" },
  { label: "Feedback", value: "enquiry_feedback" },
  { label: "New Booking", value: "enquiry_new_booking" },
  { label: "Pick up information", value: "enquiry_pick_up_information_" },
  { label: "Website Issue", value: "enquiry_website_issue" },
  { label: "Suggest A Business", value: "enquiry_suggest_a_business" },
  { label: "Other", value: "enquiry_other" },
];

export const CANCELLED_BY_OPTIONS: EnquityTypeItem[] = [
  { label: "Tour Operator", value: "tour_operator" },
  { label: "Myself", value: "myself" },
];

export const REFUND_OPTIONS: EnquityTypeItem[] = [
  {
    label: "I want a 110% refund in the form of store credit",
    value: "credit",
  },
  { label: "I want to apply for a cash refund", value: "cash" },
];
