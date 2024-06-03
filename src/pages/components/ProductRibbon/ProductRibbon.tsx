import { FC } from "react";
import { ProductRibbonProps } from "../ProductCard/types";

const ProductRibbon: FC<{
  labels: ProductRibbonProps;
  variation: "card" | "page";
}> = ({ labels, variation = "card" }) => {
  const ribbonLabels = {
    [ProductRibbonProps.LastMinute]: (
      <div
        className={`absolute text-xs font-semibold left-0 m-2 bg-productRibbon py-3px px-6px rounded-md leading-5 text-white text-center
      ${variation === "card" ? "top-0" : "top-292px"}
      `}
      >
        Last Minute Deal
      </div>
    ),
    [ProductRibbonProps.Featured]: (
      <div
        className={`absolute font-semibold left-0 m-2 bg-darkRed3  py-3px px-6px rounded-md leading-5 text-white text-xs text-center ${
          variation === "card" ? "top-0" : "top-292px"
        } `}
      >
        Likely to Sell Out
      </div>
    ),
  };

  return ribbonLabels[labels] || null;
};

export default ProductRibbon;
