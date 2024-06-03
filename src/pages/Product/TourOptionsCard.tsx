import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import find from "lodash/find";

import {
  ProductDiscountAmountFragment,
  VariantProductFragment,
} from "@@/pages/Product/queries/product-queries.generated";
import PriceWidget, { currenciesWithoutDecimals } from "@@/pages/components/PriceWidget/PriceWidget";
import AvailabilityCalendar from "@@/features/calendar/components/AvailabilityCalendar/AvailabilityCalendar";
import { getNextAvailableLabel } from "@@/pages/Product/utils";
import { getSelectedCurrency } from "@@/features/price/model";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

import EnquireNowModal from "../components/EnquireNowModal/EnquireNowModal";
import { changeSelectedDate } from "@@/features/calendar/model";
import { getDateFromNextAvailableDateString } from "@@/features/calendar/utils/nextAvailableDateUtil";
import { TourOptionsCardProps } from "./types";
import { FaCalendarDays } from "react-icons/fa6";
import StyledProductCard from "@@/pages/Product/ProductContent/StyledProductCard";
import { PriceFrom } from "@@/pages/Product/ProductContent/types";

const TourOptionsCard: FC<TourOptionsCardProps> = ({
  products,
  hasVariantProducts,
  enquireOnly,
  isBanner,
  nextAvailableDateAndPriceFrom,
}) => {
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(getSelectedCurrency);
  const { supportedCurrencies } = useServerContext();

  const [calendarVariantProps, setCalendarVariantProps] = useState<{
    productId: string;
    productName: string;
    nextAvailableDate: string;
    discount: ProductDiscountAmountFragment[];
    priceFrom: PriceFrom;
    priceFromAvailableAt: string;
  } | null>(null);

  const selectedCurrencyObj = useMemo(() => {
    return find(supportedCurrencies, { isoSymbol: selectedCurrency });
  }, [selectedCurrency, supportedCurrencies]);

  const getProductSaveAmount = useCallback((product: VariantProductFragment) => {
    if (product?.legacy?.countDownLimit > 0) {
      return product?.legacy.recommendedRetailPrice.convertedAmount - product?.priceFrom?.convertedAmount;
    }
    return product?.discounts[0]?.discountAmount?.convertedAmount || 0;
  }, []);

  const getButtonText = (product: VariantProductFragment) => {
    if (product.status !== "ACTIVE") {
      return "Not Available";
    }

    return "Check Availability";
  };

  const handleCheckAvailabilityButtonClick = (product: VariantProductFragment) => {
    const productNextAvailableDateAndPriceFrom = nextAvailableDateAndPriceFrom.find(
      (p) => p.productId === product.productId,
    );
    const nextAvailableDate = productNextAvailableDateAndPriceFrom.nextAvailableDate;

    if (nextAvailableDate) {
      const nextAvailableDateString = getDateFromNextAvailableDateString(nextAvailableDate);

      if (nextAvailableDateString) {
        dispatch(changeSelectedDate(nextAvailableDateString));
      }
    }

    setCalendarVariantProps({
      productId: product.productId,
      productName: product.title,
      nextAvailableDate: nextAvailableDate,
      discount: product?.discounts,
      priceFrom: productNextAvailableDateAndPriceFrom.priceFrom,
      priceFromAvailableAt: productNextAvailableDateAndPriceFrom.priceFromAvailableAt,
    });
  };

  const tourOptionRef = useRef(null);
  const isApproximate = (product: VariantProductFragment) => {
    return selectedCurrencyObj.isoSymbol !== product.priceFrom?.currencyCode;
  };

  const formatProductPriceWithCurrency = (currencyISOSymbol: string, price: number, isApproximate = false): string => {
    if (!price) {
      return "";
    }

    const formattedPrice = price.toFixed(currenciesWithoutDecimals.includes(selectedCurrency) ? 0 : 2);

    return `${currencyISOSymbol} ${formattedPrice} ${isApproximate ? "*" : ""}`;
  };

  return (
    <StyledProductCard>
      <div ref={tourOptionRef}>
        {calendarVariantProps && (
          <AvailabilityCalendar
            {...calendarVariantProps}
            parentRef={tourOptionRef}
            onClose={() => setCalendarVariantProps(null)}
          />
        )}
        <div
          style={{
            scrollMarginTop: isBanner ? "230px" : "200px",
          }}
          className={`white-card`}
        >
          <h2
            className={`mt-8 text-2xl font-bold heading mb-5`}
            id="booking-section"
            style={{
              scrollMarginTop: isBanner ? "230px" : "200px",
            }}
          >
            Tour Options
          </h2>
          {products.map((product, ind) => {
            const formattedProductRecommendedRetailPrice = formatProductPriceWithCurrency(
              selectedCurrencyObj?.symbol || selectedCurrency,
              product?.legacy.recommendedRetailPrice.convertedAmount,
              isApproximate(product),
            );

            const productSaveAmount = getProductSaveAmount(product);
            const formattedSaveAmount = formatProductPriceWithCurrency(
              selectedCurrencyObj?.symbol || selectedCurrency,
              productSaveAmount,
              isApproximate(product),
            );

            return (
              <div
                key={product.productId}
                className="border-b border-TourCardBorder text-cardT py-2 pt-4 pb-6 flex items-start flex-col md:flex-row"
              >
                <div className="w-full text-center md:text-left md:w-45% text-xl pr-6">
                  <div>{product?.title}</div>
                  {product.shortDescription?.text && (
                    <div className="text-grayT text-13px font-light">{product.shortDescription.text}</div>
                  )}
                </div>
                <div className="flex flex-col w-full text-center  md:text-left md:w-30%">
                  <span className="text-sm mb-1">from</span>
                  <PriceWidget
                    variant="bold"
                    originalCurrencyIsoSymbol={product?.priceFrom?.currencyCode}
                    amount={product?.priceFrom?.convertedAmount}
                    originalAmount={product?.priceFrom?.amount}
                    size="md"
                  />
                  {productSaveAmount > 0 && (
                    <div>
                      <span className="block text-grayT line-through font-medium text-sm leading-1.5 mt-5px">
                        {formattedProductRecommendedRetailPrice}
                      </span>
                      <span className="block text-darkRed2 font-medium text-sm leading-1.5 mt-5px">
                        save <strong>{formattedSaveAmount}</strong>
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-full md:w-1/4">
                  {hasVariantProducts && enquireOnly ? (
                    <EnquireNowModal
                      productUrl={product.uri?.url}
                      productName={product.title}
                    />
                  ) : (
                    <button
                      className="w-fit capitalize text-base font-bold h-auto py-6px px-5 rounded-full text-white mx-auto block md:w-full outline-none bg-primary"
                      type="button"
                      onClick={() => handleCheckAvailabilityButtonClick(product)}
                      disabled={product.status !== "ACTIVE"}
                    >
                      {getButtonText(product)}
                    </button>
                  )}

                  {product.nextAvailableDate && (
                    <div className="m-5px !mt-3 flex flex-col justify-center items-center text-center">
                      <span className="flex text-sm items-center gap-6px">
                        <FaCalendarDays />
                        Next available:
                      </span>
                      <span className="text-sm font-bold text-black">
                        {getNextAvailableLabel(product.nextAvailableDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StyledProductCard>
  );
};

export default TourOptionsCard;
