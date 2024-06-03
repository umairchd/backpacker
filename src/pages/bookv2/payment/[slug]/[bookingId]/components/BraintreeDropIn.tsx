import React, { useEffect, useRef } from "react";
import dropin from "braintree-web-drop-in";
import { useCreatePaymentTokenMutation } from "./PaymentPage.generated";

interface ProductPaymentInfo {
  productName: string;
  totalPrice: number;
  currency: string;
  onInit: VoidFunction;
}

const BrainTreeDropin = (paymentInfo) => {
  const { productName, totalPrice, currency, onInit } = paymentInfo;
  const [getClientToken] = useCreatePaymentTokenMutation();
  const initRef = useRef(false);

  useEffect(() => {
    const fetchClientToken = async () => {
      const result = await getClientToken({
        variables: {
          userId: "",
        },
      });
      const braintreeClientToken = result?.data?.createPaymentToken.value;
      const options = {
        authorization: braintreeClientToken,
        container: "#dropInTarget",
        threeDSecure: true,
        paypal: {
          flow: "checkout",
          amount: totalPrice,
          currency: currency,
          enableShippingAddress: false,
        },
        applePay: {
          paymentRequest: {
            label: productName,
            amount: totalPrice,
            currencyCode: currency,
          },
          requiredBillingContactFields: ["postalAddress"],
        },
        googlePay: {
          googlePayVersion: 2,
          merchantId: "merchant-id-from-google",
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: totalPrice,
            currencyCode: currency,
          },
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                // We recommend collecting and passing billing address information with all Google Pay transactions as a best practice.
                billingAddressRequired: true,
                billingAddressParameters: {
                  format: "FULL",
                },
              },
            },
          ],
        },
        card: {
          cardholderName: {
            required: true,
          },
          vault: {
            vaultCard: false,
          },
        },
      };
      dropin.create(options, function (error, instance) {
        onInit(error, instance);
      });
    };

    if (!initRef.current) {
      initRef.current = true;

      fetchClientToken().catch((e: unknown) => {
        onInit(
          { message: "Failed to initialise Braintree dropin.", error: e },
          null
        );
      });
    }
  }, []);

  return <div id="dropInTarget"></div>;
};

export default BrainTreeDropin;
