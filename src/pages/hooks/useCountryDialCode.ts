"use client";

import { useMemo } from "react";
import { useClientContext } from "@@/app/lib/ClientInfoProvider";
import { getCountryListMap } from "country-flags-dial-code";
import { CountryInfoItem, FIELDS } from "@@/app/components/ContactUs/types";
import { defaultValueForm } from "../utils/defaultValueForm";

export const useCountryDialCode = (defaultCountryCode: string = defaultValueForm[FIELDS.COUNTRY_CODE]) => {
  const { clientInfo } = useClientContext();
  const countryCode: CountryInfoItem[] = Object.values(getCountryListMap());
  const isoCountryCode = clientInfo?.isoCountryCode;

  const countryDialCode = useMemo(() => {
    if (isoCountryCode) {
      const country = countryCode.find((country) => country.code === isoCountryCode);
      return country?.dialCode;
    }
    return defaultCountryCode;
  }, [countryCode, defaultCountryCode, isoCountryCode]);

  return {
    countryDialCode,
    isoCountryCode,
  };
};
