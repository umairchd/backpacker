import { AvailabilitySlotStatusEnum, ResSystemType } from "@@/types.generated";
import { AvailableSlotsQuery } from "@@/features/calendar/queries/available-slots-query.generated";

export const availableSlots: AvailableSlotsQuery = {
  availability: {
    resSystemType: ResSystemType.Rezdy,
    slots: [
      {
        hasAvailableSlots: true,
        availableCount: 10,
        status: AvailabilitySlotStatusEnum.Available,
        startTimeLocal: "2023-10-23 07:00:00",
        endTimeLocal: "2023-10-23 12:00:00",
        fares: [],
      },
      {
        hasAvailableSlots: false,
        availableCount: 0,
        status: AvailabilitySlotStatusEnum.SoldOut,
        startTimeLocal: "2023-10-24 07:00:00",
        endTimeLocal: "2023-10-24 12:00:00",
        fares: [],
      },
      {
        hasAvailableSlots: true,
        availableCount: 5,
        status: AvailabilitySlotStatusEnum.Available,
        startTimeLocal: "2023-10-25 07:00:00",
        endTimeLocal: "2023-10-25 12:00:00",
        fares: [],
      },
    ],
  },
};
