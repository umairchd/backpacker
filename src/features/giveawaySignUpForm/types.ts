import { getCountryListMap } from "country-flags-dial-code";

export enum FIELDS {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  COUNTRY_CODE = "countryCode",
  CONTACT_NUMBER = "contactNumber",
}

export type CountryInfoItem = {
  country: string;
  code: string;
  dialCode: string;
};

export const COUNTRIES_DATA: Array<CountryInfoItem> = Object.values(
  getCountryListMap()
);

export interface GiveawaySingUpFormDatas {
  [FIELDS.FIRST_NAME]: string;
  [FIELDS.LAST_NAME]: string;
  [FIELDS.EMAIL]: string;
  [FIELDS.COUNTRY_CODE]: string;
  [FIELDS.CONTACT_NUMBER]: string;
}

export interface GiveawaySingUpFormProps {
  iterableKey: string;
}

export interface SignUpIterableUserProps {
  email?: string;
  dataFields: {
    signupSource: string;
    emailVerified: boolean;
  };
}

export interface SignUpIterableEventProps {
  email?: string;
  eventName: string;
  dataFields: {
    firstName: string;
    lastName: string;
    countryCode: string;
    contactNumber: string;
  };
}

export interface IterableDataSignUpGiveaway {
  user: SignUpIterableUserProps;
  event: SignUpIterableEventProps;
}
