import { ProductFragment } from "@@/pages/Product/queries/product-queries.generated";
import { AvailableDateFragment } from "@@/features/calendar/queries/availability-query.generated";
import { SlotStatusEnum } from "@@/types.generated";
import { getDateFromNextAvailableDateString } from "@@/features/calendar/utils/nextAvailableDateUtil";

export const getNextAvailableDateFromAvailableSlotsV1 = (
  product: ProductFragment,
  availableDates: Array<AvailableDateFragment>
): string | null => {
  if (!product || !availableDates) {
    return null;
  }

  let nextAvailableDate: string;
  if (product.variantProducts.length > 1) {
    nextAvailableDate = getNextAvailableDateFromVariations(product);
  } else {
    nextAvailableDate = getNextAvailableDateFromProduct(availableDates);
  }

  return getDateFromNextAvailableDateString(nextAvailableDate);
};

const getNextAvailableDateFromVariations = (
  product: ProductFragment
): string | null => {
  const variantProducts = product.variantProducts || [];
  const variantNextAvailableDates = variantProducts
    .map((variant) => variant.nextAvailableDate)
    .sort();

  return variantNextAvailableDates.length > 0
    ? variantNextAvailableDates[0]
    : product.nextAvailableDate;
};

const getNextAvailableDateFromProduct = (
  availableDates: Array<AvailableDateFragment>
) => {
  const availableSlot = availableDates?.find(
    (availableDate: AvailableDateFragment) =>
      availableDate.hasAvailableSlots &&
      availableDate.slots.some(
        (slot) => slot.status === SlotStatusEnum.Available
      )
  );

  if (availableSlot) {
    return availableSlot.date;
  }

  return null;
};
