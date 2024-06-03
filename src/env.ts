const env = {
  // Will only be available on the server side
  travelloGraph:
    process.env.TRAVELLO_GRAPH ?? "https://api-stage.travelloapp.com/graphql",
  travelloGraphServerSide:
    process.env.TRAVELLO_GRAPH_SERVER_SIDE ??
    "https://api-stage.travelloapp.com/graphql",
  travelloApiKey: process.env.TRAVELLO_APIKEY ?? "",
  travelloRestApi:
    process.env.TRAVELLO_REST ?? "https://api-stage.travelloapp.com/2",
  travelloUserServiceServerSide:
    process.env.USER_SERVICE_SERVER_SIDE ??
    "https://api-stage.travelloapp.com/2",
  blogUrl: process.env.BLOG_URL ?? "",
  shareASaleEnabled: "1",
  priceFromFetchPeriodDays: process.env.PRICE_FROM_FETCH_PERIOD_DAYS ?? "30",
  shareASaleExpiryDays: process.env.SHARE_A_SALE_COOKIE_EXPIRY_DAYS ?? "30",
  commissionFactoryExpiryDays:
    process.env.COMMISSION_FACTORY_COOKIE_EXPIRY_DAYS ?? "30",
  serviceName: process.env.K_SERVICE ?? "backpackerdeals-next",
  version: process.env.K_REVISION ?? "dev",
  bpdAssetsBaseUrl: process.env.BPD_ASSETS_BASEURL,
  enabledResProviders: process.env.ENABLED_RES_PROVIDERS ?? "",
  cashbackHosts: process.env.CASHBACK_HOSTS,
  reviewsIoSection: !!process.env.REVIEWS_IO_ENABLED,
  millionDollarLandingPage: !!process.env.MILLION_DOLLAR_ENABLED,
  popUpEnabled: !!process.env.POP_UP_ENABLED,
  afterpay: {
    baseUrl: process.env.AFTERPAY_API_BASE_URL,
    configs: process.env.AFTERPAY_API_AUTH,
  },
};

export function asset(src: string) {
  return src.startsWith("/") ? `${env.bpdAssetsBaseUrl}${src}` : src;
}

export default env;
