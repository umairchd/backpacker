import { ProductPageFragment } from "@@/pages/Product/queries/product-queries.generated";

const useTracking = () => {
  const track = (payload: any) => {
    if (window.dataLayer && payload) {
      window.dataLayer?.push(payload);
    }
  };

  const trackProductDetailEvent = (
    productPageProps: ProductPageFragment,
    host: string,
    channelName: string,
    selectedCurrency: string,
    mainImage: string,
    mainCategory: string
  ) => {
    const product = productPageProps.product;

    const productDetailEventPayload = {
      event: "productDetail",
      ecommerce: {
        channel: channelName,
        currencyCode: selectedCurrency,
        detail: {
          products: [
            {
              id: product.productId,
              name: product.title,
              variantId: product.productId,
              price: product.priceFrom?.amount,
              brand: product?.partner?.name,
              imageUrl: mainImage,
              url: `${host}/${product?.uri.url}`,
              destinationInfo: {
                city: product.location?.city,
                region: product.location?.city,
                country: product.location?.country,
              },
              category: mainCategory,
            },
          ],
        },
        deal: {
          id: product.productId,
          startPrice: product.priceFrom?.amount,
          price: product.priceFrom?.amount,
        },
      },
    };

    track(productDetailEventPayload);
  };

  return {
    track,
    trackProductDetailEvent,
  };
};

export default useTracking;
