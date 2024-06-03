import { format, isToday, isTomorrow } from "date-fns";
import dayjs from "dayjs";
import sortBy from "lodash/sortBy";

import {
  AvailabilityFragment,
  FareTypeFragment,
} from "@@/features/calendar/queries/availability-query.generated";
import { BpdFareType } from "@@/types.generated";
import { formatPrice } from "@@/pages/components/PriceWidget/utils";
import {
  FareTypeEnum,
  ProductPageFragment,
  ProductFragment,
} from "@@/pages/Product/queries/product-queries.generated";
import { getDateFromNextAvailableDateString } from "@@/features/calendar/utils/nextAvailableDateUtil";

export const getNextAvailableLabel = (dateString: string): string | null => {
  const nextAvailableDateString =
    getDateFromNextAvailableDateString(dateString);

  if (nextAvailableDateString) {
    const date = new Date(nextAvailableDateString);

    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "dd MMM yyyy");
    }
  }

  return null;
};

const getConvertedFareTypeData = (
  fareType: FareTypeFragment,
  priceData: ProductFragment & { availability?: AvailabilityFragment }
): {
  displayName: string;
  value: number;
  originalValue: number;
  bpdFareType: string;
  resSystemFareTypeId?: string;
  id: number;
} => {
  return {
    displayName: fareType.displayName || fareType.originalName,
    value:
      priceData?.legacy?.displayPrice?.childPrice?.price?.convertedAmount || 0,
    originalValue:
      priceData?.legacy?.displayPrice?.childPrice?.price?.amount || 0,
    bpdFareType: fareType.bpdFareType,
    resSystemFareTypeId: fareType.resSystemFareTypeId,
    id: fareType.id,
  };
};

export interface FareTypePrice {
  id: number;
  displayName: string;
  value: number;
  originalValue: number;
  bpdFareType: string;
  resSystemFareTypeId?: string;
}

export const getFareTypesPrices = (
  priceData: ProductFragment & { availability?: AvailabilityFragment },
  fareTypes: FareTypeFragment[],
  returnAdultFt?: boolean
): FareTypePrice[] => {
  const prices = [];

  if (!priceData) {
    return prices;
  }

  if (fareTypes) {
    const priceArr: {
      displayName: string;
      value: number;
      originalValue: number;
      bpdFareType: string;
      resSystemFareTypeId?: string;
      id: number;
    }[] = [];
    const displayedFareTypes = fareTypes.filter(
      (i) => i.bpdFareType !== null && i.bpdFareType !== BpdFareType.Undefined
    );

    const adultFt = displayedFareTypes.find(
      (ft) => ft.bpdFareType === BpdFareType.Adult
    );
    const childFt = displayedFareTypes.find(
      (ft) => ft.bpdFareType === BpdFareType.Child
    );
    const familyFt = displayedFareTypes.find(
      (ft) => ft.bpdFareType === BpdFareType.Family
    );

    [returnAdultFt && adultFt, childFt, familyFt]
      .filter((ft) => !!ft)
      .forEach((ft) => {
        priceArr.push(getConvertedFareTypeData(ft, priceData));
      });

    sortBy(priceArr, ["value"]);

    return priceArr.filter((p) => p.value > 0);
  } else {
    const displayedFareTypes = [
      {
        type: FareTypeEnum.Child,
        price: priceData?.legacy?.displayPrice?.childPrice?.price,
      },
      {
        type: FareTypeEnum.Family,
        price: priceData?.legacy?.displayPrice?.familyPrice?.price,
      },
    ];

    displayedFareTypes.forEach((ft, ind) => {
      const priceArr: {
        displayName: string;
        value: number;
        originalValue: number;
        bpdFareType: string;
      }[] = [];

      priceData.availability?.availableDates
        .filter((date) => date.slots.length > 0)
        .map((date) => date.slots)
        .flat()
        .forEach((slot) => {
          const filteredPrices = slot.prices.filter(
            (price) =>
              price.fareType?.typeName === ft.type &&
              price.__typename === "TravelloPrice"
          );

          if (filteredPrices[0]) {
            priceArr.push({
              value: ft.price?.convertedAmount || 0,
              originalValue: ft.price?.amount || 0,
              displayName: filteredPrices[0].fareType.displayName,
              bpdFareType: filteredPrices[0].fareType.typeName,
            });
          }
        });

      sortBy(priceArr, ["value"]);

      if (priceArr[0]) {
        prices[ind] = priceArr[0];
      }
    });

    return prices;
  }
};

