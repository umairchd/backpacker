import { ProductImageFragment, ProductLocationFragment } from "@@/pages/Product/queries/product-queries.generated";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export enum FIELDS {
  EMAIL = "email",
  DATE = "date",
  CHECKBOX = "checkbox",
}

export interface WishlistFormData {
  [FIELDS.EMAIL]: string;
  [FIELDS.DATE]: Date;
  [FIELDS.CHECKBOX]?: boolean;
}

export interface WishlistModalProps {
  id: string;
  subtitle: string;
  location: ProductLocationFragment;
  price: number;
  image: ProductImageFragment;
  iterableKey: string;
  currencyCode: string;
}

export interface WishlistIterableUserProps {
  email?: string;
  dataFields: {
    signupSource: string;
    emailVerified: boolean;
  };
}

export interface WishlistIterableEventProps {
  email?: string;
  eventName: string;
  dataFields: {
    productId: string;
    productName: string;
    productUrl: string;
    productPrice: number;
    productLocationCity: string;
    productLocationCountry: string;
    productImage: string;
  };
}

export interface IterableDataWishlist {
  user: WishlistIterableUserProps;
  event: WishlistIterableEventProps;
}

export interface WishlistModalSuccessProps {
  subtitle: string;
  image: ProductImageFragment;
  setIsOpen: (isOpen: boolean) => void;
}
