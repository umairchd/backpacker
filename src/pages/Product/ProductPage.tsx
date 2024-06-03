import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductContent from "./ProductContent/ProductContent";
import { getSchemaOrg, getVideoSchemaOrg } from "@@/pages/Product/utils";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useSelector } from "react-redux";
import { getSelectedCurrency } from "@@/features/price/model";
import { usePriceData } from "@@/pages/Product/hooks/usePriceData";
import { ProductPageFragment } from "@@/pages/Product/queries/product-queries.generated";
import { getPaymentConfigurations, PaymentConfigurations } from "@@/pages/Product/util/paymentConfigurationUtil";
import useTracking from "@@/pages/lib/useTracking";

const ProductPage: FC<{
  pageProps: ProductPageFragment;
}> = ({ pageProps }) => {
  const { trackProductDetailEvent } = useTracking();
  const [paymentConfigurations, setPaymentConfigurations] = useState<PaymentConfigurations>();
  const {
    query: { countryOrSlug, city },
  } = useRouter();
  const product = pageProps.product;
  const {
    host,
    channel: { name: channelName, siteConfig, key: channelKey },
  } = useServerContext();

  const selectedCurrency = useSelector(getSelectedCurrency);
  const { priceData, productData: anpProductData } = usePriceData(
    product.productId,
    product.legacy?.forceAvailabilityV1,
  );

  const priceFrom = useMemo(() => {
    const summary = anpProductData?.summary;
    if (summary?.priceFrom?.value) {
      return summary?.priceFrom?.value;
    }

    if (priceData?.legacy?.displayPrice?.adultPrice?.price) {
      return priceData?.legacy?.displayPrice?.adultPrice?.price;
    }

    if (priceData?.priceFromAnP) {
      return priceData?.priceFromAnP;
    }

    return priceData?.legacy?.priceFrom;
  }, [priceData]);

  const schemaOrg = getSchemaOrg(pageProps, channelName, selectedCurrency, priceFrom?.convertedAmount);

  const videoSchemaOrg = getVideoSchemaOrg(pageProps, host, channelName, siteConfig.logoImage?.logo);

  const currentCountry = product.location?.country;
  const currentCity = product.location?.city;
  const breadcrumbs = [
    { label: currentCountry, href: `/${countryOrSlug}` },
    { label: currentCity, href: `/${countryOrSlug}/${city}` },
    { label: product.title, href: product.uri.url },
  ];
  const images = product.images?.productImages || [];
  const { productId, title, legacy, ratingScore, totalReviews, location } = product;

  const mainImage = images.find((image) => image.isMainImage)?.image?.top1200 || "";

  const mainCategory = product.categories?.find((category) => category?.isMainCategory)?.category?.name || "";

  useEffect(() => {
    if (pageProps?.product && selectedCurrency) {
      trackProductDetailEvent(pageProps, host, channelName, selectedCurrency, mainImage, mainCategory);
    }
  }, [pageProps, selectedCurrency]);

  useEffect(() => {
    trackProductDetailEvent(pageProps, host, channelName, selectedCurrency, mainImage, mainCategory);
  }, [pageProps]);

  useEffect(() => {
    getPaymentConfigurations(channelKey).then((paymentConfigurations) => {
      setPaymentConfigurations(paymentConfigurations);
    });
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaOrg }}
        />

        {videoSchemaOrg && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: videoSchemaOrg }}
          />
        )}
      </Head>
      <ProductHeader
        productId={productId}
        subheader={legacy?.subheader}
        images={images}
        name={title}
        ratingScore={ratingScore}
        totalReviews={totalReviews}
        location={location}
        countDownLimit={legacy?.countDownLimit}
        price={product.legacy?.priceFrom?.amount}
        currencyCode={product.legacy?.priceFrom?.currencyCode}
        labels={product.labels}
        icons={product.icons}
        breadcrumbs={breadcrumbs}
      />
      <ProductContent {...{ pageProps, paymentConfigurations }} />
    </>
  );
};

export default ProductPage;
