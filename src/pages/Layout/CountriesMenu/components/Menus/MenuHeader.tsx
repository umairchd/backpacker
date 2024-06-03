import { FC } from "react";
import { MenuHeaderProps } from "../../types";
import { FaBusSimple } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";

const MenuHeader: FC<MenuHeaderProps> = ({ countries, isBusPassVisible }) => {
  return (
    <div className="h-14 flex items-center justify-between px-4 py-2 text-xl font-medium leading-6 text-black bg-white border-b border-gray-100">
      {countries.country}
      <div className="flex items-center gap-4 divide-x">
        {isBusPassVisible && (
          <a
            href={`${countries.url}/all/bus-passes`}
            className="whitespace-nowrap hover:text-primary relative flex items-center w-full gap-1 text-base font-normal text-black no-underline bg-white"
          >
            <FaBusSimple className="text-primary mr-2 text-base font-semibold" />
            Bus Passes in {countries.country}
          </a>
        )}
        <a
          href={countries.url}
          className="whitespace-nowrap hover:text-primary relative flex items-center w-full gap-1 pl-4 text-base font-normal text-black no-underline bg-white"
        >
          All {countries.country} <FiChevronRight />
        </a>
      </div>
    </div>
  );
};

export default MenuHeader;
