import { FC } from "react";

import AvailabilityButton from "../../AvailabilityButton";

import { PricingWidgetProps } from "../types";
import { useProductActive } from "@@/pages/Product/hooks/hooks";
import dynamic from "next/dynamic";
import PriceWidget from "@@/pages/components/PriceWidget/PriceWidget";

const EnquireNowModal = dynamic(() => import("@@/pages/components/EnquireNowModal/EnquireNowModal"));

const ProductPricingWidget: FC<PricingWidgetProps> = (props) => {
  const { pricingWidget: pw } = props;

  const paymentOptions = {
    ...pw.paymentOptions,
    ...pw.paymentConfigurations,
  };

  const isProductActive = useProductActive(pw.status);

  return (
    <>
      <div className="flex-1">
        <div className="text-center bg-white py-3 px-6 flex flex-col">
          <span className="text-13px font-bold text-center text-search mb-2">from</span>
          <PriceWidget
            originalCurrencyIsoSymbol={pw.priceFrom?.currencyCode}
            amount={pw.priceFrom?.convertedAmount}
            originalAmount={pw.priceFrom?.amount}
            paymentOptions={paymentOptions}
            discountAmount={pw.discountAmount}
            legacy={pw.legacy}
            variant="bold"
            size="lg"
          />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="py-6 px-2 leading-6 text-black break-words bg-transparent lg:border-t border-solid border-zinc-300">
          {isProductActive && pw.enquireOnly && !pw.hasVariantProducts ? (
            <EnquireNowModal
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
            />
          )}

          {pw.noAvailabilityFoundAndInactive && (
            <div className="text-sm font-normal text-center mt-20px leading-6">
              <span>
                📣 Hey! How about returning to{" "}
                <strong>
                  <a
                    href={pw.getUrl}
                    className="text-decoration-none text-capitalize"
                  >
                    {pw.uri.city}
                  </a>
                </strong>
                <br />
                and find another fun experience?
              </span>
            </div>
          )}

          {!pw.noAvailabilityFoundAndInactive && pw.isHasNextAvailableDates && (
            <div className="flex justify-center items-center mt-14px">
              <span className="text-sm">
                Next available: <b>{pw.getNextAvailableLabel(pw.nextAvailableDate)}</b>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPricingWidget;
