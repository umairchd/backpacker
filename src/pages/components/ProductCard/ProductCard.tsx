import { FC, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdLocationPin } from "react-icons/md";
import { useLabelRibbon } from "@@/pages/components/ProductRibbon/hooks";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { ProductCardFragment } from "../queries/queries.generated";
import { getProductSaveAmount } from "@@/pages/Product/util/productDataUtil";

import dynamic from "next/dynamic";
import timeClock from "@@/themes/images/svg/icn-time-clock.svg";
import PriceWidget from "../PriceWidget/PriceWidget";
import ProductRibbon from "@@/pages/components/ProductRibbon/ProductRibbon";
import useImageIterator from "../../lib/useImageIterator";
import ProductCardSkeleton from "./ProductCardSkeleton";

const FlexibleBooking = dynamic(() => import("../FlexibleBooking/FlexibleBooking"));
const Cashback = dynamic(() => import("../Cashback/Cashback"), { ssr: false });
const StarRating = dynamic(() => import("../StarRating/StarRating"), {
  ssr: false,
});
const CountDownTimer = dynamic(() => import("@@/features/countDown/components/CountDownTimer/CountDownTimer"), {
  ssr: false,
});

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    imageid?: string;
  }
}

const ProductCard: FC<{ data?: ProductCardFragment }> = function ProductCard({ data }) {
  const images = data?.images?.productImages
    ?.filter((img) => img.status === "ACTIVE")
    .sort((a) => (a.isMainImage ? -1 : 1))
    .map((productImage) => productImage.image); // filter images

  const { shouldShowCashback } = useServerContext();
  const { image: mainImage, getNextImage } = useImageIterator(images);

  const { title, uri, location, duration, labels, legacy, ratingScore, totalReviews, priceFrom, discounts } =
    data ?? {};

  const labelRibbon = useLabelRibbon(labels);

  const countDownLimit = legacy?.countDownLimit ?? 0;
  const validatedPriceFrom = priceFrom || legacy?.priceFrom;

  const savedAmount = useMemo(() => {
    return getProductSaveAmount(discounts, data);
  }, [discounts, data]);

  if (!data) {
    return <ProductCardSkeleton />;
  }

  const nowUnixts = Math.floor(Date.now() / 1000);

  return (
    <div
      className="h-full rounded-xl group bg-white shadow-dealCard hover:shadow-hoverDealCard transition-all duration-200 ease-in-out overflow-hidden relative min-h-372px"
      data-product-id={data.productId}
    >
      <a
        href={uri?.url}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <div className="h-full">
          <div className="h-250px p-6 align-content-end rounded-tl-lg rounded-tr-lg relative text-white transition-all duration-200 ease-in-out">
            <picture
              suppressHydrationWarning
              className="absolute inset-0"
            >
              <LazyLoadImage
                className="object-cover w-full h-full"
                src={mainImage?.productCard}
                alt={mainImage?.altText || title}
                width="100%"
                height="100%"
                onError={getNextImage}
                effect="opacity"
              />
            </picture>
            <div className="min-h-35px z-2 absolute bottom-0 right-0 left-0 px-4 flex items-center justify-between">
              <div>{countDownLimit > nowUnixts && <CountDownTimer {...{ countDownLimit, format: "simple" }} />}</div>
              {duration?.label && (
                <div className="text-xs font-light flex gap-2 items-center">
                  <img
                    src={timeClock.src}
                    alt="timeClock"
                    width={12}
                    height={12}
                  />
                  {duration?.label}
                </div>
              )}
            </div>
            <div className="h-20 w-full bg-cardGrd absolute bottom-0 left-0"></div>
            <ProductRibbon
              labels={labelRibbon}
              variation="card"
            />
          </div>

          <div className="flex flex-col h-full p-4">
            <div className="block">
              <div className="mb-1 text-left grid grid-cols-auto-1fr gap-2 text-xs font-medium">
                <MdLocationPin className="text-primary text-base" />
                <span>{`${location?.city}, ${location?.country}`}</span>
              </div>
              <div className="line-clamp-2 group-hover:text-primary overflow-hidden text-lg font-bold text-left transition-all h-56px">
                {title}
              </div>
            </div>

            <div className="my-2 text-xs text-grayT pt-0 flex justify-between gap-4 items-center h-60px">
              <div className="m-0 text-left font-xs leading-4 grid content-end">
                {ratingScore && (
                  <StarRating
                    initialValue={ratingScore}
                    readonly
                    variant="card"
                  />
                )}
                <div className="text-primary text-xs">{totalReviews && `${totalReviews} reviews`}</div>
              </div>

              <div className="leading-4 text-right">
                <div className="text-black">
                  <span className="block text-right text-xs text-grayT mb-6px font-semibold">from</span>
                  <PriceWidget
                    {...{
                      originalCurrencyIsoSymbol: validatedPriceFrom?.currencyCode,
                      amount: validatedPriceFrom?.convertedAmount,
                    }}
                    variant="bold"
                    size="md"
                  />
                </div>
                {savedAmount?.discountAmount?.convertedAmount > 0 && (
                  <div className="text-xs flex justify-end mt-6px saving">
                    <span className="text-darkRed2">Save </span>
                    <PriceWidget
                      {...{
                        originalCurrencyIsoSymbol: validatedPriceFrom?.currencyCode,
                        amount: savedAmount?.discountAmount?.convertedAmount,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="relative flex items-center justify-between">
              <FlexibleBooking variant="tooltip" />
              {shouldShowCashback && <Cashback variant="productCard" />}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
