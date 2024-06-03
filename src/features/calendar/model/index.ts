import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CalendarState } from "./types";

export const initialState: CalendarState = {
  counters: {},
  selectedDate: undefined, //Selected date local date time. Serialized form is String, else dayjs.
  active: true,
  product: null,
  availability: null,
  fareTypes: null,
  productLoading: false,
  availabilityLoading: false,
  fareTypesLoading: false,
  availabilityPricingSummary: null,
};

const calendarSlice = createSlice({
  name: "availabilityCalendar",
  initialState,
  reducers: {
    changeSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    changeCounter(
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) {
      const { counters } = state;
      const { key, value } = action.payload;

      const count = counters[key] + value;
      if (count <= 0) counters[key] = 0;
      else if (!counters[key]) counters[key] = 1;
      else counters[key] = count;
    },
    setCounters(state, action: PayloadAction<{ [key: string]: number }>) {
      state.counters = action.payload;
    },
    resetCalendarData(state) {
      return {
        ...initialState,
        counters: state.counters,
        selectedDate: state.selectedDate,
        availabilityPricingSummary: state.availabilityPricingSummary,
      };
    },
  },
});

export const {
  changeSelectedDate,
  changeCounter,
  setCounters,
  resetCalendarData,
} = calendarSlice.actions;
export * from "./selectors";
export * from "./types";

export default calendarSlice;
