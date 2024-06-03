import { ProductFragment } from "@@/pages/Product/queries/product-queries.generated";
import {
  FareTypeFragment,
  AvailabilityV2Fragment,
  AvailabilityAndPricingSummaryPayload,
} from "@@/features/calendar/queries/availability-query.generated";

export enum SlotStatusEnum {
  AVAILABLE = "AVAILABLE",
  SOLD_OUT = "SOLD_OUT",
  UNAVAILABLE = "UNAVAILABLE",
}

export type CalendarState = {
  counters: { [key: string]: number };
  selectedDate: string; //Local Date String excluding timezone and time at midnight eg YYYY-MM-DD 00:00:00
  active: boolean;
  product: ProductFragment | null;
  productLoading: boolean;
  availability: AvailabilityV2Fragment | null;
  fareTypes: FareTypeFragment[] | null;
  availabilityLoading: boolean;
  fareTypesLoading: boolean;
  availabilityPricingSummary?: AvailabilityAndPricingSummaryPayload;
};
