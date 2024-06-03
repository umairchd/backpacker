import { FC } from "react";
import { useBreakpoints } from "@/src/features/utils";
import { useDispatch } from "react-redux";
import { setIsOpen } from "@@/features/search/model";
import { useScrolled } from "@@/pages/hooks/useScrolled";

import dynamic from "next/dynamic";
import clsx from "clsx";

import OtherDestinations from "@@/pages/Layout/OtherDestinations/OtherDestinations";
import LocalPhoneNumber from "@@/pages/Layout/LocalPhoneNumber";
import TrustpilotWidget from "@@/pages/components/TrustpilotWidget/TrustpilotWidget";
import CurrencyDropdown from "@@/pages/Layout/CurrencyDropdown/CurrencyDropdown";
import CampervanLink from "@@/pages/Layout/Campervans/CampervanLink";
import CarRentalLink from "@@/pages/Layout/CarRental/CarRentalLink";
import CountriesMenu from "@@/pages/Layout/CountriesMenu/CountriesMenu";
import HeaderBanner from "@@/pages/components/HeaderBanner/HeaderBanner";
import BusPasses from "@@/pages/Layout/BusPasses/BusPasses";
import MobileNav from "@@/pages/Layout/MobileNav";

import { useChannelUtil } from "@@/pages/utils/useChannelUtil";
import { FaCircleUser } from "react-icons/fa6";
import { useMultiDayMenu } from "./hooks";
import { NavProps } from "./types";
import { useMenuVisibility } from "@@/pages/utils/useMenuVisibility";

const SearchInput = dynamic(() => import("@@/features/search/components/SearchInput/SearchInput"), { ssr: false });

const TravelInspirationLink: FC = function TravelInspirationLink() {
  return (
    <a
      href="https://www.backpackerdeals.com/blog"
      aria-label="Travel Inspiration"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary focus:outline-none focus-visible:outline-none text-sm text-black bg-transparent border-0"
    >
      Travel Inspiration
    </a>
  );
};

export const JuicyWebsiteLink: FC<{ styleOverride?: string }> = ({ styleOverride }) => (
  <a
    href="https://www.jucy.com"
    target="_blank"
    rel="noopener noreferrer"
    className={
      styleOverride ??
      "hover:text-primary focus:outline-none focus-visible:outline-none text-sm text-black bg-transparent border-0"
    }
  >
    Cars, Campervans & Motorhomes
  </a>
);

const JuicyWebsiteContainerDeskTop: FC = () => (
  <div className="lg:px-4 self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
    <JuicyWebsiteLink />
  </div>
);

