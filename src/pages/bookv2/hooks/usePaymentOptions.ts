import { gql } from "graphql-tag";

import {
  type ProductPaymentOptionsQuery,
  PaymentOptionsFragment,
  useProductPaymentOptionsQuery,
} from "./usePaymentOptions.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

gql`
  fragment PaymentOptions on BPD_PaymentOptions {
    laybuy
    braintree
    afterpay {
      merchant_id
      region
      order_minimum
      order_maximum
    }
  }

  query ProductPaymentOptions($host: String!, $pathname: String!) {
    bpd_page(host: $host, pathname: $pathname) {
      id
      ... on BPD_ProductPage {
        paymentOptions {
          ...PaymentOptions
        }
      }
    }
  }
`;

export const getPaymentOptionsResults = (productData: ProductPaymentOptionsQuery) => {
  const isBpdPageDataExists = !!productData?.bpd_page;
  return isBpdPageDataExists && productData?.bpd_page["paymentOptions"]
    ? (productData?.bpd_page["paymentOptions"] as PaymentOptionsFragment)
    : null;
};

const usePaymentOptions = (pathname: string): PaymentOptionsFragment => {
  const { host } = useServerContext();

  const { data: productData } = useProductPaymentOptionsQuery({
    variables: {
      host,
      pathname,
    },
    skip: !pathname,
    ssr: false,
  });

  return getPaymentOptionsResults(productData);
};

export default usePaymentOptions;
