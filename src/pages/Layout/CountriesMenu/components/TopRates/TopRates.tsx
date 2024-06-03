import { FC } from "react";

import { Countries } from "../../hooks/useCountriesList";
import { TopRatesProps } from "../../types";
import { FaFireFlameCurved } from "react-icons/fa6";
import Link from "next/link";

const TopRates: FC<TopRatesProps> = ({ rates, isActive, listCountry }) => {
  const setTopRatesText = (country: Countries, isActive: number) => {
    if (country === "Australia") {
      switch (isActive) {
        case 1:
          return "18,000+ travellers are searching";
        case 2:
          return "20,000+ travellers are searching";
        case 3:
          return "40,000+ travellers are searching";
        case 4:
          return "9,000+ travellers are searching";
        case 5:
          return "12,000+ travellers are searching";
        case 6:
          return "13,000+ travellers are searching";
        case 7:
          return "9,000+ travellers are searching";
        default:
          return "800+ travellers are searching";
      }
    }

    if (country === "New Zealand") {
      if (isActive === 1) {
        return "15,000+ travellers are searching";
      }
      if (isActive === 2) {
        return "18,500+ travellers are searching";
      }
      return "800+ travellers are searching";
    }
  };

  const topRates = setTopRatesText(listCountry, isActive);

  return (
    <div className="">
      <div className="flex items-center gap-1 mb-2">
        <FaFireFlameCurved className="text-primary text-base" />
        <span className="sm:text-sm sm:font-medium text-xs font-normal">{topRates}</span>
      </div>
      <div className="sm:gap-2 sm:py-2 flex flex-wrap gap-1 py-1">
        {rates.map((rate) => {
          return (
            <Link
              key={rate.uniqueName}
              href={rate.uri?.url}
              className="rounded-full bg-primary-transparent w-auto sm:px-4 px-10px sm:py-6px py-1 text-10px sm:text-sm sm:font-normal font-light no-underline capitalize"
            >
              {rate?.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopRates;
