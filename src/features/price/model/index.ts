import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CurrencyState {
  selectedCurrency?: string | undefined;
}

function createInitialState(): CurrencyState {
  try {
    window.localStorage?.removeItem("selectedCurrency"); // ignore errors if cookie are blocked
  } catch {}
  return {};
}

const currencySlice = createSlice({
  name: "currency",
  initialState: createInitialState(),
  reducers: {
    selectCurrency(state, action: PayloadAction<string>) {
      state.selectedCurrency = action.payload;
    },
  },
});

export * from "./selectors";
export const { selectCurrency } = currencySlice.actions;
export default currencySlice;
