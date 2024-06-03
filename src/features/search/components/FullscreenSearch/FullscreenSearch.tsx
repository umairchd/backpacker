"use client";

import ItemLink from "../ItemLink";
import useAutocomplete from "@mui/material/useAutocomplete";

import { useDispatch, useSelector } from "react-redux";
import { setSearchText, getCombinedSearchResults, SearchResultGroup, setIsOpen, getIsOpen } from "../../model";
import React, { createContext, useCallback, useContext, Fragment, useState } from "react";
import { useEffectOnce } from "react-use";
import { nanoid } from "nanoid";
import { IoIosSearch } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";

const AutoCompleteContext = createContext(null);

const OptionItem: React.FC<{ option: any; index: number }> = function OptionItem({ option }) {
  const { getOptionProps } = useContext(AutoCompleteContext);
  const optionProps = getOptionProps({
    option,
    index: option.index,
  });

  return (
    <li
      key={optionProps.id}
      {...{ ...optionProps, key: optionProps.id }}
      className="list-none m-0"
    >
      <ItemLink
        href={option.url}
        text={option.name}
      />
    </li>
  );
};

const FullScreenSearchContent = ({ router }: { router: any }) => {
  const dispatch = useDispatch();
  const [searchTextShowValue, setSearchTextShowValue] = useState("");
  const options = useSelector(getCombinedSearchResults);
  const isOpen = useSelector(getIsOpen);

  const autocompleteState = useAutocomplete<SearchResultGroup & { options?: SearchResultGroup[] }>({
    open: isOpen,
    autoComplete: true,
    autoHighlight: true,
    autoSelect: true,
    isOptionEqualToValue: (a, b) => a?.url === b?.url,
    filterOptions: (x) => x, // disable built in filtering
    disableCloseOnSelect: true,
    filterSelectedOptions: false,
    includeInputInList: true,
    clearOnEscape: true,
    clearOnBlur: false,
    options,
    inputValue: searchTextShowValue,
    getOptionLabel: (option) => option["name"],
    groupBy: (option) => option["group"],
    onClose: (_event, reason) => {
      if (reason === "escape") {
        dispatch(setIsOpen(false));
      }
    },
    onChange: (_e, newValue, reason) => {
      if (newValue && reason == "selectOption") {
        router.push((newValue as any).url);
        dispatch(setIsOpen(false));
      }
    },
    onInputChange: (_, newInputValue, reason) => {
      if (reason !== "reset") {
        dispatch(setSearchText(newInputValue));
        setSearchTextShowValue(newInputValue);
      }
    },
  });

  const { getRootProps, getInputProps, getListboxProps, groupedOptions, inputValue } = autocompleteState;

  useEffectOnce(() => {
    dispatch(setSearchText(""));
    (document.querySelectorAll(`input.morphsearch-input`)?.[0] as HTMLInputElement)?.focus();

    return function () {
      dispatch(setSearchText(""));
    };
  });

  return (
    <AutoCompleteContext.Provider value={autocompleteState}>
      <div>
        <div
          id="search-form"
          className="w-full"
        >
          <div
            {...getRootProps()}
            className="group relative flex items-center p-1"
          >
            <IoIosSearch className="shrink-0 text-black/40 group-hover:text-primary left-3 absolute text-2xl" />
            <input
              className="morphsearch-input shadow-box rounded-xl h-14 placeholder:font-light placeholder:!text-gray-400 outline-primary group-hover:outline-primary w-full px-12 border"
              type="search"
              placeholder="Search ..."
              value={inputValue}
              id="NavSearch"
              {...getInputProps()}
            />
          </div>
        </div>
        <div className="h-96 scrollbar px-2 mt-2 overflow-auto">
          <ul
            className="shadow-box rounded-xl scrollbar z-10 w-full mt-2 overflow-auto bg-white"
            {...getListboxProps()}
          >
            {groupedOptions.map((optionGroup) => (
              <li
                className="list-none m-0"
                key={nanoid()}
              >
                <h4 className="bg-gray-50 text-black/30 block w-full px-4 py-2 font-normal">{optionGroup.group}</h4>
                <ul>
                  {optionGroup.options?.map((option, index) => (
                    <OptionItem
                      key={nanoid()}
                      {...{ option, index }}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AutoCompleteContext.Provider>
  );
};

const FullScreenSearch = ({ router }: { router: any }) => {
  const isOpen = useSelector(getIsOpen);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(setIsOpen(false)), [dispatch]);

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-black/25 fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="rounded-2xl w-full max-w-5xl p-0 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <button
                  onClick={handleClose}
                  className="hover:opacity-75 flex items-center justify-center w-8 h-8 m-4 ml-auto bg-gray-200 rounded-full cursor-pointer"
                  tabIndex={0}
                >
                  <FiX />
                </button>

                <div className="px-6 mt-2">{isOpen ? <FullScreenSearchContent router={router} /> : null}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FullScreenSearch;
