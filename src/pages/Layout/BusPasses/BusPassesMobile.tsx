import { FC } from "react";

import { FaBusSimple } from "react-icons/fa6";
import { FiChevronUp } from "react-icons/fi";
import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";

interface BusPassesMobileProps {
  contentEl?: JSX.Element;
}

const BusPassesMobile: FC<BusPassesMobileProps> = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between py-10px px-4 relative no-underline bg-white border-b-0.5px border-gray-100 text-sm md:text-base text-black font-light md:font-normal outline-none">
            <span className="flex gap-6px items-center font-light text-xs">
              <FaBusSimple className="text-primary text-xs" />
              Bus Passes
            </span>
            <FiChevronUp className={`${open ? "transform" : "rotate-180"} text-lg text-gray-400`} />
          </Disclosure.Button>
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="p-2">
              <Link
                href="/australia/all/bus-passes"
                className="flex-start hover:bg-gray-200 flex items-center h-8 my-2"
              >
                <FaBusSimple className="text-primary w-3 h-3 mx-2" />
                <div className="text-xs font-light">Bus Passes In Australia</div>
              </Link>
              <Link
                href="/new-zealand/all/bus-passes"
                className="flex-start hover:bg-gray-200 flex items-center h-8 my-2"
              >
                <FaBusSimple className="text-primary w-3 h-3 mx-2" />
                <div className="text-xs font-light">Bus Passes In New Zealand</div>
              </Link>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default BusPassesMobile;
