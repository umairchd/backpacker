import { ProductFragment } from "@@/pages/Product/queries/product-queries.generated";

export const productDataMock: ProductFragment = {
  productId: "401dcd8f-1b58-11ec-91a2-42010a8004a5",
  resSystemType: "rtbs",
  title: "2 Hour Bike Hire",
  labels: [],
  partner: null,
  nextAvailableDate: "2023-10-24T00:00:00+11:00",
  priceFromAnP: {
    currencyCode: "NZD",
    amount: 35,
    convertedAmount: 32.12161246930474,
  },
  discounts: [],
  variantProducts: [],
  parentProduct: null,
  legacy: {
    priceFrom: {
      currencyCode: "NZD",
      amount: 35,
      convertedAmount: 32.12161246930474,
    },
    displayPrice: {
      adultPrice: {
        price: {
          currencyCode: "NZD",
          amount: 35,
          convertedAmount: 32.12161246930474,
        },
        value: {
          currencyCode: "NZD",
          amount: 35,
          convertedAmount: 32.12161246930474,
        },
        type: "Adult",
      },
      childPrice: {
        price: {
          currencyCode: "NZD",
          amount: 35,
          convertedAmount: 32.12161246930474,
        },
        value: {
          currencyCode: "NZD",
          amount: 35,
          convertedAmount: 32.12161246930474,
        },
        type: "Child",
      },
      familyPrice: {
        price: {
          currencyCode: "NZD",
          amount: 0,
          convertedAmount: 0,
        },
        value: {
          currencyCode: "NZD",
          amount: 0,
          convertedAmount: 0,
        },
        type: "Family",
      },
    },
    recommendedRetailPrice: {
      currencyCode: "NZD",
      amount: 35,
      convertedAmount: 32.12161246930474,
    },
    shortId: "14769",
    updatedAt: "2023-10-26T03:17:45.004Z",
    forceAvailabilityV1: false,
    subheader: null,
    countDownLimit: null,
    excludedBookingInfo: null,
    bookingUrl: null,
    openDatedBooking: false,
    showMerchant: true,
    hasNoIndexMetaTag: false,
    hidePickupOnFrontend: false,
    isDisplayGooglePay: true,
    isDisplayPaypal: true,
    isDisplayApplePay: true,
    isDisplayAfterpay: true,
    defaultDeparturePoint: null,
    isDisplayHotelPickupWarning: false,
  },
};
