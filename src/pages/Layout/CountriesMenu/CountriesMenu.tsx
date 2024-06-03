"use client";

import React, { FC, Fragment } from "react";
import { useCountriesList } from "./hooks/useCountriesList";
import { CountriesMenuProps } from "./types";

import MenuHeader from "./components/Menus/MenuHeader";
import MenuBody from "./components/Menus/MenuBody";
import MenuMobile from "./components/Menus/MenuMobile";

import { Menu, Transition } from "@headlessui/react";
import { FiChevronUp } from "react-icons/fi";

const CountriesMenu: FC<CountriesMenuProps> = ({ listCountry = "Australia", variant, className, isBusPassVisible }) => {
  const { isActive, countriesListMenu, getFeaturePlaces, getTopRatedPlaces, getPlaceLists, setRegion } =
    useCountriesList({
      listCountry,
    });

  const isMobile = variant === "mobile";

  return (
    <div className={className}>
      {countriesListMenu.map((countries) => {
        return (
          countries.country === listCountry &&
          (isMobile ? (
            <MenuMobile
              key={countries.id}
              menuMobile={{
                countries,
                setRegion,
                isActive,
                listCountry,
                getFeaturePlaces,
                getPlaceLists,
                getTopRatedPlaces,
              }}
            />
          ) : (
            <div key={countries.id}>
              <Menu
                as="div"
                className="focus-visible:outline-none relative block text-left"
              >
                <Menu.Button className="group hover:text-primary focus:outline-none focus-visible:outline-none flex items-center justify-center w-full gap-1 text-sm text-black bg-transparent border-0 rounded-md">
                  {countries.country}
                  <FiChevronUp className={`text-lg text-gray-400 rotate-180 group-hover:text-primary`} />
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
                  <Menu.Items className="focus:outline-none absolute left-0 w-1100px mt-4 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                    <Menu.Item>
                      <>
                        <MenuHeader
                          countries={countries}
                          isBusPassVisible={isBusPassVisible}
                        />
                        <MenuBody
                          menuBody={{
                            countries,
                            setRegion,
                            isActive,
                            listCountry,
                            getFeaturePlaces,
                            getPlaceLists,
                            getTopRatedPlaces,
                          }}
                        />
                      </>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ))
        );
      })}
    </div>
  );
};

export default CountriesMenu;
