import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { deriveTimezoneNumberOffset } from "@@/features/calendar/utils/date";
import dayjs from "dayjs";

export const getCalendarState = (state: RootState) =>
  state.availabilityCalendar;

export const getCounters = createDraftSafeSelector(
  getCalendarState,
  ({ counters }) => counters
);

//Selected date is saved as local date time string eg YYYY-MM-DD hh:mm:ss
export const getSelectedDate = createDraftSafeSelector(
  getCalendarState,
  ({ selectedDate }) => dayjs(selectedDate)
);

export const getProductTimezoneOffset = createDraftSafeSelector(
  getCalendarState,
  ({ availabilityPricingSummary }) =>
    deriveTimezoneNumberOffset(availabilityPricingSummary?.zoneOffset)
);
