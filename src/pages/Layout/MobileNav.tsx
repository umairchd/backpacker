"use client";

import { FC, useState } from "react";
import { useServerContext } from "../lib/ServerContextProvider";
import OtherDestinations from "./OtherDestinations/OtherDestinations";
import CountriesMenu from "./CountriesMenu/CountriesMenu";
import BusPasses from "./BusPasses/BusPasses";
import CampervanLink from "./Campervans/CampervanLink";
import CarRentalLink from "@@/pages/Layout/CarRental/CarRentalLink";
import WhatsappWidget from "../components/WhatsappWidget/WhatsappWidget";
import TrustpilotWidget from "../components/TrustpilotWidget/TrustpilotWidget";
import CurrencyDropdown from "./CurrencyDropdown/CurrencyDropdown";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { useMultiDayMenu } from "@@/app/components/hooks";
import { MobileNavProps } from "./types";
import LocalPhoneNumber from "./LocalPhoneNumber";
import { useMenuVisibility } from "@@/pages/utils/useMenuVisibility";
import { JuicyWebsiteLink } from "@@/app/components/Nav";

const TravelInspirationLink: FC = function TravelInspirationLink() {
  return (
    <a
      href="https://www.backpackerdeals.com/blog"
      aria-label="Travel Inspiration"
      target="_blank"
      rel="noopener noreferrer"
      className="sm:text-sm text-xs font-light"
    >
      Travel Inspiration
    </a>
  );
};

const JuicyWebsiteContainerMobile: FC = () => (
  <li className="list-none m-0 px-4 py-2.5 block relative no-underline bg-white border-b-[0.5px] border-gray-100">
    <JuicyWebsiteLink styleOverride="hover:text-primary md:font-normal text-xs font-light text-black" />
  </li>
);

const MobileNav: FC<MobileNavProps> = function MobileNav(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { channel } = useServerContext();
  const { features } = channel ?? {};
  const { isBackpackerDealsChannel, isYhaChannel, isSpaceShipsChannel, isJucyChannel } = props.channelKey;
  const multiDayMenu = useMultiDayMenu(isBackpackerDealsChannel());
  const { isBusPassVisible, isMultiDayToursVisible } = useMenuVisibility({
    isSpaceShipsChannel,
    isJucyChannel,
  });

  return (
    <>
      <button
        className="shadow-box flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-lg xl:hidden"
        type="button"
        aria-label="Open mobile menu"
        onClick={handleShow}
      >
        <FiMenu className="text-primary shrink-0 text-xl" />
      </button>
      <div
        className={`visible xl:invisible fixed inset-0 z-999 h-screen flex flex-col max-w-340px w-full bg-white transition-transform duration-300 ease-in-out border-r border-black/20 ${
          show ? "transform-none " : "-translate-x-full"
        }`}
        tabIndex={-1}
      >
        <button
          type="button"
          className={`${
            show ? "translate-x-full transition-all duration-300" : "-translate-x-50px  transition-all duration-300"
          } h-10 w-10 shrink-0 absolute z-10 right-50px top-4 sm:-right-3 sm:top-1 bg-white flex items-center justify-center shadow-box hover:shadow-none rounded-lg text-primary`}
          aria-label="Close mobile menu"
          onClick={handleClose}
        >
          <FiX className="text-primary shrink-0 text-xl" />
        </button>
        <div className="grow-1 scrollbar overflow-y-auto">
          <ul className="mb-116px">
            {isBackpackerDealsChannel() && (
              <li className="item-none m-0 p-4 flex items-center justify-start md:justify-center relative no-underline bg-white border-b-0.5px border-gray-100">
                <WhatsappWidget
                  width={250}
                  height={40}
                />
              </li>
            )}

            <li className="list-none m-0">
              <CountriesMenu
                listCountry="Australia"
                variant="mobile"
                isBusPassVisible={isBusPassVisible}
              />
            </li>

            <li className="list-none m-0">
              <CountriesMenu
                listCountry="New Zealand"
                variant="mobile"
                isBusPassVisible={isBusPassVisible}
              />
            </li>

            <li className="list-none m-0">
              <OtherDestinations
                variant="mobile"
                buttonClassName={`text-start  list-group-item btn-outline-primary`}
              />
            </li>

            {isMultiDayToursVisible && (
              <li className="list-none m-0 px-4 py-10px block relative no-underline bg-white border-b-[0.5px] border-gray-100">
                <a
                  href={multiDayMenu.link}
                  aria-label={multiDayMenu.title}
                  id={multiDayMenu.id}
                  className="hover:text-primary md:font-normal text-xs font-light text-black"
                >
                  {multiDayMenu.title}
                </a>
              </li>
            )}

            <CampervanLink
              className="px-4 py-10px block relative no-underline bg-white border-b-0.5px border-gray-100 font-light md:font-normal text-xs text-black hover:text-primary"
              variant="mobile"
            />

            <CarRentalLink
              className="px-4 py-10px block relative no-underline bg-white border-b-0.5px border-gray-100 font-light md:font-normal text-xs text-black hover:text-primary"
              variant="mobile"
            />

            {isBusPassVisible && (
              <li
                className="list-none m-0"
                id="busPass"
              >
                <BusPasses variant="mobile" />
              </li>
            )}

            <li className="list-none m-0">
              <CurrencyDropdown
                afterSelect={() => setShow(false)}
                variant="mobile"
              />
            </li>

            {isJucyChannel() && <JuicyWebsiteContainerMobile />}

            {isBackpackerDealsChannel() && (
              <li className="list-none m-0 px-4 py-2 block relative no-underline bg-white border-b-0.5px border-gray-100 font-light text-xs text-black hover:text-primary">
                <TravelInspirationLink />
              </li>
            )}
          </ul>
          <div className=" absolute bottom-0 left-0 w-full p-3 bg-white border-t">
            <div
              className="p-4 block relative no-underline bg-white border-b-0.5px border-gray-100"
              id="CallClick"
            >
              <LocalPhoneNumber
                isMobile={false}
                isYhaChannel={isYhaChannel()}
              />
            </div>

            {isBackpackerDealsChannel() && (
              <div className="pb-14px block relative no-underline">
                <TrustpilotWidget />
              </div>
            )}
            {features?.includes("user-accounts") && (
              <a
                href="/user#/login"
                className="flex items-center gap-2 font-light px-4 py-10px relative no-underline border-b-0.5px border-gray-100 text-sm text-black hover:text-primary  bg-gray-200 rounded-xl"
              >
                <FaCircleUser className="text-xl text-gray-700" />
                My Account
              </a>
            )}
          </div>
        </div>
      </div>

      {show && (
        <div
          className="bg-black/50 fixed inset-0 w-screen h-screen z-10"
          onClick={handleClose}
        />
      )}
    </>
  );
};

export default MobileNav;
