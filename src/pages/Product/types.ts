import {
  AvailabilityFragment,
  FareTypeFragment,
  NextAvailablePriceAndDateDataFragment,
} from "@@/features/calendar/queries/availability-query.generated";

import { PickupDetail, ProductFaq, ProductItinerary, TextContent } from "../queries.generated";
import { ProductFragment, VariantProductFragment } from "@@/pages/Product/queries/product-queries.generated";
import { HeroImageFragment } from "../components/queries/queries.generated";
import { AccordionSummaryProps } from "@mui/material";

export interface AvailabilityButtonProps {
  status: string;
  bookingUrl: string;
  hasVariantProducts: boolean;
  priceData?: ProductFragment & { availability?: AvailabilityFragment };
  bookingRequired: boolean;
  slug?: string;
  setCalendarShown?: (value: boolean) => void;
  isLoading: boolean;
  fareTypes?: FareTypeFragment[];
  availabilityV2Enabled?: boolean;
  nextAvailableDate?: string;
  priceFrom?: number;
  isMobile?: boolean;
}

export interface FAQCardProps {
  faqs: ProductFaq[];
  isBanner: boolean;
}

export interface ItineraryCardProps {
  itinerary: ProductItinerary;
  isBanner: boolean;
}

export interface PartnerCardProps {
  partner: { name?: string; companyLogo?: HeroImageFragment };
  address?: string;
  isBanner: boolean;
}

export interface UniqueLocation {
  time: string;
  location: string;
}

export interface PickupLocationsCardProps {
  pickupData: {
    travelInstructions?: TextContent;
    pickupDetails: PickupDetail[];
    variantProducts?: VariantProductFragment[];
    isBanner: boolean;
  };
}

export interface TourOptionsCardProps {
  products: VariantProductFragment[];
  hasVariantProducts: boolean;
  enquireOnly: boolean;
  isBanner: boolean;
  nextAvailableDateAndPriceFrom: NextAvailablePriceAndDateDataFragment[];
}

export interface PickupLocationProps {
  pickupDetails: any;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

export interface CustomAccordionSummaryProps extends AccordionSummaryProps {
  index: number;
}
