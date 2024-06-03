import { FC } from "react";
import { Disclosure, Transition } from "@headlessui/react";

import { CurrencyDropdownMobileProps } from "./types";
import { FiChevronUp } from "react-icons/fi";

const CurrencyDropdownMobile: FC<CurrencyDropdownMobileProps> = (props) => {
  const { title, contentEl } = props;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between py-10px px-4 relative no-underline bg-white border-b-0.5px border-gray-100 text-xs text-black font-light outline-none">
            {title}
            <FiChevronUp className={`${open ? "transform" : "rotate-180"} h-4 w-4 text-gray-400`} />
          </Disclosure.Button>
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pt-2 pb-4">
              {({ close }) => <ul onClick={(event: React.MouseEvent<HTMLUListElement>) => close()}>{contentEl}</ul>}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default CurrencyDropdownMobile;
