import { ProductImageFragment, ProductLocationFragment } from "@@/pages/Product/queries/product-queries.generated";

export interface ImageGalleryProps {
  imagesGallery: {
    activeImages: ProductImageFragment[];
    name: string;
    iterable_key: string;
    productId: string;
    location: ProductLocationFragment;
    price: number;
    currencyCode: string;
    countDownLimit?: number;
    isDesktop: boolean;
  };
}

export interface ImageBannerProps {
  image: ProductImageFragment["image"];
  name?: string;
  onClick?: () => void;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  height?: number;
  width?: number;
}

export interface ModalImageGalleryProps {
  isShown: boolean;
  handleDismiss: () => void;
  activeImages: ProductImageFragment[];
  name: string;
  productId: string;
}

export interface IconGalleryProps {
  isShownModal: () => void;
  countDownLimit?: number;
  countDownVisible?: boolean;
}
