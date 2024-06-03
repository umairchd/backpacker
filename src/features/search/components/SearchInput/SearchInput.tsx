import { FC } from "react";
import { useSelector } from "react-redux";
import { getSearchText } from "../../model";

import { IoIosSearch } from "react-icons/io";

interface SearchInputProps {
  isMobile?: boolean;
  onClick: () => void;
  isObscured?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ isMobile = false, onClick, isObscured }) => {
  const searchText = useSelector(getSearchText);

  return (
    <div
      className={isObscured ? "" : "transition-all duration-200 ease-in-out"}
      onClick={onClick}
      style={{
        display: isObscured ? "none" : "flex",
        padding: isObscured && 0,
      }}
    >
      <div
        className={
          !isMobile
            ? "rounded-md shadow-input bg-white p-4 mr-2 grid grid-cols-auto-1fr items-center w-full transition-all duration-200 ease-in-out h-50px"
            : ""
        }
      >
        {!isMobile && (
          <div className="flex items-center justify-center -mt-2px">
            <IoIosSearch className="text-search text-xl mr-1 mb-1" />

            <input
              className="placeholder:font-normal w-full text-base bg-transparent border-0 pointer-events-none"
              type="text"
              placeholder="Where to..."
              readOnly
              value={searchText}
            />
          </div>
        )}
      </div>
      {!isMobile && (
        <button
          className="shrink-0 rounded-md text-base pointer-events-none h-50px w-90px p-2 font-semibold transition-all duration-200 ease-in-out bg-primary text-white"
          type="button"
        >
          Search
        </button>
      )}
      {isMobile && (
        <button
          className="group lg:shadow-btn sm:h-10 h-8 flex items-center justify-center gap-1 p-2 no-underline border-gray-100 rounded-md shadow-box"
          type="button"
        >
          <IoIosSearch className="text-primary text-lg" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
