import { ProductFragment } from "@@/pages/Product/queries/product-queries.generated";

export const productWithVariationsMock: ProductFragment = {
  productId: "401cdc41-1b58-11ec-91a2-42010a8004a5",
  resSystemType: "Rezdy",
  title:
    "1D Alice Springs to Ayers Rock Transfer Tour - Parent Product with Variation",
  labels: [],
  nextAvailableDate: "2023-10-24T09:00+11:00",
  priceFromAnP: {
    currencyCode: "AUD",
    amount: 100,
    convertedAmount: 100,
  },
  discounts: [],
  variantProducts: [
    {
      productId: "88e15b3a-6bdf-414a-8558-31f093f58e5b",
      resSystemType: "Rezdy",
      title: "Test Product Twenty One",
      status: "ACTIVE",
      nextAvailableDate: "2023-10-24T09:00+11:00",
      discounts: [],
      priceFromAnP: {
        currencyCode: "AUD",
        amount: 100,
        convertedAmount: 100,
      },
    },
  ],
  parentProduct: null,
};

export const productWithMultipleVariationsMock: ProductFragment = {
  productId: "401cdc41-1b58-11ec-91a2-42010a8004a5",
  resSystemType: "Rezdy",
  title:
    "1D Alice Springs to Ayers Rock Transfer Tour - Parent Product with Variation",
  labels: [],
  nextAvailableDate: "2023-10-24T09:00+11:00",
  priceFromAnP: {
    currencyCode: "AUD",
    amount: 100,
    convertedAmount: 100,
  },
  discounts: [],
  variantProducts: [
    {
      productId: "88e15b3a-6bdf-414a-8558-31f093f58e5b",
      resSystemType: "Rezdy",
      title: "Test Product Twenty One",
      status: "ACTIVE",
      nextAvailableDate: "2023-10-28T09:00+11:00",
      discounts: [],
      priceFromAnP: {
        currencyCode: "AUD",
        amount: 100,
        convertedAmount: 100,
      },
    },
    {
      productId: "88e15b3a-6bdf-414a-8558-31f093f58tru",
      resSystemType: "Rezdy",
      title: "Test Product Twenty Two",
      status: "ACTIVE",
      nextAvailableDate: "2023-10-26T09:00+11:00",
      discounts: [],
      priceFromAnP: {
        currencyCode: "AUD",
        amount: 120,
        convertedAmount: 120,
      },
    },
  ],
  parentProduct: null,
};
