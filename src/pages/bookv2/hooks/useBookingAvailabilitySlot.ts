import { useCalendar } from "@@/features/calendar/hooks/useCalendar";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  AvailabilitySlotFragment,
  AvailableDateFragment,
} from "@@/features/calendar/queries/availability-query.generated";

export type RouterData = {
  ftIds: string[];
  slot: string;
  id: string;
  date: Dayjs[];
};

export const useBookingAvailabilitySlot = (): {
  router: RouterData;
  productAvailability: AvailableDateFragment[];
  loadingAvailability: boolean;
  availabilityData: AvailabilitySlotFragment;
} => {
  const router = useRouter();
  const { "ft-id": ftIds, slot, id, date: dateStr } = router.query;

  const fareTypeIds = useMemo(() => {
    if (Array.isArray(ftIds)) {
      return ftIds;
    } else if (ftIds) {
      return [ftIds];
    }
    return [];
  }, [ftIds]);

  const currentSlot = slot as string;

  const productId = id as string;

  const date: Dayjs[] = useMemo(() => {
    if (dateStr as string) {
      return [dayjs(dateStr as string)];
    } else if (Array.isArray(dateStr)) {
      return dateStr.map((date) => dayjs(date));
    }

    return [];
  }, [dateStr]);

  const { productAvailability, loading: loadingAvailability } = useCalendar(
    productId,
    date[0]
  );

  const availabilityData = useMemo(() => {
    if (productAvailability) {
      const availabilityData = productAvailability?.find(
        (item) => item.date === dateStr
      );

      if (availabilityData) {
        const slotData = availabilityData?.slots?.find(
          (item) => item.slotId === currentSlot
        );

        if (slotData) {
          return slotData;
        }
      }
    }

    return null;
  }, [productAvailability, dateStr, currentSlot]);

  return {
    availabilityData,
    router: {
      ftIds: fareTypeIds,
      slot: currentSlot,
      id: productId,
      date,
    },
    productAvailability,
    loadingAvailability,
  };
};
