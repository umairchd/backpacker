import { getCountryListMap } from "country-flags-dial-code";

export type EnquireNowIterableBody = {
  user: {
    email: string;
    dataFields: {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      multiDay: boolean;
      emailVerified: boolean;
    };
  };
  event: {
    email: string;
    eventName: "multiDayEnquiry";
    dataFields: {
      productName: string;
    };
  };
};

declare global {
  interface Window {
    submitEnquireNowFom?: (body: EnquireNowIterableBody) => Promise<any>;
  }
}

export enum FIELDS {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  COUNTRY_CODE = "countryCode",
  CONTACT_NUMBER = "contactNumber",
  ENQUIRY_TYPE = "enquiryType",
  PRODUCT_NAME = "productName",
  PRODUCT_URL = "productUrl",
}

export interface EnquireNowFormData {
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.EMAIL]: string;
  [FIELDS.COUNTRY_CODE]: string;
  [FIELDS.CONTACT_NUMBER]: string;
  [FIELDS.PRODUCT_NAME]: string;
  [FIELDS.PRODUCT_URL]: string;
}

export const defaultValues: EnquireNowFormData = {
  [FIELDS.EMAIL]: "",
  [FIELDS.FIRST_NAME]: "",
  [FIELDS.LAST_NAME]: "",
  [FIELDS.COUNTRY_CODE]: "+61",
  [FIELDS.CONTACT_NUMBER]: "",
  [FIELDS.PRODUCT_NAME]: "",
  [FIELDS.PRODUCT_URL]: "",
};

export type CountryInfoItem = {
  country: string;
  code: string;
  dialCode: string;
};

export const COUNTRIES_DATA: Array<CountryInfoItem> = Object.values(getCountryListMap());

export interface EnquireNowModalProps {
  productUrl?: string;
  productName: string;
  isLoading?: boolean;
  isMobile?: boolean;
}
