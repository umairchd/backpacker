import { FC } from "react";

import EnquireNowModal from "@@/pages/components/EnquireNowModal/EnquireNowModal";
import AvailabilityButton from "../../AvailabilityButton";
import { SkeletonPricingWidgetProps } from "../types";
import Skeleton from "@@/pages/components/Skeleton";
import { useProductActive } from "@@/pages/Product/hooks/hooks";

const SkeletonPricingWidget: FC<SkeletonPricingWidgetProps> = ({
  enquireOnly,
  name,
  hasVariantProducts,
  bookingUrl,
  status,
  bookingRequired,
}) => {
  const isProductActive = useProductActive(status);

  return (
    <>
      <div className="flex-1">
        <div className="text-center text-gray-400	text-sm p-3 flex items-center justify-center flex-col">
          <span className="font-semibold">from</span>

          <div className="px-6">
            <Skeleton
              height={65}
              width={250}
            />
          </div>
          <div className="px-6">
            <span>
              <Skeleton
                height={40}
                width={120}
                style={{ marginBottom: "10px" }}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="py-6 px-2 leading-6 text-black break-words bg-transparent lg:border-t border-solid border-zinc-300">
          {isProductActive && enquireOnly && !hasVariantProducts ? (
            <EnquireNowModal
              productName={name}
              isLoading={true}
            />
          ) : (
            <AvailabilityButton
              hasVariantProducts={hasVariantProducts}
              bookingRequired={bookingRequired}
              bookingUrl={bookingUrl}
              isLoading={true}
              status={status}
            />
          )}

          <div className="flex justify-center items-center mt-4">
            <span>Next available: </span>
            <Skeleton
              height={30}
              width={100}
              style={{ marginLeft: "5px", marginTop: "-2px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonPricingWidget;
