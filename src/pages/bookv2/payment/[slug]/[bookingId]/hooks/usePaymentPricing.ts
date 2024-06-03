import { gql } from "graphql-tag";

import {
  BookingStatus,
  usePaymentPricingQuery,
} from "./usePaymentPricing.generated";

gql`
  query PaymentPricing($bookingUid: String) {
    bookingPricing(bookingUid: $bookingUid) {
      id
      totalOrderPrice
      currency
    }
  }
`;

const usePaymentPricing = ({
  bookingUid,
  status,
}: {
  bookingUid: string;
  status: BookingStatus;
}) => {
  const { data: paymentPricingData } = usePaymentPricingQuery({
    variables: {
      bookingUid: bookingUid,
    },
    skip: !bookingUid || !status,
  });

  const totalPrice = paymentPricingData?.bookingPricing.totalOrderPrice;
  const currency = paymentPricingData?.bookingPricing.currency;

  return {
    totalPrice,
    currency,
  };
};

export default usePaymentPricing;