const Nav: FC<NavProps> = ({ isObscured, channel, mainContainerClass }) => {
  const { name, features, key, siteConfig } = channel ?? {};
  const { logoImage } = siteConfig ?? {};
  const { navXlUp: isDesktop, mdUp: hideOnMobile, lgSearchUp: hideSearch } = useBreakpoints();
  const isScrolled = useScrolled();

  const dispatch = useDispatch();
  const { isBackpackerDealsChannel, isSpaceShipsChannel, isYhaChannel, isJucyChannel } = useChannelUtil(key);
  const { isBusPassVisible, isMultiDayToursVisible } = useMenuVisibility({
    isSpaceShipsChannel,
    isJucyChannel,
  });

  const logoStyle = clsx(
    "w-auto h-35px lg:h-45px",
    isSpaceShipsChannel() ? "w-auto h-35px lg:h-50px" : "w-auto h-35px lg:h-45px",
  );

  const navbarStyle = clsx(
    !hideOnMobile && isScrolled && "",
    "shadow-btn sticky top-0 left-0 right-0 z-40 w-full transition-all duration-200 ease-in-out bg-white",
    mainContainerClass,
  );

  const multiDayMenu = useMultiDayMenu(isBackpackerDealsChannel());

  return (
    <nav className={navbarStyle}>
      <HeaderBanner {...{ siteConfig }} />
      <div className="flex items-center justify-center 2xl:px-16 px-4 mx-auto h-60px md:h-77px">
        <div className="flex-nowrap md:py-4 sm:gap-5 flex items-center w-full gap-3 py-3 mx-auto font-medium">
          <div className="grid grid-flow-col">
            {!isDesktop && (
              <MobileNav channelKey={{ isBackpackerDealsChannel, isYhaChannel, isJucyChannel, isSpaceShipsChannel }} />
            )}
            <div className="duration-250 self-center text-center transition-all ease-in-out cursor-pointer">
              <a
                href="/"
                className="block"
              >
                <img
                  className={logoStyle}
                  srcSet={`
                    ${logoImage?.logo},
                    ${logoImage?.logo1_5x} 1.5x,
                    ${logoImage?.logo2x} 2x
                  `}
                  src={logoImage?.logo}
                  alt={name}
                  width="100%"
                  height="auto"
                  id="LogoClick"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          <div className="flex-1 flex gap-6 items-center max-[991px]:justify-end">
            <div className="text-center self-center cursor-pointer transition-all duration-200 ease-in-out min-[992px]:max-w-sm min-[992px]:w-full max-[991px]:ml-auto">
              <div
                id="searchInNav"
                className={`flex transition-all duration-200 ease-in-out ${!isObscured && "p-0"}`}
              >
                <SearchInput
                  isMobile={!hideSearch}
                  isObscured={!isObscured}
                  onClick={() => dispatch(setIsOpen(true))}
                />
              </div>
            </div>
          </div>
          <div className="sm:gap-x-6 gap-x-3 flex items-center justify-center">
            <div id="CallClick">
              <LocalPhoneNumber
                isMobile={false}
                isYhaChannel={isYhaChannel()}
              />
            </div>
            <div className="md:flex hidden">
              <CurrencyDropdown textClassName="font-medium text-sm" />
            </div>

            {features?.includes("user-accounts") && (
              <a
                href="/user#/login"
                id="AccountClick"
                className="group hover:text-primary sm:flex items-center self-center justify-center hidden gap-1 text-sm text-center text-black transition-all duration-300 ease-in-out cursor-pointer"
              >
                <FaCircleUser className="group-hover:text-primary shrink-0 text-2xl text-gray-700 transition-all duration-300" />
                My Account
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="2xl:px-16 h-12 px-4 mx-auto border-none hidden xl:block">
        {isDesktop && (
          <div className="font-sm flex-nowrap flex items-center w-full h-full gap-4 py-2 mx-auto font-medium">
            <div className="lg:gap-0 lg:justify-start flex items-center justify-end flex-1 gap-2">
              <div className="lg:px-3 self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
                <CountriesMenu
                  listCountry="Australia"
                  isBusPassVisible={isBusPassVisible}
                />
              </div>

              <div className="lg:px-3 self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
                <CountriesMenu
                  listCountry="New Zealand"
                  isBusPassVisible={isBusPassVisible}
                />
              </div>

              <div className="lg:px-3 self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
                <OtherDestinations />
              </div>

              {isMultiDayToursVisible && (
                <div className="lg:px-3 self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
                  <a
                    href={multiDayMenu.link}
                    id={multiDayMenu.id}
                    aria-label={multiDayMenu.title}
                    className="flex w-full items-center gap-2px justify-center rounded-md text-black hover:text-primary text-sm bg-transparent focus:outline-none focus-visible:outline-none border-0"
                  >
                    {multiDayMenu.title}
                  </a>
                </div>
              )}

              <CampervanLink
                className="hover:text-primary lg:px-3 focus:outline-none focus-visible:outline-none text-sm text-black bg-transparent border-0"
                variant="desktop"
              />

              <CarRentalLink
                className="hover:text-primary lg:px-3 focus:outline-none focus-visible:outline-none text-sm text-black bg-transparent border-0"
                variant="desktop"
              />

              {isBusPassVisible && (
                <div className="lg:px-3 self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
                  <BusPasses />
                </div>
              )}

              {isJucyChannel() && <JuicyWebsiteContainerDeskTop />}

              {isBackpackerDealsChannel() && (
                <div
                  className="lg:px-3 self-center text-center transition-all duration-200 ease-in-out cursor-pointer"
                  id="BlogClick"
                >
                  <TravelInspirationLink />
                </div>
              )}
            </div>

            <div className="lg:inline-grid lg:px-6 grid-cols-auto justify-end hidden grid-flow-col">
              {isBackpackerDealsChannel() && (
                <div className="self-center text-center transition-all duration-200 ease-in-out cursor-pointer">
                  <TrustpilotWidget />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
