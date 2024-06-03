import { createSlice } from "@reduxjs/toolkit";
import { now } from "./utils";

// state

interface TimerState {
  now: string;
}

const initialState = { now: now().toISOString() } as TimerState;

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    tick(state) {
      state.now = now().toISOString();
    },
  },
});

export * from "./selectors";
export * from "./types";
export const { tick } = timerSlice.actions;
export default timerSlice.reducer;
