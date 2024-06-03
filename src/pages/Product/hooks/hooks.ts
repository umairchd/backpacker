import { useEffect, useMemo, useState } from "react";
import { AvailabilityFragment } from "@@/features/calendar/queries/availability-query.generated";
import { ProductFragment } from "@@/pages/Product/queries/product-queries.generated";

export const useReviewNuggets = (productId) => {
  interface NuggetData {
    data: [
      {
        rating: string;
        author: string;
        text: string;
      }
    ];
  }
  const [nuggets, setNuggets] = useState<NuggetData>();
  useEffect(() => {
    fetch(
      `https://api.reviews.io/review-nuggets/data?store=backpackerdealscom&sku[]=${productId}&types=product_review`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setNuggets(json);
        return json;
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return {
    nuggetData: nuggets?.data,
  };
};

export const useProductActive = (status: string): boolean => {
  return status === "ACTIVE";
};

export const useProductAvailable = (
  priceData: ProductFragment & { availability?: AvailabilityFragment }
) => {
  return (
    !priceData?.enquireOnly &&
    priceData?.availability?.availableDates?.length === 0
  );
};

export const useCategoryProducts = (categories) => {
  interface Category {
    image?: {
      banner?: string;
      altText?: string;
    };
    name?: string;
    uniqueName?: string;
  }

  const mainCategory = useMemo(
    () => categories?.find((category) => category.isMainCategory),
    [categories]
  );

  const defaultImage =
    "https://assets.backpackerdeals.com/uploads/content/og-image-default.jpg";

  const category: Category = mainCategory?.category ?? {};

  return {
    bannerMainCategory: category?.image?.banner ?? defaultImage,
    altTextImg: category?.image?.altText ?? category?.name,
    mainCategoryName: category?.name,
    mainCategoryUrl: category?.uniqueName,
  };
};
