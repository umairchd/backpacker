import { FC } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Skeleton from "../Skeleton";

const ProductCardSkeleton: FC = () => {
  return (
    <div className="h-full rounded-xl group bg-white shadow-dealCard hover:shadow-hoverDealCard transition-all duration-200 ease-in-out overflow-hidden relative min-h-372px">
      <div className="h-full">
        <div className="h-200px p-6 align-content-end rounded-tl-lg rounded-tr-lg relative text-white transition-all duration-200 ease-in-out">
          <picture
            suppressHydrationWarning
            className="absolute inset-0 h-full"
          >
            <Skeleton
              width={480}
              height={190}
              className="object-cover -mt-10px"
            />
          </picture>
          <div className="bottomInfo"></div>
          <div className="gradientFade"></div>
        </div>

        <div className="px-3">
          <div className="locationDuration">
            <div className="flex items-center gap-6px">
              <FaLocationDot className="text-primary text-sm shrink-0" />
              <div className="w-full">
                <Skeleton
                  width={100}
                  height={15}
                />
              </div>
            </div>
            <div className="productName">
              <Skeleton
                width={200}
                height={20}
              />
              <Skeleton
                width={100}
                height={20}
              />
            </div>
          </div>

          <div className="price2">
            <div className="starRatingandBooked2">
              <div className="rating"></div>
            </div>

            <div className="costandSaving">
              <div className="text-xs text-right text-grayT font-medium flex flex-col items-end mt-10px">
                from
                <Skeleton
                  className="price-widget"
                  width={120}
                  height={25}
                />
              </div>
              <div className="saving">
                <b>
                  <Skeleton
                    className="price-widget"
                    width={120}
                  />
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
