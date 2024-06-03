import { useMemo } from "react";
import { ProductImageFragment } from "@@/pages/Product/queries/product-queries.generated";

export const useMainAndOtherImages = (activeImages: ProductImageFragment[]) => {
  const mainImage = useMemo(() => {
    const hasMainImage = activeImages?.some((image) => image.isMainImage);

    if (hasMainImage) {
      return activeImages.find((image) => image.isMainImage);
    }

    return activeImages?.reduce((acc, image) => {
      if (!acc || image.position < acc.position) {
        return image;
      }
      return acc;
    }, null);
  }, [activeImages]);

  const otherImages = useMemo(() => {
    return activeImages?.filter((image) => image !== mainImage).slice(0, 2);
  }, [activeImages, mainImage]);

  return { mainImage, otherImages };
};
