import { ProductDataQuery } from "@@/pages/Product/queries/product-queries.generated";

const productDataWithoutVariation = {
  data: {
    isProviderSupported: true,
    resSystemType: "FAREHARBOR",
    summary: {
      productId: "bea6e30b-0dee-484a-b881-61812cf87c4a",
      zoneOffset: "-10:00",
      nextAvailableDate: {
        value: "2023-07-25T08:00:00-10:00",
        priceFrom: {
          amount: 107.53,
          currencyCode: "AUD",
          convertedAmount: 107.53,
        },
      },
      priceFrom: {
        value: {
          amount: 107.53,
          currencyCode: "AUD",
          convertedAmount: 107.53,
        },
        priceDate: "2023-08-03T08:00:00-10:00",
      },
      variantSummaries: [],
    },
  },
} as ProductDataQuery;

const productDataWithVariation = {
  data: {
    isProviderSupported: true,
    resSystemType: "FAREHARBOR",
    summary: {
      productId: "bea6e30b-0dee-484a-b881-61812cf87c4a",
      zoneOffset: "-10:00",
      nextAvailableDate: {
        value: "2023-07-25T08:00:00-10:00",
        priceFrom: {
          amount: 107.53,
          currencyCode: "AUD",
          convertedAmount: 107.53,
        },
      },
      priceFrom: {
        value: {
          amount: 107.53,
          currencyCode: "AUD",
          convertedAmount: 107.53,
        },
        priceDate: "2023-08-03T08:00:00-10:00",
      },
      variantSummaries: [
        {
          productId: "aceb2214-68bf-4be5-b91d-769352023104",
          zoneOffset: "-10:00",
          nextAvailableDate: {
            value: "2023-07-25T08:00:00-10:00",
            priceFrom: {
              amount: 107.53,
              currencyCode: "AUD",
              convertedAmount: 107.53,
            },
          },
          priceFrom: {
            value: {
              amount: 107.53,
              currencyCode: "AUD",
              convertedAmount: 107.53,
            },
            priceDate: "2023-08-03T08:00:00-10:00",
          },
        },
      ],
    },
  },
} as ProductDataQuery;

export { productDataWithoutVariation, productDataWithVariation };
