import { ProductQuery } from "@@/pages/Product/queries/product-queries.generated";

const priceDataWithoutVariation = {
  product: {
    productId: "bea6e30b-0dee-484a-b881-61812cf87c4a",
    title: "Snorkeling Experience without variation",
    variantProducts: [],
  },
} as ProductQuery;

const priceDataWithVariation = {
  product: {
    productId: "bea6e30b-0dee-484a-b881-61812cf87c4a",
    title: "Eco-Friendly Snorkeling Experience with TEST setup",
    variantProducts: [
      {
        productId: "aceb2214-68bf-4be5-b91d-variation1",
        title: "[Variation 1] Snorkeling with trainer",
      },
      {
        productId: "aceb2214-68bf-4be5-b91d-variation2",
        title: "[Variation 2] Snorkeling without trainer",
      },
    ],
  },
} as ProductQuery;

export { priceDataWithoutVariation, priceDataWithVariation };
