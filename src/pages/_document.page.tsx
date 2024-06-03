import Document, { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";
import Script from "next/script";
import { globalFonts } from "@@/themes/globalFonts";

const getCSP = () => {
  let baseCsp = process.env.CSP;

  // required on dev server
  if (process.env.NODE_ENV === "development") {
    baseCsp = baseCsp.split("script-src").join("script-src 'unsafe-eval'");
  }

  return baseCsp;
};
export default class CustomDocument extends Document {
  render() {
    const theme = this.props.__NEXT_DATA__.query["theme"] as string;
    const site = this.props.__NEXT_DATA__.query["site"] as string;

    const { poppins } = globalFonts();

    return (
      <Html
        lang="en"
        className={clsx("theme", theme)}
      >
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCSP()}
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="dns-prefetch"
            href="https://www.googletagmanager.com"
          />
          <link
            rel="dns-prefetch"
            href="https://www.gstatic.com"
          />
          <link
            rel="dns-prefetch"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="dns-prefetch"
            href="https://www.google-analytics.com"
          />
          <link
            rel="dns-prefetch"
            href="https://www.googleadservices.com"
          />
          <link
            rel="dns-prefetch"
            href="https://connect.facebook.net"
          />
        </Head>
        <body className={poppins.variable}>
          <Main />
          <NextScript />
          {["backpackerdeals", "travello"].includes(site) && (
            <Script
              id="share-a-sale"
              src="https://www.dwin1.com/19038.js"
              type="text/javascript"
              async
            />
          )}
        </body>
      </Html>
    );
  }
}
