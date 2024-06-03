import { FC, Fragment } from "react";
import BusPassesMobile from "./BusPassesMobile";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { FiChevronUp } from "react-icons/fi";
import { FaBus } from "react-icons/fa";

interface BusPassesProps {
  variant?: "mobile" | "";
}

const BusPasses: FC<BusPassesProps> = ({ variant = "" }) => {
  const contentEl = (
    <div>
      <Menu.Items className="w-72 shadow-box ring-1 ring-black/5 absolute left-0 py-2 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-lg">
        <div className="border-zinc-100 border-b">
          <Menu.Item>
            <Link
              href="/australia/all/bus-passes"
              className="flex-start hover:bg-gray-100 flex items-center gap-3 px-3 py-3"
            >
              <FaBus className="text-primary" />
              <p className="text-sm font-light">Bus Passes In Australia</p>
            </Link>
          </Menu.Item>
        </div>
        <div className="border-hidden">
          <Menu.Item>
            <Link
              href="/new-zealand/all/bus-passes"
              className="flex-start hover:bg-gray-100 flex items-center gap-3 px-3 py-3"
            >
              <FaBus className="text-primary" />

              <p className="text-sm font-light">Bus Passes In New Zealand</p>
            </Link>
          </Menu.Item>
        </div>
      </Menu.Items>
    </div>
  );

  return variant === "mobile" ? (
    <BusPassesMobile contentEl={contentEl} />
  ) : (
    <Menu>
      <Menu.Button
        as="button"
        aria-haspopup="true"
        className="group hover:text-primary md:font-normal focus:outline-none focus-visible:outline-none flex items-center justify-center w-full gap-1 text-sm font-light text-black bg-transparent border-0 rounded-md"
      >
        Bus Passes
        <FiChevronUp className={`text-lg text-gray-400 rotate-180 group-hover:text-primary`} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-50"
      >
        {contentEl}
      </Transition>
    </Menu>
  );
};

export default BusPasses;
