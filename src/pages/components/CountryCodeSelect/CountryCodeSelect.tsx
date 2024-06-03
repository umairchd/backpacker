import { FC } from "react";

import countryCodeEmoji from "country-code-emoji";
import { COUNTRIES_DATA } from "@@/app/components/ContactUs/types";

interface CountryCodeSelectProps {
  label?: string;
  onBlur?: (e: any) => void;
  isoCode: string;
  dialCode: string;
  fieldsDialCode: string;
  register: any;
  defaultFields: string;
  required?: boolean;
  labelClass?: string;
}

const CountryCodeSelect: FC<CountryCodeSelectProps> = ({
  label,
  onBlur,
  isoCode,
  dialCode,
  fieldsDialCode,
  register,
  defaultFields,
  required = false,
  labelClass = "",
}) => {
  return (
    <div className="form-group">
      <label
        {...((required && { className: "required" }) as any)}
        className={labelClass}
      >
        {label}
      </label>
      <select
        {...register(fieldsDialCode)}
        onBlur={onBlur}
        className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-theme !outline-primary placeholder:font-light"
      >
        {COUNTRIES_DATA.map((country) => {
          const selected =
            (country.code === isoCode && country.dialCode === dialCode) ||
            (!isoCode && !dialCode && country.dialCode === defaultFields);

          const optionValue = selected || country.dialCode === defaultFields ? country.dialCode : "";

          return (
            <option
              key={country.code}
              value={optionValue}
            >
              {countryCodeEmoji(country.code)} {country.dialCode}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CountryCodeSelect;
