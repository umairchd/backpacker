import { Bpd_Afterpay } from "@@/pages/Product/queries/product-queries.generated";
import { currenciesWithoutDecimals } from "@@/pages/components/PriceWidget/PriceWidget";

export const isAfterpayEnabled = (
  productPrice: number,
  clientCountryISOCode: string,
  originalCurrencyIsoSymbol: string,
  afterpay: Bpd_Afterpay = {},
  isDisplayAfterpay: boolean,
) => {
  if (!afterpay?.enabled || originalCurrencyIsoSymbol !== "AUD" || !isDisplayAfterpay) {
    return false;
  }

  if (afterpay.region !== clientCountryISOCode) {
    return false;
  }

  return productPrice >= afterpay.order_minimum && productPrice <= afterpay.order_maximum;
};

export const formatPrice = (value: number, currencyIsoSymbol: string, isRequestNumberValue = false) => {
  const hasDecimalPlaces = !currenciesWithoutDecimals.includes(currencyIsoSymbol);
  const price = hasDecimalPlaces ? value.toFixed(2) : value.toFixed(0);

  if (isRequestNumberValue) {
    return price;
  }

  const regExp = /(\d)(?=(\d{3})+\.)/g;
  return price.replace(regExp, "$1,");
};
