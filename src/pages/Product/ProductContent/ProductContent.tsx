import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import find from "lodash/find";
import sortBy from "lodash/sortBy";
import dynamic from "next/dynamic";
import { getSelectedCurrency } from "@@/features/price/model";
import { getNextAvailableLabel } from "@@/pages/Product/utils";
import { useCategoryProducts, useProductActive, useProductAvailable } from "@@/pages/Product/hooks/hooks";
import { getDateFromNextAvailableDateString } from "@@/features/calendar/utils/nextAvailableDateUtil";

import { useServerContext } from "../../lib/ServerContextProvider";
import { useBreakpoints } from "@@/features/utils";

import {
  useBottomPriceVisibility,
  useCountdownVisibility,
  useTabsWrapperVisibility,
} from "@@/pages/Product/ProductContent/hooks/hooks";
import { useBookingFlow } from "@@/features/calendar/hooks/useBookingFlow";
import { usePriceData } from "@@/pages/Product/hooks/usePriceData";
import { ProductPageFragment } from "@@/pages/Product/queries/product-queries.generated";

import SignUpPopUp from "@@/features/signUpPopUp/SignUpPopUp";
import PopupProductInActive from "@@/pages/components/PopupProductInactive/PopupProductInactive";
import PickupLocationsCard from "@@/pages/Product/PickupLocationsCard";
import PartnerCard from "@@/pages/Product/PartnerCard";
import TourOptionsCard from "@@/pages/Product/TourOptionsCard";
import ReviewsSection from "../Reviews";
import ProductFacts from "./components/ProductFacts";
import ProductPricingWidget from "./components/ProductPricingWidget";
import ReadMoreSection from "./components/ReadMoreSection";
import PricingWidgetBottomMobile from "./components/PricingWidgetBottomMobile";
import { PaymentConfigurations } from "@@/pages/Product/util/paymentConfigurationUtil";
import TabsWrapper from "./components/TabsWrapper";
import CountDownTimer from "@@/features/countDown/components/CountDownTimer/CountDownTimer";
import StyledProductSection from "@@/pages/Product/ProductContent/StyledProductSection";
import classNames from "classnames";
import { FaGift, FaUserGroup } from "react-icons/fa6";
import Link from "next/link";
import clsx from "clsx";
import PopUpAsiaModal from "@@/pages/components/PopUpAsiaModal/PopUpAsiaModal";
import ItineraryCard from "../ItineraryCard";
import FAQCard from "../FAQCard";
import StyledProductCard from "@@/pages/Product/ProductContent/StyledProductCard";
import SkeletonPricingWidget from "./components/SkeletonPricingWidget";
import { useAuth } from "@@/pages/auth/AuthProvider";
import { getAvailableDateAndPrice } from "@@/pages/Product/util/availabilityApiUtil";
import {
  NextAvailablePriceAndDateDataFragment,
  useNextAvailableDateAndPriceQuery,
} from "@@/features/calendar/queries/availability-query.generated";

const AvailabilityCalendar = dynamic(
  () => import("@@/features/calendar/components/AvailabilityCalendar/AvailabilityCalendar"),
  { ssr: false },
);

const GroupDiscountModal = dynamic(() => import("@@/pages/components/GroupDiscountModal/GroupDiscountModal"), {
  ssr: false,
});

const TermsAndConditionsModal = dynamic(
  () => import("@@/pages/components/TermsAndConditionsModal/TermsAndConditionsModal"),
  {
    ssr: false,
  },
);

const priceFromFetchPeriodDays = process.env.PRICE_FROM_FETCH_PERIOD_DAYS
  ? Number(process.env.PRICE_FROM_FETCH_PERIOD_DAYS)
  : 30;

type NextAvailableDateAndPriceType = {
  hasOnlyOneVariant: boolean;
  hasTwoOrMoreVariantProducts: boolean;
  availableDateAndPrice: NextAvailablePriceAndDateDataFragment[];
};

