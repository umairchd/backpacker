import React, { FC, useMemo } from "react";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import find from "lodash/find";
import { useClientContext } from "@@/app/lib/ClientInfoProvider";
import {
  Bpd_PaymentOptions,
  ProductDiscountAmountFragment,
  ProductFragment,
} from "@@/pages/Product/queries/product-queries.generated";
import { formatPrice, isAfterpayEnabled } from "@@/pages/components/PriceWidget/utils";
import { getSelectedCurrency } from "@/src/features/price/model";
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";

const AfterPayWidget = dynamic(() => import("@@/pages/components/PriceWidget/AfterpayWidget"));

const LaybuyModal = dynamic(() => import("@@/pages/components/LaybuyModal/LaybuyModal"));

interface PriceWidgetProps {
  variant?: "bold" | "normal";
  prefix?: string;
  originalCurrencyIsoSymbol?: string;
  amount?: number;
  originalAmount?: number;
  size?: "xs" | "sm" | "md" | "md-mobile" | "lg";
  paymentOptions?: Bpd_PaymentOptions;
  legacy?: ProductFragment["legacy"];
  discountAmount?: ProductDiscountAmountFragment;
}

/**
 * This list contains currencies that have no decimal places
 * @type {string[]}
 * @memberof PriceWidget
 * @see {@link https://en.wikipedia.org/wiki/ISO_4217}
 *  */
export const currenciesWithoutDecimals: string[] = [
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "ISK",
  "JPY",
  "KMF",
  "KRW",
  "PYG",
  "RWF",
  "UGX",
  "UYI",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
];

const PriceWidget: FC<PriceWidgetProps> = ({
  prefix,
  originalCurrencyIsoSymbol = "",
  amount = 0,
  originalAmount = 0,
  variant,
  size,
  paymentOptions,
  legacy,
  discountAmount,
}) => {
  const { supportedCurrencies } = useServerContext();

  const selectedCurrency = useSelector(getSelectedCurrency);

  const selectedCurrencyObj = useMemo(() => {
    return find(supportedCurrencies, { isoSymbol: selectedCurrency });
  }, [selectedCurrency, supportedCurrencies]);

  const originalCurrencyObj = useMemo(() => {
    return find(supportedCurrencies, { isoSymbol: originalCurrencyIsoSymbol });
  }, [originalCurrencyIsoSymbol, supportedCurrencies]);

  const { clientInfo: { isoCountryCode } = {} } = useClientContext();

  const fontSize = useMemo(() => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-base";
      case "md":
        return "text-2xl";
      case "md-mobile":
        return "text-lg font-bold";
      case "lg":
        return "text-2rem";
      default:
        return "";
    }
  }, [size]);

  if (!selectedCurrencyObj) {
    return null;
  }

  const isApproximate = selectedCurrencyObj.isoSymbol !== originalCurrencyIsoSymbol;
  const currencySymbol = selectedCurrencyObj.symbol;
  const currencyIsoSymbol = selectedCurrencyObj.isoSymbol;
  const recommendedRetailPrice = amount + (discountAmount?.discountAmount?.convertedAmount || 0);

  return (
    <span>
      {prefix ? (
        <span
          className="text-sm ml-1  text-price block
          leading-4 font-light lowercase absolute -top-15px -left-px"
        >
          {prefix}
        </span>
      ) : null}

      {currencySymbol ? (
        <span className={`text-inherit ${variant === "bold" ? "font-bold" : ""} ${fontSize}`}>{currencySymbol}</span>
      ) : null}

      <span className={`text-inherit ${variant === "bold" ? "font-bold" : ""} ${fontSize}`}>
        {formatPrice(amount, currencyIsoSymbol)}
      </span>

      {isApproximate ? (
        <span
          className={`${fontSize}`}
          title="approximate calculation only"
        >
          *
        </span>
      ) : null}

      {discountAmount && discountAmount?.discountAmount?.convertedAmount > 0 && (
        <>
          <span className="block text-grayT font-normal line-through">
            {currencySymbol}
            {formatPrice(recommendedRetailPrice, currencyIsoSymbol)}
            {isApproximate && "*"}
          </span>

          <span className="text-sm lg:text-base lg:leading-34px block font-normal text-darkRed2">
            save{" "}
            <b>
              {currencySymbol}
              {formatPrice(discountAmount?.discountAmount?.convertedAmount, currencyIsoSymbol)}
              {isApproximate && "*"}
            </b>
          </span>
        </>
      )}

      <div className="max-w-250px m-auto">
        {paymentOptions?.afterpay &&
          isAfterpayEnabled(
            originalAmount,
            isoCountryCode,
            originalCurrencyIsoSymbol,
            paymentOptions?.afterpay,
            legacy?.isDisplayAfterpay,
          ) && (
            <AfterPayWidget
              {...{
                currencyIsoSymbol: originalCurrencyIsoSymbol,
                amount: originalAmount,
                afterpay: paymentOptions?.afterpay,
              }}
            />
          )}
        {paymentOptions?.laybuy && (
          <LaybuyModal
            currencySymbol={originalCurrencyObj.symbol}
            amount={originalAmount}
          />
        )}
      </div>
    </span>
  );
};

export default PriceWidget;
