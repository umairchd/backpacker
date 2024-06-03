import useAutocomplete from "@mui/material/useAutocomplete";
import { FC, createContext, useContext, useState } from "react";
import ItemLink from "../ItemLink";
import Popper from "@mui/material/Popper";
import { usePopupState, bindPopper } from "material-ui-popup-state/hooks";
import Fade from "@mui/material/Fade";
import { anchorRef } from "material-ui-popup-state";

import { useDispatch, useSelector } from "react-redux";
import { getCombinedSearchResults, SearchResultGroup, setSearchText, setIsOpen } from "../../model";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { IoIosSearch } from "react-icons/io";
import { useBreakpoints } from "@@/features/utils";

const AutoCompleteContext = createContext(null);

const OptionItem: FC<{ option: any; index: number }> = function OptionItem({ option }) {
  const { getOptionProps } = useContext(AutoCompleteContext);
  const optionProps = getOptionProps({
    option,
    index: option.index,
  });

  const listProps = {
    ...optionProps,
    key: optionProps.id,
  };

  return (
    <li
      className="list-none m-0"
      key={optionProps.id}
      {...listProps}
    >
      <ItemLink
        href={option.url}
        text={option.name ?? ""}
      />
    </li>
  );
};

const SearchAutocomplete: FC = function SearchAutocomplete() {
  const dispatch = useDispatch();
  const [searchTextShowValue, setSearchTextShowValue] = useState("");
  const options = useSelector(getCombinedSearchResults);
  const { smUp } = useBreakpoints();
  const router = useRouter();

  const popupState = usePopupState({
    variant: "popper",
    popupId: "search-auto-complete",
    disableAutoFocus: true,
  });

  const searchboxEl = anchorRef(popupState);
  const autocompleteState = useAutocomplete<SearchResultGroup & { options?: SearchResultGroup[] }>({
    autoComplete: false,
    autoHighlight: false,
    autoSelect: true,
    includeInputInList: true,
    filterOptions: (x) => x,
    filterSelectedOptions: false,
    options,
    inputValue: searchTextShowValue,
    getOptionLabel: (option) => option["name"],
    isOptionEqualToValue: (a, b) => a.url === b.url,
    groupBy: (option) => option["group"],
    onChange: (_e, newValue, reason) => {
      if (newValue && reason == "selectOption") {
        router.push((newValue as any).url);
      }
    },
    onInputChange: (_, newInputValue) => {
      dispatch(setSearchText(newInputValue));
      setSearchTextShowValue(newInputValue);
    },
  });

  const { getInputProps, getListboxProps, groupedOptions, inputValue } = autocompleteState;

  const placeholder = "Search destinations or tours & activities";

  if (!smUp) {
    return (
      <div
        className="group relative flex items-center"
        onClick={() => dispatch(setIsOpen(true))}
      >
        <IoIosSearch className="left-4 text-black group-hover:text-primary absolute text-xl" />
        <input
          type="text"
          className="shadow-box rounded-xl h-14 placeholder:font-light placeholder:text-black outline-primary w-full px-12 border truncate"
          placeholder={placeholder}
          {...getInputProps()}
        />
      </div>
    );
  }

  return (
    <AutoCompleteContext.Provider value={autocompleteState}>
      <div
        ref={searchboxEl}
        className="relative"
      >
        <div className="group relative flex items-center">
          <IoIosSearch
            style={{ left: 10 }}
            className="left-3 text-black/20 group-hover:text-primary absolute text-xl"
          />
          <input
            className="shadow-box rounded-xl h-14 placeholder:font-light placeholder:text-black outline-primary w-full px-9 border"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            {...getInputProps()}
            id="HomepageSearch"
          />
        </div>
        <Popper
          {...{
            ...bindPopper(popupState),
            open: searchTextShowValue.length > 0 && groupedOptions.length > 0,
          }}
          className="z-10 w-full"
          transition
          disablePortal
          placement="bottom"
          modifiers={[
            {
              name: "flip",
              enabled: true,
              options: {
                altBoundary: false,
                rootBoundary: "document",
                padding: 8,
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              timeout={200}
              style={{ maxHeight: 400 }}
            >
              <ul
                className="shadow-box rounded-xl scrollbar z-10 w-full mt-2 overflow-auto bg-white"
                {...getListboxProps()}
              >
                {groupedOptions.map((optionGroup) => (
                  <li
                    className="list-none m-0"
                    key={nanoid()}
                  >
                    <span className="bg-gray-50 text-black block w-full px-4 py-2 font-bold">{optionGroup.group}</span>
                    <ul>
                      {optionGroup.options?.map((option: any, index: any) => (
                        <OptionItem
                          key={nanoid()}
                          {...{ option, index }}
                        />
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Fade>
          )}
        </Popper>
      </div>
    </AutoCompleteContext.Provider>
  );
};

export default SearchAutocomplete;
