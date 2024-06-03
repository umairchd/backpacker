import { useMemo } from "react";
import { ProductRibbonProps } from "../ProductCard/types";

export const useLabelRibbon = (labels: string[] | undefined) => {
  const label = useMemo(() => {
    if (labels?.includes(ProductRibbonProps.Top)) {
      return ProductRibbonProps.Top;
    }

    if (labels?.includes(ProductRibbonProps.LastMinute)) {
      return ProductRibbonProps.LastMinute;
    }

    if (labels?.includes(ProductRibbonProps.Featured)) {
      return ProductRibbonProps.Featured;
    }

    return undefined;
  }, [labels]);

  return label;
};
