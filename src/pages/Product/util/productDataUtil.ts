import type {
  ProductDiscountAmountFragment,
  ProductFragment,
  ProductQuery,
} from "@@/pages/Product/queries/product-queries.generated";
import type { ProductDataQuery } from "../queries/product-queries.generated";
import type { ApolloError, LazyQueryExecFunction, QueryResult } from "@apollo/client";
import type { Exact } from "@@/types.generated";
import { PaymentOptionsFragment } from "@@/pages/bookv2/hooks/usePaymentOptions.generated";

const CACHE_AND_NETWORK_FETCH_POLICY = "cache-and-network";

type ProductQueryInput = {
  productId: string;
  targetCurrency: string;
};
type ProductDataQueryInput = {
  productId: string;
  targetCurrency?: string;
};
type ProductAndDataInput = {
  productId: string;
  selectedCurrency: string;
  isAuthenticated: boolean;
  getProductData: LazyQueryExecFunction<ProductDataQuery, Exact<ProductDataQueryInput>>;
  getProduct: LazyQueryExecFunction<ProductQuery, Exact<ProductQueryInput>>;
  getPaymentOptions?: () => Promise<PaymentOptionsFragment>;
};
type ProductAndDataOutPut = {
  productDataResult: ProductDataQuery;
  productResult: ProductQuery;
  paymentOptionsResult?: PaymentOptionsFragment;
  productDataError: ApolloError;
  priceDataError: ApolloError;
};
export const getProductAndData = async ({
  productId,
  selectedCurrency,
  isAuthenticated,
  getProductData,
  getProduct,
  getPaymentOptions,
}: ProductAndDataInput): Promise<ProductAndDataOutPut> => {
  const productVariables = {
    productId,
    targetCurrency: selectedCurrency,
  };
  const promises = [
    getPaymentOptions?.(),
    getProduct({
      fetchPolicy: CACHE_AND_NETWORK_FETCH_POLICY,
      variables: productVariables,
      ssr: false,
    }),
    getProductData({
      fetchPolicy: CACHE_AND_NETWORK_FETCH_POLICY,
      variables: productVariables,
    }),
  ];
  if (!isAuthenticated) {
    // Don't call getProductData, if not authenticated
    promises.pop();
  }
  const results = await Promise.allSettled(promises);
  const [paymentsOptions = {}, product = {}, productData = {}] = results.map((p) =>
    p.status === "fulfilled" ? p.value : { data: null, errror: null },
  );
  const { data: productDataQueryResult, error: productDataError } = productData as QueryResult<
    ProductDataQuery,
    Exact<ProductDataQueryInput>
  >;
  const { data: productQueryResult, error: priceDataError } = product as QueryResult<
    ProductQuery,
    Exact<ProductQueryInput>
  >;
  return {
    paymentOptionsResult: paymentsOptions ? (paymentsOptions as PaymentOptionsFragment) : null,
    productDataResult: productDataQueryResult as ProductDataQuery,
    productResult: productQueryResult as ProductQuery,
    productDataError,
    priceDataError,
  };
};

export const getProductSaveAmount = (
  discounts: ProductDiscountAmountFragment[],
  product: ProductFragment,
): ProductDiscountAmountFragment => {
  const isProductHasDiscount = discounts?.length > 0;

  if (!isProductHasDiscount) {
    return null;
  }

  let discountAmount = discounts[0]?.discountAmount;
  if (product?.legacy?.countDownLimit > 0) {
    discountAmount = {
      ...discountAmount,
      convertedAmount: product?.legacy.recommendedRetailPrice.convertedAmount - product?.priceFrom?.convertedAmount,
    };
  }

  return {
    discountAmount: discountAmount,
  };
};