const ProductContent: FC<{
  pageProps: ProductPageFragment;
  paymentConfigurations: PaymentConfigurations;
}> = ({
  pageProps: {
    product: {
      productId,
      status,
      title,
      address,
      bookingRequired,
      partner,
      shortDescription,
      fullDescription,
      exclusions,
      termsAndConditions,
      cancellationPolicy,
      supplierTermsAndConditions,
      benefits,
      videos,
      faqs,
      icons,
      itinerary,
      pickupDetails,
      travelInstructions,
      enquireOnly,
      uri,
      ratingScore,
      totalReviews,
      categories,
      legacy,
      variantProducts,
    },
  },
  paymentConfigurations,
}) => {
  const selectedCurrency = useSelector(getSelectedCurrency);
  const [calendarShown, setCalendarShown] = useState(false);
  const [isNextAvailableDateFetching, setIsNextAvailableDateFetching] = useState(true);

  const [groupDiscountModalShown, setGroupDiscountModalShown] = useState(false);
  const {
    query: { categoryOrSlug, slug },
  } = useRouter();
  const { lgUp: isDesktop, mdUp: isTablet } = useBreakpoints();
  const {
    siteConfig: { is_banner_active },
    enabledResProviders,
  } = useServerContext();

  const isBanner = is_banner_active ?? false;

  const { siteConfig, shouldShowPopUp, shouldShowReviewsIoSection } = useServerContext();

  const { mainCategoryUrl, mainCategoryName, bannerMainCategory, altTextImg } = useCategoryProducts(categories);

  const availabilityCardRef = useRef(null);

  const { iterable_key } = siteConfig ?? {};

  const bottomPriceShown = useBottomPriceVisibility();
  const { isAuthenticated } = useAuth();

  const {
    data: availableDateAndPrice = {},
    loading: nextAvailableDateFetching,
    error: errorNextvailableDateAndPrice,
  } = useNextAvailableDateAndPriceQuery({
    variables: {
      input: {
        productId,
        enabledResProviders,
        enquireOnly,
        forceAvailabilityV1: !!legacy?.forceAvailabilityV1,
        priceFromFetchPeriodDays: priceFromFetchPeriodDays,
      },
      targetCurrency: selectedCurrency ?? "AUD",
    },
    fetchPolicy: "cache-and-network",
    skip: !selectedCurrency || !isAuthenticated,
  });

  useEffect(() => {
    setIsNextAvailableDateFetching(nextAvailableDateFetching);
  }, [nextAvailableDateFetching]);

  const {
    product,
    priceData,
    priceFetching,
    isAvailabilityV2Enabled,
    productId: currentProductId,
    errors: priceDataErrors,
    paymentOptions,
  } = usePriceData(productId, legacy?.forceAvailabilityV1, uri?.url);

  const {
    hasOnlyOneVariant,
    hasTwoOrMoreVariantProducts,
    availableDateAndPrice: nextAvailableDateAndPriceFromResponse = [],
  } = (availableDateAndPrice?.nextAvailableDateAndPriceFrom ?? {}) as NextAvailableDateAndPriceType;

  const nextAvailableDateAndPriceFrom = getAvailableDateAndPrice({
    errorNextvailableDateAndPrice,
    product,
    nextAvailableDateAndPriceFrom: nextAvailableDateAndPriceFromResponse,
  });

  const { isNewBookingFlowEnabled } = useBookingFlow(isAvailabilityV2Enabled);

  const isProductNotAvailable = useProductAvailable(priceData);
  const isActive = useProductActive(status);
  const { tabsWrapperShown, tabsRef } = useTabsWrapperVisibility();

  const { countDownLimit } = legacy;
  const countDownVisible = useCountdownVisibility();

  const getUrl = useMemo(() => {
    return uri?.url.split("/").slice(0, -1).join("/");
  }, [uri]);

  const priceSortedVariantProducts = useMemo(() => {
    if (hasTwoOrMoreVariantProducts) {
      return sortBy(priceData?.variantProducts || [], [(o) => o?.legacy?.priceFrom?.amount]);
    }

    return [];
  }, [priceData, hasTwoOrMoreVariantProducts]);

  const navItems = [
    shortDescription?.text && { label: "Highlights", href: "highlights" },
    exclusions?.text && { label: "What's Excluded", href: "excluded" },
    benefits?.text && {
      label: "Why Do We Love This",
      href: "why-do-we-love-this",
    },
    { label: "What to Expect", href: "expectations" },
    hasTwoOrMoreVariantProducts && {
      label: "Check Tour Options",
      href: "booking-section",
    },
    itinerary?.itineraryItems?.length > 0 && {
      label: "Itinerary",
      href: "itinerary",
    },
    faqs?.length > 0 && { label: "FAQs", href: "faqs" },
    (termsAndConditions?.text || cancellationPolicy?.text || supplierTermsAndConditions?.text) && {
      label: "Policies",
      href: "policies",
    },
    pickupDetails?.length > 0 && {
      label: "Pickup Locations",
      href: "pickup-locations",
    },
    !!partner?.name &&
      legacy?.showMerchant && {
        label: "Tour Operator",
        href: "tour-operator",
      },
    { label: "Reviews", href: "reviews" },
  ].filter((i) => !!i);

  const reloadCalendar = () => {
    setCalendarShown(false);
    setTimeout(() => {
      setCalendarShown(true);
    }, 0);
  };

  const productPageRef: React.MutableRefObject<HTMLElement> = useRef(null);

  const scrollOffsetAnchor = classNames("", isBanner ? "scroll-mt-230px " : "scroll-mt-200px title-offset-no-banner");
  const cardTitleClasses = classNames(
    "relative",
    "before:content-[''] before:bg-transparent before:w-10px before:h-34px before:-left-25px",
    "before:absolute before:bg-primary before:rounded-tl-none",
    "before:rounded-br-100px before:rounded-tr-100px before:rounded-bl-none",
  );

  let productPriceAndAvailabilityCardClasses: string = "";
  if (isDesktop) {
    if (isBanner) {
      productPriceAndAvailabilityCardClasses = "sm:top-32 1140.98px:top-48 1149px:top-60";
    } else {
      productPriceAndAvailabilityCardClasses = "top-6.5rem 1140.98px:top-[10.5rem] 1149px:top-[13.5rem]";
    }
  } else {
    productPriceAndAvailabilityCardClasses = "m-0";
  }

  const nextAvailableDate = useMemo(() => {
    if (errorNextvailableDateAndPrice?.message && nextAvailableDateAndPriceFrom?.[0]?.nextAvailableDate === null) {
      return null;
    }

    if (
      !hasOnlyOneVariant &&
      !hasTwoOrMoreVariantProducts &&
      nextAvailableDateAndPriceFrom?.length === 1 &&
      nextAvailableDateAndPriceFrom?.[0]?.nextAvailableDate === undefined &&
      priceData?.nextAvailableDate
    ) {
      return priceData.nextAvailableDate;
    }

    const nextAvailableDateData = find(nextAvailableDateAndPriceFrom, (data) => {
      return data.productId === productId;
    });

    return nextAvailableDateData?.nextAvailableDate;
  }, [
    nextAvailableDateAndPriceFrom,
    productId,
    hasTwoOrMoreVariantProducts,
    hasOnlyOneVariant,
    priceData?.nextAvailableDate,
    errorNextvailableDateAndPrice?.message,
  ]);

  const priceFrom = useMemo(() => {
    const priceFromData = find(nextAvailableDateAndPriceFrom, (data) => {
      return data.productId === productId;
    });

    return priceFromData?.priceFrom;
  }, [nextAvailableDateAndPriceFrom, productId]);

  const priceFromAvailableAt = useMemo(() => {
    const priceFromData = find(nextAvailableDateAndPriceFrom, (data) => {
      return data.productId === productId;
    });

    return priceFromData?.priceFromAvailableAt;
  }, [nextAvailableDateAndPriceFrom, productId]);

  const noAvailabilityFoundAndInactive = useMemo(() => {
    return (
      (!nextAvailableDate && priceData?.availability?.availableDates?.length === 0 && !hasTwoOrMoreVariantProducts) ||
      !isActive
    );
  }, [priceData, nextAvailableDate]);

  useEffect(() => {
    if (priceDataErrors.length > 0) {
      console.error(priceDataErrors);
    }
  }, [priceDataErrors]);

  const discountAmount = useMemo(() => {
    const isProductHasDiscount = priceData?.discounts.length > 0;
    if (!isProductHasDiscount) {
      return null;
    }

    let discountAmount = priceData?.discounts[0]?.discountAmount;
    if (product?.legacy?.countDownLimit > 0) {
      discountAmount = {
        ...discountAmount,
        convertedAmount: product?.legacy.recommendedRetailPrice.convertedAmount - product?.priceFrom?.convertedAmount,
      };
    }
    return {
      discountAmount: discountAmount,
    };
  }, [priceData?.discounts, product]);

  return (
    <div className="px-0 md:px-6 mx-auto w-full max-w-1320px">
      {tabsWrapperShown && (
        <TabsWrapper
          tabsItem={{
            navItems,
            isBanner,
          }}
        />
      )}

      <StyledProductSection
        ref={productPageRef}
        id="product-page-content"
      >
        {calendarShown && (
          <AvailabilityCalendar
            productId={currentProductId}
            productName={title}
            nextAvailableDate={nextAvailableDate}
            parentRef={productPageRef}
            onClose={() => setCalendarShown(false)}
            onReload={reloadCalendar}
            discount={product?.discounts}
            priceFrom={priceFrom}
            priceFromAvailableAt={priceFromAvailableAt}
          />
        )}
        <section
          ref={tabsRef}
          className="md:grid-cols-3 grid grid-rows-1 gap-3 !pt-0"
        >
          <div className="order-1 md:order-2 col-span-2 md:col-span-3 lg:col-span-2 lg:order-1 pb-4">
            {isTablet && icons?.length > 0 && (
              <div>
                <ProductFacts
                  icons={icons}
                  className="p-3 rounded-xl shadow-box hidden md:block"
                />
              </div>
            )}

            {/* Subheader */}
            {legacy?.subheader && <p className="text-base mt-6 hidden md:block">{legacy?.subheader}</p>}

            {/* Highlights */}
            <StyledProductCard>
              {shortDescription?.text && (
                <>
                  <h2
                    className={`text-base sm:text-2xl font-bold ${scrollOffsetAnchor} heading mb-5`}
                    id="highlights"
                  >
                    {title} Highlights
                  </h2>
                  <div
                    className="mt-1 custom_editor"
                    dangerouslySetInnerHTML={{
                      __html: shortDescription.text,
                    }}
                  />
                </>
              )}

              {/* What's Excluded */}
              {exclusions?.text && (
                <>
                  <h2
                    className={clsx(
                      cardTitleClasses,
                      `mt-8 text-base sm:text-2xl font-bold ${scrollOffsetAnchor} heading mb-5`,
                    )}
                    id="excluded"
                  >
                    What&apos;s Excluded
                  </h2>
                  <div>
                    <ReadMoreSection content={exclusions?.text} />
                  </div>
                </>
              )}

              {/* Why Do We Love This */}
              {benefits?.text && (
                <>
                  <h2
                    className={clsx(
                      cardTitleClasses,
                      `mt-8 text-base sm:text-2xl font-bold ${scrollOffsetAnchor} heading mb-5`,
                    )}
                    id="why-do-we-love-this"
                  >
                    Why Do We Love This
                  </h2>
                  <div>
                    <ReadMoreSection content={benefits?.text} />
                  </div>
                </>
              )}

              {/* What to Expect */}
              <h2
                className={clsx(
                  cardTitleClasses,
                  `mt-8 text-base sm:text-2xl font-bold ${scrollOffsetAnchor} heading mb-5`,
                )}
                id="expectations"
              >
                What to Expect
              </h2>
              <div className="what-to-expect">
                {videos?.length > 0 &&
                  videos.map(({ url }, ind) => (
                    <iframe
                      key={`${url}-${ind}`}
                      width="100%"
                      height="400"
                      src={url}
                      title={`${title} video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  ))}
                {fullDescription?.text && <ReadMoreSection content={fullDescription.text} />}
              </div>
            </StyledProductCard>

            {/* Tour Option */}
            {hasTwoOrMoreVariantProducts && nextAvailableDate && (
              <TourOptionsCard
                products={priceSortedVariantProducts}
                hasVariantProducts={hasTwoOrMoreVariantProducts}
                enquireOnly={enquireOnly}
                isBanner={isBanner}
                nextAvailableDateAndPriceFrom={nextAvailableDateAndPriceFrom}
              />
            )}

            {/* Itinerary */}
            {itinerary?.itineraryItems?.length > 0 && (
              <StyledProductCard>
                <ItineraryCard
                  itinerary={itinerary}
                  isBanner={isBanner}
                />
              </StyledProductCard>
            )}

            {/* FAQs */}
            {faqs?.length > 0 && (
              <StyledProductCard>
                <FAQCard
                  isBanner={isBanner}
                  faqs={faqs}
                />
              </StyledProductCard>
            )}

            {/* Reviews.io */}
            {shouldShowReviewsIoSection && (
              <StyledProductCard>
                <h2
                  className={clsx(
                    cardTitleClasses,
                    `mt-8 text-base sm:text-2xl font-bold ${scrollOffsetAnchor} heading mb-5`,
                  )}
                  id="reviews"
                >
                  Reviews for {title}
                </h2>
                <div>
                  <ReviewsSection
                    averageRating={ratingScore}
                    reviewCount={totalReviews}
                    productId={productId}
                    isBanner={isBanner}
                  />
                </div>
              </StyledProductCard>
            )}

            {/* Terms and Conditions */}
            {(termsAndConditions?.text || cancellationPolicy?.text || supplierTermsAndConditions?.text) && (
              <StyledProductCard>
                <h2
                  className="mt-8 text-base sm:text-2xl font-bold heading mb-5"
                  style={{
                    scrollMarginTop: isBanner ? "230px" : "200px",
                  }}
                  id="policies"
                >
                  Policies
                </h2>
                {termsAndConditions?.text && (
                  <div className="card-body">
                    <div className="font-bold text-base mt-5 mb-2">Terms & Conditions:</div>
                    <ReadMoreSection content={termsAndConditions.text} />
                  </div>
                )}
                {cancellationPolicy?.text && (
                  <div className="card-body">
                    <div className="font-bold text-base mt-5 mb-2">Cancellation Policy:</div>
                    <ReadMoreSection content={cancellationPolicy.text} />
                  </div>
                )}
                {supplierTermsAndConditions?.text && <TermsAndConditionsModal text={supplierTermsAndConditions.text} />}
                <div className="card-body">
                  <div>
                    <br />
                    <p>
                      All customer cancellation & refund requests are also subject to our website’s own&nbsp;
                      <a
                        href="/refund-policy"
                        target="_blank"
                        className="link-primary"
                      >
                        refund conditions
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </StyledProductCard>
            )}

            {/* Pickup Location */}
            {!legacy?.hidePickupOnFrontend && pickupDetails?.length > 0 && (
              <PickupLocationsCard
                pickupData={{
                  travelInstructions,
                  pickupDetails,
                  variantProducts,
                  isBanner,
                }}
              />
            )}

            {/* Partner */}
            {!!partner?.name && legacy?.showMerchant && (
              <PartnerCard
                partner={partner}
                address={address?.address}
                isBanner={isBanner}
              />
            )}
          </div>

          <div className="order-2 md:order-1 col-span-2 md:col-span-3 lg:col-span-1 lg:order-2">
            <div
              className={clsx(
                productPriceAndAvailabilityCardClasses,
                "sticky z-10 bg-white rounded-lg overflow-hidden ",
              )}
            >
              {isTablet && countDownVisible && (
                <div className="">
                  <CountDownTimer {...{ countDownLimit, format: "simple-pages" }} />
                </div>
              )}
              <StyledProductCard
                className="bg-clip-border border-zinc-300 min-w-0 px-6 py-4 mb-0 leading-6 border border-solid hidden md:flex lg:block rounded-bl-lg rounded-br-lg"
                ref={availabilityCardRef}
                style={{
                  borderTopLeftRadius: countDownLimit ? 0 : "0.5rem",
                  borderTopRightRadius: countDownLimit ? 0 : "0.5rem",
                }}
              >
                {isNextAvailableDateFetching || !priceFrom ? (
                  <SkeletonPricingWidget
                    enquireOnly={enquireOnly}
                    bookingRequired={bookingRequired}
                    bookingUrl={legacy?.bookingUrl}
                    hasVariantProducts={hasTwoOrMoreVariantProducts}
                    name={title}
                    status={status}
                    data-testid="availability-card-spinner"
                  />
                ) : (
                  <ProductPricingWidget
                    pricingWidget={{
                      noAvailabilityFoundAndInactive,
                      isAvailabilityV2Enabled,
                      isHasNextAvailableDates: !!nextAvailableDate,
                      getNextAvailableLabel,
                      paymentConfigurations,
                      hasVariantProducts: hasTwoOrMoreVariantProducts,
                      nextAvailableDate: getDateFromNextAvailableDateString(nextAvailableDate),
                      setCalendarShown,
                      bookingRequired,
                      discountAmount,
                      paymentOptions,
                      priceFetching: isNextAvailableDateFetching,
                      enquireOnly,
                      priceFrom,
                      priceData,
                      legacy,
                      status,
                      getUrl,
                      title,
                      uri,
                    }}
                  />
                )}
              </StyledProductCard>

              <div className="flex flex-wrap items-center justify-center gap-5 mx-0 my-5 leading-6 text-black">
                {!!priceData?.legacy?.openDatedBooking && (
                  <Link
                    className="flex items-center gap-6px justify-center hover:text-primary"
                    href={`/${isNewBookingFlowEnabled ? "bookv2" : "book"}/${
                      slug || categoryOrSlug
                    }?gift=true&id=${productId}`}
                    id="BuyGiftClick"
                    rel="nofollow"
                  >
                    <FaGift className="w-5 h-5 text-primary" />
                    Buy as a Gift
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setGroupDiscountModalShown(true)}
                  id="GroupDiscountClick"
                  className="flex items-center gap-6px justify-center hover:text-primary"
                >
                  <FaUserGroup className="w-5 h-5 text-primary" />
                  Group discount
                </button>
              </div>
            </div>
          </div>
        </section>

        {shouldShowPopUp && priceData && !priceFetching && <PopUpAsiaModal parentRef={productPageRef} />}

        {!isTablet ? (
          <PricingWidgetBottomMobile
            pricingWidget={{
              isAvailabilityV2Enabled,
              paymentConfigurations,
              hasVariantProducts: hasTwoOrMoreVariantProducts,
              isHasNextAvailableDates: !!nextAvailableDate,
              nextAvailableDate: getDateFromNextAvailableDateString(nextAvailableDate),
              setCalendarShown,
              bottomPriceShown,
              bookingRequired,
              shouldShowPopUp,
              productPageRef,
              priceFetching: isNextAvailableDateFetching,
              iterable_key,
              enquireOnly,
              priceData,
              priceFrom,
              status,
              legacy,
              title,
              uri,
            }}
          />
        ) : (
          shouldShowPopUp &&
          iterable_key &&
          priceData &&
          !priceFetching && (
            <div className="fixed bottom-0 left-0 z-50">
              <SignUpPopUp
                parentRef={productPageRef}
                iterable_key={iterable_key}
              />
            </div>
          )
        )}

        {groupDiscountModalShown && (
          <GroupDiscountModal
            name={title}
            onClose={() => setGroupDiscountModalShown(false)}
          />
        )}
      </StyledProductSection>

      <PopupProductInActive
        show={!isActive || isProductNotAvailable}
        bannerMainCategory={bannerMainCategory}
        destinationLocation={uri?.city}
        categoryName={mainCategoryName}
        categoryUrl={mainCategoryUrl}
        destinationLink={getUrl}
        altImage={altTextImg}
      />
    </div>
  );
};

export default ProductContent;
