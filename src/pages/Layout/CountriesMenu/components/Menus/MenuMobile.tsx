import { FC } from "react";
import { CountriesMenuMobileProps } from "../../types";
import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronUp } from "react-icons/fi";

import dynamic from "next/dynamic";
import { FaBusSimple } from "react-icons/fa6";

const PlaceLists = dynamic(() => import("../PlaceLists/PlaceLists"), {
  ssr: false,
});

const FeatureLists = dynamic(() => import("../FeatureLists/FeatureLists"), {
  ssr: false,
});

const TopRates = dynamic(() => import("../TopRates/TopRates"), {
  ssr: false,
});

const MenuMobile: FC<CountriesMenuMobileProps> = (props) => {
  const { countries, setRegion, getFeaturePlaces, getTopRatedPlaces, getPlaceLists, isActive, listCountry } =
    props.menuMobile;

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between px-4 py-10px relative no-underline bg-white border-b-0.5px border-gray-100 text-xs text-black font-light outline-none">
              {countries.country}
              <FiChevronUp className={`${open ? "transform" : "rotate-180"}  text-gray-400 text-base`} />
            </Disclosure.Button>
            <Transition
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-300 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="mt-2">
                <>
                  {countries.cities.map((region) => {
                    return (
                      <Disclosure key={region.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              onClick={() => setRegion(region.id)}
                              className="flex w-full justify-between py-4 px-5 relative no-underline bg-white border-b-0.5px border-gray-100 text-xs text-black font-light outline-none"
                            >
                              {region.region}
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
                                <FeatureLists features={getFeaturePlaces} />
                                <PlaceLists lists={getPlaceLists} />
                                <TopRates
                                  rates={getTopRatedPlaces}
                                  isActive={isActive}
                                  listCountry={listCountry}
                                />
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    );
                  })}
                  <a
                    href={`${countries.url}/all/bus-passes`}
                    className="flex w-full items-center gap-1 p-4 relative no-underline hover:text-primary bg-white border-b-0.5px border-gray-100 text-xs font-light text-black"
                  >
                    <FaBusSimple className="text-primary sm:text-base text-xs" />
                    Bus Passes in {countries.country}
                  </a>
                  <a
                    href={countries.url}
                    data-rr-ui-dropdown-item=""
                    className="block p-4 relative no-underline hover:text-primary bg-white border-b-0.5px border-gray-100 text-xs font-light text-black"
                  >
                    All {countries.country} &gt;
                  </a>
                </>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MenuMobile;