export const getLMDSavings = (
  availability: AvailabilityFragment,
  finalPrice
) => {
  const lmdSlot = availability?.availableDates
    .find((d) => {
      return d.slots.some((s) => s.isLastMinute);
    })
    ?.slots.find((s) => s.isLastMinute);

  if (lmdSlot && finalPrice) {
    return (
      lmdSlot.prices.find((p) => p.__typename === "RecommendedRetailPrice")
        ?.value?.convertedAmount - finalPrice
    );
  }

  return 0;
};

export const getSchemaOrg = (
  data: ProductPageFragment,
  channelName: string,
  selectedCurrency: string,
  amount: number | null
) => {
  const product = data.product;
  const images = product.images?.productImages || [];
  const mainImage =
    images.find(({ isMainImage }) => !!isMainImage) || images[0];
  const currency = selectedCurrency ?? product.legacy?.priceFrom?.currencyCode;
  const price = formatPrice(
    amount || product.legacy.displayPrice?.adultPrice?.price?.amount,
    selectedCurrency,
    true
  );

  const result = {
    "@context": "https://schema.org/",
    "@type": "Product",
    sku: product.productId,
    mpn: product.productId,
    name: product?.title,
    image: mainImage?.image.top800 || "",
    description: product.shortDescription?.text,
    brand: {
      "@type": "Brand",
      name: channelName,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: product?.partner?.name || "Backpackerdeals",
      },
      priceValidUntil: "2030-01-01",
      url: product?.uri?.url,
    },
    review:
      product.recentReviews?.map((r) => ({
        "@type": "Review",
        datePublished: dayjs(r.reviewCreatedAt).format("YYYY-MM-DD"),
        description: r.text,
        name: r.title,
        reviewRating: {
          "@type": "Rating",
          bestRating: 5,
          ratingValue: r.ratingScore,
          worstRating: 1,
        },
        author: {
          "@type": "Person",
          name: r.userName,
        },
      })) || [],
  };

  if (product.totalReviews > 0) {
    result["aggregateRating"] = {
      ratingValue: product.ratingScore || 0,
      reviewCount: product.totalReviews || 0,
      worstRating: 1,
      bestRating: 5,
    };
  }

  return JSON.stringify(result);
};

export const getVideoSchemaOrg = (
  data: ProductPageFragment,
  host: string,
  channelName: string,
  channelLogo: string
) => {
  const product = data.product;
  if (!product.videos || product.videos.length <= 0) {
    return null;
  }

  const images = product.images?.productImages || [];
  const mainImage =
    images.find(({ isMainImage }) => !!isMainImage) || images[0];
  const video = product.videos[0];

  const result = {
    "@context": "https://schema.org/",
    "@type": "VideoObject",
    thumbnailurl: mainImage?.image.top800 || "",
    name: product?.title,
    url: video.url,
    "@id": product?.uri?.slug,
    description: product.shortDescription.text,
    datePublished: dayjs(product?.legacy?.updatedAt).format("YYYY-MM-DD"),
    uploadDate: dayjs(product?.legacy?.updatedAt).format("YYYY-MM-DD"),
    author: {
      "@type": "Organization",
      name: channelName,
      "@id": host,
      Logo: {
        "@type": "ImageObject",
        url: channelLogo,
        Width: 288,
        height: 288,
      },
    },
  };

  return JSON.stringify(result);
};
