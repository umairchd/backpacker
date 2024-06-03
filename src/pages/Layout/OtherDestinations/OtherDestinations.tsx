import { FC, Fragment, useState } from "react";
import { CustomDropdownProps } from "@@/pages/lib/dropdown";
import { CountryMegaMenuCardV2 } from "@@/pages/components/CountryCard/CountryCard";

import { usePopularCountries } from "./hooks";
import { FiChevronUp } from "react-icons/fi";
import { Dialog, Disclosure, Transition } from "@headlessui/react";

const OtherDestinations: FC<CustomDropdownProps<{ variant?: "mobile" | "" }>> = ({ variant }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMobile = variant === "mobile";
  const { popularCountries, moreCountries } = usePopularCountries();

  const contentEl = (
    <div className={isMobile ? "p-1" : ""}>
      <h4 className="sm:text-xl sm:font-medium mb-4 text-sm font-normal">Popular Countries</h4>
      <ul className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-3`}>
        {popularCountries.map((country, id) => {
          return (
            <CountryMegaMenuCardV2
              {...country}
              key={`popular-country-${id}`}
            />
          );
        })}
      </ul>
      <h4 className="sm:text-xl sm:font-medium my-4 text-sm font-normal">More Countries</h4>
      <div className="flex flex-wrap gap-2 pb-5">
        {moreCountries.map(
          ({
            country: {
              uri: { url },
              name,
            },
            productCount,
            id,
          }) => {
            return (
              <a
                href={url}
                className="sm:text-sm text-xs inline-flex items-center sm:gap-3 gap-1 font-semibold sm:font-normal text-gray-900 rounded-full sm:py-2 py-1 sm:px-5 px-10px bg-primary-transparent transition-all duration-300 group"
                key={`more-countries-${id}`}
              >
                {name}{" "}
                <span className="shrink-0 flex items-center  justify-center w-4 h-4 text-sm text-gray-900 transition-all duration-300 rounded-full">
                  {productCount}
                </span>
              </a>
            );
          },
        )}
      </div>
      <div className="text-end sm:mt-0 mt-4">
        <a
          className="text-primary hover:opacity-80 hover:underline font-xs sm:font-normal sm:text-sm px-3 py-1 text-xs font-light"
          href="/top-destinations"
        >
          See All Top Destinations
        </a>
      </div>
    </div>
  );

  const title = "Other Destinations";

  return isMobile ? (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between py-10px px-4 relative no-underline bg-white border-b-0.5px border-gray-100 text-xs md:text-base text-black font-light md:font-normal outline-none">
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
            <Disclosure.Panel className="px-4 pt-2 pb-4">{contentEl}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  ) : (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="group hover:text-primary focus:outline-none focus-visible:outline-none flex items-center justify-center w-full gap-1 text-sm text-black bg-transparent border-0 rounded-md"
      >
        {title}
        <FiChevronUp className={`text-lg text-gray-400 rotate-180 group-hover:text-primary`} />
      </button>
      <Transition
        appear
        show={open}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-99999"
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
                <Dialog.Panel className="rounded-lg max-w-800px bg-white p-4 text-left">{contentEl}</Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OtherDestinations;
