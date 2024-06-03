import { Buffer } from "buffer";
import env from "@@/env";
import { Bpd_Afterpay } from "@@/types.generated";

interface AfterpayEnvConfig {
  enabled: boolean;
  region: string;
  merchantId: string;
  merchantKey: string;
}

interface AfterpayAPIConfigResponse {
  maximumAmount: {
    amount: string;
    currency: string;
  };
}

const { afterpay } = env;

const getAfterpayConfig = (channelKey: string): AfterpayEnvConfig => {
  const configs = JSON.parse(afterpay.configs);
  return (configs[channelKey] as AfterpayEnvConfig) ?? null;
};

export default async function handler(req, res) {
  const query = req.query;
  const { channel } = query;

  const config = getAfterpayConfig(channel);

  if (!config) {
    return res.status(404).json({
      message: `Afterpay config could not be found for channel: ${channel}`,
    });
  }

  const auth = Buffer.from(
    `${config.merchantId}:${config.merchantKey}`
  ).toString("base64");

  const response = await fetch(`${afterpay.baseUrl}/configuration`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const afterpayConfig = (await response.json()) as AfterpayAPIConfigResponse;

  return res.status(200).json({
    enabled: config.enabled,
    region: config.region,
    order_minimum: 1,
    order_maximum: parseFloat(afterpayConfig?.maximumAmount?.amount || "1"),
  } as Bpd_Afterpay);
}
