import { fetch } from "@@/pages/lib/serverUtils";
import { Bpd_Afterpay } from "@@/types.generated";

export type PaymentConfigurations = {
  afterpay: Bpd_Afterpay;
};

export const getPaymentConfigurations = async (channelKey: string) => {
  const response = await fetch(
    `/api/next/afterpay/config?channel=${channelKey}`
  );
  const afterpayConfig = await response.json();

  return {
    afterpay: {
      ...afterpayConfig,
    },
  } as PaymentConfigurations;
};
