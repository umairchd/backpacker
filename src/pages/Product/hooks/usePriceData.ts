import {
  AvailabilityFragment,
  FareTypeFragment,
  useAvailabilityV1Query,
  useAvailabilityV2Query,
} from "@@/features/calendar/queries/availability-query.generated";
import {
  ProductDataQuery,
  ProductFragment,
  ProductQuery,
  useProductDataLazyQuery,
  useProductLazyQuery,
  VariantProductFragment,
  AvailabilityDataFilter,
} from "@@/pages/Product/queries/product-queries.generated";
import { ApolloError } from "@apollo/client";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useAuth } from "@@/pages/auth/AuthProvider";
import { useSelector } from "react-redux";
import { getSelectedCurrency } from "@@/features/price/model";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import sortBy from "lodash/sortBy";
import { useBookingFlow } from "@@/features/calendar/hooks/useBookingFlow";
import { FareTypeEnum, ProductDataPayload } from "@@/types.generated";
import compact from "lodash/compact";
import { convertAvailabilityV2 } from "@@/features/calendar/utils/availability";
import { getLMDSavings } from "@@/pages/Product/utils";
import { availabilityApiUtil } from "@@/pages/Product/util/availabilityApiUtil";
import countBy from "lodash/countBy";
import { getNextAvailableDateFromAvailableSlotsV1 } from "@@/features/calendar/utils/nextAvailableDateV1";
import { getProductAndData } from "@@/pages/Product/util/productDataUtil";
import {
  PaymentOptionsFragment,
  useProductPaymentOptionsLazyQuery,
} from "@@/pages/bookv2/hooks/usePaymentOptions.generated";
import { getPaymentOptionsResults } from "@@/pages/bookv2/hooks/usePaymentOptions";

