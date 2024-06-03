"use client";

import { useEffect, useMemo, FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, getSelectedCurrency } from "@@/features/price/model";

import find from "lodash/find";
import { useClientContext, ClientInfoQuery } from "@@/app/lib/ClientInfoProvider";
import { CustomDropdownProps } from "../../lib/dropdown";
import { getCookie, setCookie } from "cookies-next";
import { CURRENCY_COOKIE_KEY } from "@@/middlewares/currency";
import { useServerContext } from "../../lib/ServerContextProvider";
import CustomDropdown from "./CustomDropdown";
import CustomDropdownItem from "./CustomDropdownItem";

import CurrencyDropdownMobile from "./CurrencyDropdownMobile";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa6";

const CurrencyDropdownContent: FC<
  CustomDropdownProps<{
    clientInfo: ClientInfoQuery["clientInfo"];
  }>
> = function CurrencyDropdown({ afterSelect, clientInfo: { currencyCode: defaultCurrencyCode }, variant }) {
  const { supportedCurrencies } = useServerContext();
  const isMobile = variant === "mobile";

  const dispatch = useDispatch();
  const selectedCurrency = useSelector(getSelectedCurrency);
  const selectedCurrencyObj = useMemo(() => {
    return find(supportedCurrencies, { isoSymbol: selectedCurrency });
  }, [selectedCurrency, supportedCurrencies]);

  useEffect(() => {
    if (!selectedCurrency || !selectedCurrencyObj) {
      const cookieCurrency = find(supportedCurrencies, {
        isoSymbol: getCookie(CURRENCY_COOKIE_KEY) as string,
      });
      const currency = cookieCurrency?.isoSymbol ?? defaultCurrencyCode ?? supportedCurrencies?.[0]?.isoSymbol;
      dispatch(selectCurrency(currency));
    } else {
      setCookie(CURRENCY_COOKIE_KEY, selectedCurrency, {
        secure: true,
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60,
      });
    }
  }, [dispatch, selectedCurrency, supportedCurrencies, selectedCurrencyObj, defaultCurrencyCode]);

  const contentEl = (
    <CustomDropdown
      onSelect={(eventKey, e) => {
        const currencyObj = supportedCurrencies[Number(eventKey)];
        dispatch(selectCurrency(currencyObj.isoSymbol));
        afterSelect?.(eventKey, e);
      }}
    >
      {supportedCurrencies.map((currency, i) => {
        return (
          <CustomDropdownItem
            onSelect={(eventKey, e) => {
              const currencyObj = supportedCurrencies[Number(eventKey)];
              dispatch(selectCurrency(currencyObj.isoSymbol));
              afterSelect?.(eventKey, e);
            }}
            key={currency.isoSymbol}
            eventKey={i.toString()}
            className="hover:bg-primary hover:text-white md:text-base md:font-normal md:px-5 px-2 py-2 text-sm font-light text-black cursor-pointer"
          >
            {currency.name}
          </CustomDropdownItem>
        );
      })}

      <li className="list-none m-0 bg-gray-50 text-gray-700 p-3 text-10px mt-1 -mb-1 italic">
        Note: Currency Conversions are approximate guide only. All transactions are processed in their respective
        currency
      </li>
    </CustomDropdown>
  );

  return isMobile ? (
    <CurrencyDropdownMobile
      title={selectedCurrencyObj?.name}
      contentEl={contentEl}
    />
  ) : (
    <Menu
      as="div"
      className="focus-visible:outline-none list_active_state relative block text-left"
    >
      <Menu.Button className="group !outline-primary !outline-2 ring-0 focus-visible:ring-primary relative w-full flex items-center justify-between gap-6px cursor-pointer rounded-lg bg-white px-4 text-left  shadow-box h-10 text-sm hover:text-primary">
        {selectedCurrencyObj?.name}
        <FaChevronUp className={`h-3 w-3 text-gray-400 rotate-180 group-hover:text-primary`} />
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
        <Menu.Items className="shadow-box focus:outline-none ring-primary ring-2 w-60 absolute right-0 mt-2 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-lg outline-none">
          <Menu.Item>
            {({ close }) => (
              <ul
                onClick={close}
                className="py-1"
              >
                {contentEl}
              </ul>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default function CurrencyDropdown(props: CustomDropdownProps) {
  const { clientInfo } = useClientContext();

  if (!clientInfo) {
    return null;
  }

  return <CurrencyDropdownContent {...{ clientInfo, ...props }} />;
}
