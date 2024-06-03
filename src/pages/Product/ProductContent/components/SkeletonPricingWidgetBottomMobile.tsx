import { FC } from "react";
import { SkeletonPricingWidgetBottomMobileProps } from "../types";

import EnquireNowModal from "@@/pages/components/EnquireNowModal/EnquireNowModal";
import AvailabilityButton from "../../AvailabilityButton";
import { useProductActive } from "@@/pages/Product/hooks/hooks";
import Skeleton from "@@/pages/components/Skeleton";

const SkeletonPricingWidgetBottomMobile: FC<SkeletonPricingWidgetBottomMobileProps> = ({
  enquireOnly,
  name,
  hasVariantProducts,
  bookingUrl,
  status,
  bookingRequired,
}) => {
  const isProductActive = useProductActive(status);

  return (
    <div className="fixed bottom-0 left-0 w-full z-20 md:hidden">
      <div className="bg-white border border-inputBorder shadow-label max-w-full m-0 px-2 py-4 flex justify-between">
        <div className="ml-10px -mb-2 flex flex-col">
          <span className="text-[12px] -mb-2 -mt-1">from</span>
          <Skeleton
            height={20}
            width={80}
          />
        </div>
        {isProductActive && enquireOnly && !hasVariantProducts ? (
          <EnquireNowModal
            productName={name}
            isLoading={true}
            isMobile={true}
          />
        ) : (
          <AvailabilityButton
            hasVariantProducts={hasVariantProducts}
            bookingRequired={bookingRequired}
            bookingUrl={bookingUrl}
            isLoading={true}
            isMobile={true}
            status={status}
          />
        )}
      </div>
    </div>
  );
};

export default SkeletonPricingWidgetBottomMobile;
