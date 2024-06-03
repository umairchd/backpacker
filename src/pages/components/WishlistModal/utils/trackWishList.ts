type Deal = {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
};

export default function trackWishList(
  email: string,
  reminderDate: string,
  deal: Deal,
  shareASaleCookieExpiryTime: string
) {
  if (!window.dataLayer) {
    return;
  }

  window.dataLayer.push({
    event: "submitUserInfo",
    action: "wishlist",
    user: {
      email,
    },
    shareASaleCookieExpiryTime,
  });

  if (!deal) {
    return;
  }

  const { id, name, url, imageUrl } = deal;
  const trackingPayload = {
    id,
    name,
    imageUrl,
    url,
    reminderDate,
    customerInfo: {
      email,
    },
  };

  window.dataLayer.push({
    event: "addToWishlist",
    ecommerce: {
      detail: {
        products: [trackingPayload],
      },
    },
    shareASaleCookieExpiryTime,
  });
}
