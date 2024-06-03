import React, { FC } from "react";
import { PricingWidgetProps } from "../types";
import SignUpPopUp from "@@/features/signUpPopUp/SignUpPopUp";
import PriceWidget from "@@/pages/components/PriceWidget/PriceWidget";
import EnquireNowModal from "@@/pages/components/EnquireNowModal/EnquireNowModal";
import AvailabilityButton from "../../AvailabilityButton";
import { useProductActive } from "@@/pages/Product/hooks/hooks";
import SkeletonPricingWidgetBottomMobile from "./SkeletonPricingWidgetBottomMobile";

const PricingWidgetBottomMobile: FC<PricingWidgetProps> = (props) => {
  const { pricingWidget: pw } = props;

  const isProductActive = useProductActive(pw.status);

  const renderPopUp = pw.shouldShowPopUp && (
    <SignUpPopUp
      parentRef={pw.productPageRef}
      iterable_key={pw.iterable_key}
    />
  );

  if (!pw.priceData || pw.priceFetching) {
    return (
      <SkeletonPricingWidgetBottomMobile
        enquireOnly={pw.enquireOnly}
        name={pw.title}
        hasVariantProducts={pw.hasVariantProducts}
        bookingUrl={pw.legacy?.bookingUrl}
        status={pw.status}
        bookingRequired={pw.bookingRequired}
      />
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-20 md:hidden">
      {renderPopUp}
      <div className="bg-white border border-inputBorder shadow-label max-w-full m-0 px-2 py-4 flex justify-between">
        <div className="ml-10px -mb-2 flex flex-col">
          <span className="text-[12px] -mb-2 -mt-1">from</span>
          <PriceWidget
            originalCurrencyIsoSymbol={pw.priceFrom?.currencyCode}
            amount={pw.priceFrom?.convertedAmount}
            size="md-mobile"
          />
        </div>
        {isProductActive && pw.enquireOnly ? (
          <EnquireNowModal
            isMobile={true}
            productUrl={pw.uri?.url}
            productName={pw.title}
          />
        ) : (
          <AvailabilityButton
            availabilityV2Enabled={pw.isAvailabilityV2Enabled}
            hasVariantProducts={pw.hasVariantProducts}
            priceFrom={pw.priceFrom?.convertedAmount}
            nextAvailableDate={pw.nextAvailableDate}
            setCalendarShown={pw.setCalendarShown}
            bookingRequired={pw.bookingRequired}
            bookingUrl={pw.legacy?.bookingUrl}
            isLoading={pw.priceFetching}
            priceData={pw.priceData}
            slug={pw.uri?.slug}
            status={pw.status}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
};

export default PricingWidgetBottomMobile;
