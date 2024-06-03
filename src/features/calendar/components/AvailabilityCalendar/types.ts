import { ProductDiscountAmountFragment } from "@@/pages/Product/queries/product-queries.generated";
import { PriceFrom } from "@@/pages/Product/ProductContent/types";

export enum BookNowOverlayMode {
  Loading,
  BookedOut,
  Error,
  Hidden,
}

export interface BookNowOverlayProps {
  mode: BookNowOverlayMode;
  onClose: (mode: BookNowOverlayMode) => void;
}

export interface AvailabilityCalendarProps {
  productName: string;
  productId: string;
  nextAvailableDate: string;
  parentRef: React.MutableRefObject<HTMLElement>;
  onClose: (href?: string) => void;
  onReload?: () => void;
  discount?: ProductDiscountAmountFragment[];
  priceFrom: PriceFrom;
  priceFromAvailableAt: string;
}
