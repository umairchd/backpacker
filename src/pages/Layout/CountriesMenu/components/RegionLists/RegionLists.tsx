import { FC } from "react";
import { RegionListsProps } from "../../types";

const RegionLists: FC<RegionListsProps> = ({ country, setRegion, isActive }) => {
  return (
    <ul>
      {country.cities.map((region) => {
        return (
          <li
            key={region.id}
            onClick={() => setRegion(region.id)}
            className={`item-none m-0 px-4 py-3 text-sm font-normal text-black capitalize cursor-pointer hover:text-white hover:bg-primary hover:border-primary border-b border-gray-200 ${
              isActive === region.id ? "bg-primary text-white" : ""
            }`}
          >
            {region.region}
          </li>
        );
      })}
    </ul>
  );
};

export default RegionLists;
