import React, { FC, Fragment } from "react";
import { SelectOption, SelectSingleProps } from "../model/types";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa6";

const SelectSingle: FC<SelectSingleProps> = ({ options, value, onChange, defaultValue, label = "" }) => {
  const handleSelect = (e: React.MouseEvent, val: SelectOption) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(val);
  };

  return (
    <Menu
      as="div"
      className="focus-visible:outline-none list_active_state relative block text-left"
    >
      <Menu.Button className="group outline-primary outline-2 ring-0 max-w-250px focus-visible:ring-primary relative w-full flex items-center justify-between gap-6px cursor-pointer rounded-lg bg-white px-4 text-left  shadow-box h-10 text-sm hover:text-primary">
        <div>
          <span>{label}:&nbsp;</span>
          <span className="font-semibold">{value?.label ?? defaultValue?.label}</span>
        </div>
        <FaChevronUp className={`h-3 w-3 rotate-180 group-hover:text-primary`} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 shadow-box focus:outline-none ring-primary ring-2 w-52 absolute right-0 mt-2 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-lg outline-none">
          <Menu.Item>
            <ul>
              {options.length > 0 &&
                options.map((x: SelectOption, key: React.Key) => (
                  <li
                    key={key}
                    className="hover:bg-primary hover:text-white md:text-base md:font-normal md:px-5 px-2 py-2 text-sm font-light text-black list-none m-0"
                    id={x.value}
                  >
                    <button
                      className="w-full h-full text-right"
                      onClick={(e) => handleSelect(e, x)}
                    >
                      {x.label}
                    </button>
                  </li>
                ))}
            </ul>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SelectSingle;
