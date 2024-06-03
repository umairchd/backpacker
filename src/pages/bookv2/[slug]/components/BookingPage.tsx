import React, { useState, createContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/router";

import { useCommonBookingData } from "@@/pages/bookv2/hooks/useCommonBookingData";
import OpenDatedBookingCard from "./OpenDatedBookingCard";
import BookingFailedModal from "./BookingFailedModal";
import RegularBookingPage from "./RegularBookingPage";
import useBookingAnPValidation from "@@/pages/bookv2/hooks/useBookingAnPValidation";
import PriceChangedModal from "./PriceChangedModal";
import usePaymentOptions from "@@/pages/bookv2/hooks/usePaymentOptions";
import { PaymentOptionsFragment } from "@@/pages/bookv2/hooks/usePaymentOptions.generated";
import { ProductForBookingFragment } from "@@/pages/bookv2/hooks/useCommonBookingData.generated";
import { BookingInfoFragment } from "@@/pages/bookv2/hooks/useBookingInfo.generated";

import classes from "./BookingPage.module.scss";

export const BookingPageContext = createContext<{
  paymentOptions: PaymentOptionsFragment;
  product: ProductForBookingFragment;
  currencySymbol: string;
  currencyRounding: number;
  fareTypes: { label: string; id: string }[];
}>({
  paymentOptions: null,
  product: null,
  currencySymbol: null,
  currencyRounding: null,
  fareTypes: [],
});

export const BookingInfoContext = createContext<{
  data: BookingInfoFragment;
  setBookingData: (data: BookingInfoFragment) => void;
}>({
  data: null,
  setBookingData: null,
});

const BookingPage = () => {
  const {
    query: { gift, date, slot },
  } = useRouter();
  const [bookingFailedModalShown, setBookingFailedModalShown] = useState(false);

  const [bookingIds] = useLocalStorage<{
    [productId: string]: string;
  }>("bookingIds", {});

  const [bookingData, setBookingData] = useState<BookingInfoFragment>(null);

  const { hasParentProduct, currencyRounding, currencySymbol, formattedDate, fareTypesData, product } =
    useCommonBookingData();

  const isOpenDated = gift || !!product?.legacy?.bookingUrl || !product?.bookingRequired;
  const bookingLSKey = isOpenDated ? product?.productId : `${product?.productId}:${date}:${slot}`;
  const bookingId = bookingIds[bookingLSKey];
  const hasVariantProducts = product?.variantProducts?.length > 1;

  const paymentOptions = usePaymentOptions(product?.uri?.url);

  const bookingPageContextValue = useMemo(() => {
    return {
      paymentOptions,
      product,
      currencySymbol,
      currencyRounding,
      fareTypes: fareTypesData,
    };
  }, [paymentOptions, product, currencySymbol, fareTypesData]);

  const bookingInfoContextValue = useMemo(() => {
    return {
      data: bookingData,
      setBookingData,
    };
  }, [bookingData, setBookingData]);

  const showErrorPopup = () => {
    setBookingFailedModalShown(true);
  };

  const { updatedPrice, validateBookingAnP, onPriceChangedContinueClick } = useBookingAnPValidation(bookingId);

  const toProductDetailPage = useCallback(() => {
    const productUrl = hasParentProduct ? product.parentProduct.uri.url : product.uri.url;
    window.location.href = productUrl;
  }, [hasParentProduct, product]);

  if (!product) {
    return null;
  }

  return (
    <BookingPageContext.Provider value={bookingPageContextValue}>
      <BookingInfoContext.Provider value={bookingInfoContextValue}>
        <div className={classes["booking-page-content"]}>
          <PriceChangedModal
            isOpen={!!updatedPrice}
            newPrice={updatedPrice}
            onContinueClick={onPriceChangedContinueClick}
          />
          <BookingFailedModal
            isOpen={bookingFailedModalShown}
            tourOptionsHref={hasVariantProducts ? `${product.uri.url}#booking-section` : null}
            toProductDetailPage={toProductDetailPage}
          />
          <div className="max-w-1320px px-3 sm:px-6 mx-auto">
            {isOpenDated ? (
              <div className="grid grid-cols-12 gap-6 justify-center">
                <section className="col-span-12 xl:col-span-9">
                  <OpenDatedBookingCard
                    showErrorPopup={showErrorPopup}
                    validateBookingAnP={validateBookingAnP}
                  />
                </section>
              </div>
            ) : (
              <RegularBookingPage
                formattedDate={formattedDate}
                showErrorPopup={showErrorPopup}
                validateBookingAnP={validateBookingAnP}
                toProductDetailPage={() => toProductDetailPage()}
              />
            )}
          </div>
        </div>
      </BookingInfoContext.Provider>
    </BookingPageContext.Provider>
  );
};

export default BookingPage;