export type PriceData = ProductFragment & {
  availability?: AvailabilityFragment;
};
export const usePriceData = (
  productId: string,
  forceAvailabilityV1?: boolean,
  paymentPathName?: string,
): {
  product: ProductFragment;
  priceData: PriceData;
  fareTypes: FareTypeFragment[];
  priceFetching: boolean;
  isAvailabilityV2Enabled: boolean;
  productId: string;
  displayedFareTypes: string[];
  productData: ProductDataPayload;
  errors: ApolloError[];
  paymentOptions?: PaymentOptionsFragment;
} => {
  const { isAuthenticated } = useAuth();
  const selectedCurrency = useSelector(getSelectedCurrency);
  const { enabledResProviders } = useServerContext();
  const [skipAvailabilityCall, setSkipAvailabilityCall] = useState(true);

  const currentDate = dayjs(new Date()).startOf("hour").format();
  const datesToFetch = new Array(32)
    .fill(null)
    .map((_, ind) => dayjs(currentDate).add(ind, "days").format("YYYY-MM-DD"));

  const [productDataQueryResult, setProductDataQueryResult] = useState<ProductDataQuery>(null);
  const [productQueryResult, setProductQueryResult] = useState<ProductQuery>(null);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsFragment>(null);
  const [productErrors, setProductErrors] = useState<ApolloError[]>([]);
  const [getProductData] = useProductDataLazyQuery();
  const [getProduct] = useProductLazyQuery();

  const { host } = useServerContext();
  const [getPayment] = useProductPaymentOptionsLazyQuery();

  const getPaymentOptions = useCallback(async () => {
    if (!paymentPathName) {
      return null;
    }
    const { data: productData } = await getPayment({
      variables: {
        host,
        pathname: paymentPathName,
      },
      ssr: false,
    });
    return getPaymentOptionsResults(productData);
  }, [getPayment, host, paymentPathName]);

  useEffect(() => {
    const paymentOpt = paymentPathName ? getPaymentOptions : () => Promise.resolve(null);
    const getData = async () => {
      if (selectedCurrency) {
        const { productDataResult, productResult, paymentOptionsResult, productDataError, priceDataError } =
          await getProductAndData({
            productId,
            selectedCurrency,
            isAuthenticated,
            getProductData,
            getProduct,
            getPaymentOptions: paymentOpt,
          });

        setProductDataQueryResult(productDataResult);
        setProductQueryResult(productResult);
        setPaymentOptions(paymentOptionsResult);
        setProductErrors((e) => compact([...e, priceDataError, productDataError]));
      }
    };

    getData();
  }, [getProductData, getProduct, getPaymentOptions, productId, selectedCurrency, isAuthenticated, paymentPathName]);

  const hasVariantProducts = useMemo(() => {
    return productQueryResult && productQueryResult.product?.variantProducts?.length > 0;
  }, [productQueryResult]);

  //@todo use summary variant
  //@todo do this in ANP ??
  const defaultProductId = useMemo(() => {
    if (hasVariantProducts) {
      const defaultProduct = productQueryResult
        ? (sortBy(productQueryResult.product?.variantProducts, ["priceFrom.amount"])[0] as VariantProductFragment)
        : null;

      return defaultProduct ? defaultProduct.productId : productId;
    }

    return productId;
  }, [productId, productQueryResult, hasVariantProducts]);

  const variantResSystemType = useMemo(() => {
    if (!productQueryResult?.product?.variantProducts) {
      return null;
    }

    const variantResSystemType = productQueryResult?.product?.variantProducts.map(
      (variantProduct) => variantProduct.resSystemType,
    );
    const variantResSystemTypeNumber = countBy(variantResSystemType);

    let maxNumber = 0;
    let mostVariantResSystemType: string;
    for (const variantResSystemTypeNumberKey in variantResSystemTypeNumber) {
      if (variantResSystemTypeNumber[variantResSystemTypeNumberKey] > maxNumber) {
        maxNumber = variantResSystemTypeNumber[variantResSystemTypeNumberKey];
        mostVariantResSystemType = variantResSystemTypeNumberKey.toUpperCase();
      }
    }

    return mostVariantResSystemType;
  }, [productQueryResult]);

  const isAvailabilityV2Enabled = useMemo(() => {
    const resSystemType = productQueryResult?.product?.resSystemType?.toUpperCase();
    const resProviderEnabled = enabledResProviders?.includes(variantResSystemType || resSystemType);

    return !forceAvailabilityV1 && isAuthenticated && resProviderEnabled;
  }, [productQueryResult, isAuthenticated, enabledResProviders, forceAvailabilityV1, variantResSystemType]);

  const { isNewBookingFlowEnabled } = useBookingFlow(isAvailabilityV2Enabled);

  const availabilityV1Input = {
    productId: defaultProductId,
    startDate: currentDate,
    targetCurrency: selectedCurrency,
    days: 32,
  };

  const startDate = useMemo(() => {
    let startDate: string = currentDate;

    if (productQueryResult?.product?.nextAvailableDate) {
      const nextAvailDate = dayjs(productQueryResult?.product?.nextAvailableDate);
      if (dayjs(currentDate) < nextAvailDate) {
        startDate = nextAvailDate.startOf("hour").format();
      }
    }

    return startDate;
  }, [productQueryResult]);

  const endDate = useMemo(() => {
    return dayjs(startDate).add(32, "days").format();
  }, [startDate]);

  const availabilityV2Input: AvailabilityDataFilter = useMemo(() => {
    return {
      productId: defaultProductId,
      startDate: startDate,
      ignoreCache: false,
      endDate: endDate,
    };
  }, [defaultProductId, startDate, endDate]);

  useEffect(() => {
    const { isSkipAvailabilityCall } = availabilityApiUtil(
      productId,
      defaultProductId,
      productQueryResult,
      productDataQueryResult,
    );

    setSkipAvailabilityCall(isSkipAvailabilityCall());
  }, [productId, defaultProductId, productQueryResult, productDataQueryResult]);

  if (defaultProductId !== productId) {
    availabilityV2Input.parentProductId = productId;
  }

  const {
    data: availabilityV1,
    loading: availabilityV1Fetching,
    error: availabilityV1Error,
  } = useAvailabilityV1Query({
    fetchPolicy: "cache-and-network",
    variables: availabilityV1Input,
    skip:
      !selectedCurrency ||
      isAvailabilityV2Enabled ||
      !productDataQueryResult ||
      !productQueryResult ||
      productQueryResult?.product?.enquireOnly ||
      skipAvailabilityCall,
    ssr: false,
  });

  const {
    data: availabilityV2,
    loading: availabilityV2Fetching,
    error: availabilityV2Error,
  } = useAvailabilityV2Query({
    fetchPolicy: "cache-and-network",
    variables: {
      input: availabilityV2Input,
      targetCurrency: selectedCurrency,
      fareTypesFilter: {
        showHidden: false,
        productId: defaultProductId,
      },
    },
    skip:
      !selectedCurrency ||
      !isAvailabilityV2Enabled ||
      !productDataQueryResult ||
      !productQueryResult ||
      productQueryResult?.product?.enquireOnly ||
      skipAvailabilityCall,
    ssr: false,
  });

  const displayedFareTypes = useMemo(() => {
    if (availabilityV2?.fareType?.length > 0) {
      return availabilityV2.fareType.map((i) => i.resSystemFareTypeId);
    }

    return !isAvailabilityV2Enabled && [FareTypeEnum.Adult, FareTypeEnum.Child, FareTypeEnum.Family];
  }, [availabilityV2, isAvailabilityV2Enabled]);

  const priceFetching = availabilityV1Fetching || availabilityV2Fetching;

  const errors = compact([...productErrors, availabilityV1Error, availabilityV2Error]);

  if (productQueryResult && availabilityV2) {
    const convertedData = convertAvailabilityV2(
      productQueryResult.product,
      availabilityV2,
      isNewBookingFlowEnabled,
      datesToFetch,
    );

    return {
      product: productQueryResult.product,
      priceData: convertedData
        ? {
            ...convertedData,
            discounts: convertedData.discounts,
          }
        : null,
      paymentOptions,
      priceFetching,
      fareTypes: availabilityV2?.fareType,
      isAvailabilityV2Enabled,
      productId: defaultProductId,
      displayedFareTypes,
      productData: productDataQueryResult.data,
      errors,
    };
  }

  /** Start from this line, it will use the result of the Availability V1 **/
  const nextAvailableDateV1 = getNextAvailableDateFromAvailableSlotsV1(
    productQueryResult?.product,
    availabilityV1?.product?.availability?.availableDates,
  );

  const priceDataResult = productQueryResult?.product
    ? {
        ...productQueryResult.product,
        nextAvailableDate: nextAvailableDateV1,
        availability: {
          ...availabilityV1?.product?.availability,
          nextAvailableDate: nextAvailableDateV1,
        },
        discounts: productQueryResult?.product?.discounts,
      }
    : null;

  const adultPrice = priceDataResult?.legacy?.displayPrice?.adultPrice?.price;
  const totalSavings = getLMDSavings(
    availabilityV1?.product?.availability, //@todo how to switch to V2 ?
    adultPrice?.convertedAmount,
  );

  if (totalSavings > 0) {
    priceDataResult.discounts = [
      {
        discountAmount: {
          currencyCode: adultPrice?.currencyCode,
          convertedAmount: totalSavings,
        },
      },
    ];
  }

  return {
    product: productQueryResult?.product,
    priceData: priceDataResult,
    fareTypes: availabilityV2?.fareType,
    paymentOptions,
    priceFetching,
    isAvailabilityV2Enabled,
    displayedFareTypes,
    productId: defaultProductId,
    productData: productDataQueryResult?.data,
    errors,
  };
};
