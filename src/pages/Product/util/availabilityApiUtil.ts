import { ProductDataQuery, ProductQuery, ProductFragment } from "@@/pages/Product/queries/product-queries.generated";
import { NextAvailablePriceAndDateDataFragment } from "@@/features/calendar/queries/availability-query.generated";
import { ApolloError } from "@apollo/client";

export const availabilityApiUtil = (
  productId: string,
  defaultProductId: string,
  priceData: ProductQuery,
  productData: ProductDataQuery
) => {
  const isSkipAvailabilityCall = () => {
    const getVariantProducts = () => {
      if (priceData?.product?.variantProducts?.length > 0) {
        return priceData.product.variantProducts;
      }

      if (productData?.data?.summary?.variantSummaries?.length > 0) {
        return productData.data.summary.variantSummaries;
      }

      return [];
    };

    const variantProducts = getVariantProducts();
    const isDefaultProductIdHasBeenChanged = defaultProductId !== productId;

    let skipAvailabilityCall: boolean;
    if (isDefaultProductIdHasBeenChanged) {
      skipAvailabilityCall = false;
    } else {
      skipAvailabilityCall = variantProducts.length > 0;
    }

    return skipAvailabilityCall;
  };

  return {
    isSkipAvailabilityCall,
  };
};

// Handling data error, such as price not entered in the product through admin panel
export const getAvailableDateAndPrice = ({
  nextAvailableDateAndPriceFrom,
  errorNextvailableDateAndPrice,
  product,
}: {
  nextAvailableDateAndPriceFrom: NextAvailablePriceAndDateDataFragment[];
  errorNextvailableDateAndPrice: ApolloError;
  product: ProductFragment;
}): NextAvailablePriceAndDateDataFragment[] => {
  if (errorNextvailableDateAndPrice?.message) {
    return nextAvailableDateAndPriceFrom?.map((nextAvailableDate) => ({
      productId: nextAvailableDate.productId,
      nextAvailableDate: null,
      priceFromAvailableAt: null,
      priceFrom: {
        amount: product?.priceFrom?.amount ?? 0,
        currencyCode: product?.priceFrom?.currencyCode,
        convertedAmount: product?.priceFrom?.convertedAmount ?? 0,
      },
    }));
  }
  return nextAvailableDateAndPriceFrom;
};
