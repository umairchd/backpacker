import React, { FC, useMemo } from "react";

import { useServerContext } from "../../lib/ServerContextProvider";
import { useLabelRibbon } from "../../components/ProductRibbon/hooks";
import ProductRibbon from "@@/pages/components/ProductRibbon/ProductRibbon";
import { useBreakpoints } from "@@/features/utils";

import ProductFacts from "./../ProductContent/components/ProductFacts";
import Breadcrumbs from "@@/pages/components/Breadcrumbs/Breadcrumbs";
import { ProductHeaderProps } from "../ProductContent/types";
import { FaLocationDot } from "react-icons/fa6";
import DestinationStarRating from "@@/pages/components/DestinationStarRating/DestinationStarRating";
import ImageGallery from "./components/ImageGallery";
import ImageGlider from "./components/ImageGlider";
import Cashback from "@@/pages/components/Cashback/Cashback";
import classes from "./ProductHeader.module.scss";
import clsx from "clsx";

const ProductHeader: FC<ProductHeaderProps> = ({
  productId,
  images,
  name,
  price,
  subheader,
  ratingScore,
  totalReviews,
  location,
  countDownLimit,
  currencyCode,
  labels,
  icons,
  breadcrumbs,
}) => {
  const { siteConfig, shouldShowCashback } = useServerContext();
  const { iterable_key } = siteConfig ?? {};

  const labelRibbon = useLabelRibbon(labels);

  const { mdUp: isDesktop } = useBreakpoints();

  const activeImages = useMemo(() => {
    return images.filter(({ status }) => status === "ACTIVE");
  }, [images]);

  const productInfo = (
    <div className="flex items-center flex-wrap gap-4 mb-3">
      <div className="flex gap-6px items-center">
        <FaLocationDot className="text-primary text-base" />
        <span className="text-13px text-black">{`${location?.city}, ${location?.country}`}</span>
      </div>

      <DestinationStarRating
        ratingAvg={ratingScore}
        ratingCount={totalReviews}
        simplified={true}
        inverse={true}
        displayAvg={true}
      />
    </div>
  );

  const isFeatured = labelRibbon?.includes("FEATURED");

  return (
    <div className={clsx(classes.productHeader, "px-0 md:px-6 mx-auto w-full max-w-1320px md:mb-8 md:mt-4")}>
      {isDesktop && (
        <Breadcrumbs
          items={breadcrumbs}
          variant="productPage"
        />
      )}

      <section className="relative !p-0 overflow-hidden">
        <div className="hidden md:block">
          <h1 className="xl:text-2xl mb-3 text-28px font-bold leading-42px mt-4">{name}</h1>
          {productInfo}
        </div>
        <div>
          {shouldShowCashback ? (
            <div
              className="absolute z-10 flex items-center justify-center text-sm h-10 m-15px
              text-primary bg-white shadow-box text-left p-0.35rem rounded-md w-200px"
            >
              <Cashback />
            </div>
          ) : (
            <div />
          )}

          <div className="h-305px md:h-405px relative">
            <ImageGallery
              imagesGallery={{
                activeImages,
                name,
                iterable_key,
                productId,
                location,
                price,
                currencyCode,
                isDesktop,
              }}
            />

            <ImageGlider
              imagesGallery={{
                activeImages,
                name,
                iterable_key,
                productId,
                location,
                price,
                currencyCode,
                countDownLimit,
                isDesktop,
              }}
            />
          </div>
        </div>

        {!isDesktop && (
          <div className="title-section">
            <div className={`xs:inline-block md:hidden px-3 ${isFeatured ? "mt-8" : "mt-3"}`}>
              {isFeatured && (
                <ProductRibbon
                  labels={labelRibbon}
                  variation="page"
                />
              )}

              <h1 className="text-xl mb-3 sm:text-xl font-bold">{name}</h1>

              {productInfo}

              {subheader && <p className="mx-0 mt-4 mb-3 text-base">{subheader}</p>}
            </div>

            {icons?.length > 0 && (
              <div className="mt-10px">
                <ProductFacts icons={icons} />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductHeader;
