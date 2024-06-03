"use client";

import { getSelectedCurrency } from "@/src/features/price/model";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import ProductCard from "@@/pages/components/ProductCard/ProductCard";

import CustomGlider from "@@/pages/components/CustomGlider/CustomGlider";
import Pane from "@@/pages/components/CustomGlider/Pane";
import { ProductsByIdsQuery, useProductsByIdsQuery } from "./queries.generated";

const fallbackData: ProductsByIdsQuery = {
  products: {
    edges: new Array(3).fill(null),
  },
};

function ProductsFromIdsSlider({ productIds }: { productIds: string[] }) {
  const selectedCurrency = useSelector(getSelectedCurrency);

  const { data = fallbackData, error } = useProductsByIdsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      targetCurrency: selectedCurrency,
      filter: { productIds },
    },
    skip: !selectedCurrency,
  });

  if (error || data === undefined) {
    return null;
  }

  const {
    products: { edges },
  } = data;

  if (edges.length === 0) {
    return null;
  }

  return (
    <div className="-mx-3">
      <CustomGlider hasDots>
        {edges.map((edge) => {
          return (
            <Pane
              className="px-3"
              key={edge?.node.productId ?? nanoid()}
            >
              <ProductCard {...{ data: edge?.node }} />
            </Pane>
          );
        })}
      </CustomGlider>
    </div>
  );
}

export default ProductsFromIdsSlider;
