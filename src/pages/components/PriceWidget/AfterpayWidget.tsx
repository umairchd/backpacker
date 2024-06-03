import Script from "next/script";
import { useState } from "react";
import { Bpd_Afterpay } from "@@/pages/components/queries/queries.generated";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "afterpay-placement": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "data-locale": string;
        "data-currency": string;
        "data-amount": number;
        "data-min": number;
        "data-max": number;
        "data-size": string;
        "data-logo-type": string;
      };
    }
  }
}

export default function AfterPayWidget({
  currencyIsoSymbol,
  amount,
  afterpay,
}: {
  currencyIsoSymbol?: string;
  amount?: number;
  afterpay?: Bpd_Afterpay;
}) {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Script
        id="afterpay"
        strategy="afterInteractive"
        src="https://js.afterpay.com/afterpay-1.x.js"
        onReady={() => {
          setIsReady(true);
        }}
      />
      {isReady ? (
        <afterpay-placement
          data-locale="en_AU"
          data-currency={currencyIsoSymbol}
          data-amount={amount}
          data-min={afterpay?.order_minimum || 1}
          data-max={afterpay?.order_maximum || 2000}
          data-size="xs"
          data-logo-type="lockup"
        />
      ) : null}
    </>
  );
}
