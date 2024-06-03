import React, { FC } from "react";

import { ProductCardFragment } from "@@/pages/components/queries/queries.generated";
import ProductCard from "@@/pages/components/ProductCard/ProductCard";
import CustomGlider from "../../components/CustomGlider/CustomGlider";
import Pane from "../../components/CustomGlider/Pane";

import classes from "./ProductsListSectionOneLine.module.scss";

interface ProductsListSectionOneLineProps {
  products: ProductCardFragment[];
  title: string;
}

const ProductsListSectionOneLine: FC<ProductsListSectionOneLineProps> = ({ products, title }) => {
  if (!products.length) {
    return null;
  }

  return (
    <section className={`bg-white ${classes["products-section"]}`}>
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <h2>{title}</h2>
        <div className={classes["products-section-list"]}>
          <CustomGlider hasDots>
            {products.map((p, ind) => (
              <Pane
                key={ind}
                className="col"
              >
                <ProductCard data={p} />
              </Pane>
            ))}
          </CustomGlider>
        </div>
      </div>
    </section>
  );
};

export default ProductsListSectionOneLine;
