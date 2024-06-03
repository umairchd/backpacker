import { AvailabilityFragment } from "@@/features/calendar/queries/availability-query.generated";
import {
  ProductFragment,
  Bpd_PaymentOptions,
  ProductImageFragment,
  ProductLocationFragment,
  ProductDiscountAmountFragment,
} from "@@/pages/Product/queries/product-queries.generated";
import { PaymentConfigurations } from "@@/pages/Product/util/paymentConfigurationUtil";
import { BreadcrumbItem } from "@@/pages/components/Breadcrumbs/Breadcrumbs";

export interface SkeletonPricingWidgetProps {
  enquireOnly: boolean;
  name: string;
  hasVariantProducts: boolean;
  bookingUrl: string;
  status: string;
  bookingRequired: boolean;
}

export interface ProductFactsProps {
  icons: any;
  className?: string;
}

export type PriceFrom = {
  currencyCode: string;
  amount: number;
  convertedAmount?: number;
};

export interface PricingWidgetProps {
  pricingWidget: {
    enquireOnly: boolean;
    title: string;
    hasVariantProducts: boolean;
    legacy: ProductFragment["legacy"];
    status: string;
    priceData: ProductFragment & { availability?: AvailabilityFragment };
    bookingRequired: boolean;
    uri: ProductFragment["uri"] & { city?: string };
    setCalendarShown: (value: boolean) => void;
    isAvailabilityV2Enabled: boolean;
    noAvailabilityFoundAndInactive?: boolean;
    isHasNextAvailableDates?: boolean;
    getUrl?: string;
    nextAvailableDate?: string;
    getNextAvailableLabel?: (value: string) => string;
    priceFrom: PriceFrom;
    discountAmount?: ProductDiscountAmountFragment;
    paymentOptions?: Bpd_PaymentOptions;
    priceFetching: boolean;
    productPageRef?: React.MutableRefObject<HTMLElement>;
    shouldShowPopUp?: boolean;
    iterable_key?: string;
    bottomPriceShown?: boolean;
    paymentConfigurations?: PaymentConfigurations;
  };
}

export interface SkeletonPricingWidgetBottomMobileProps {
  enquireOnly: boolean;
  name: string;
  hasVariantProducts: boolean;
  bookingUrl: string;
  status: string;
  bookingRequired: boolean;
}

export interface ReadMoreSectionProps {
  content: string;
  count?: number;
}

export interface ProductHeaderProps {
  productId: string;
  images: ProductImageFragment[];
  name: string;
  price: number;
  subheader?: string;
  ratingScore: number;
  totalReviews: number;
  location: ProductLocationFragment;
  countDownLimit: number;
  currencyCode: string;
  labels: string[];
  icons: any;
  breadcrumbs: BreadcrumbItem[];
}

export interface WhyBookWithUsProps {
  promoTitles: {
    promo_title_1: string;
    promo_title_2: string;
    promo_title_3: string;
    promo_title_4: string;
    promo_title_5: string;
  };
}
