import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store"; // import type only here so there's no circular ref

// selectors - derived values
const selectSelf = (state: RootState) => state.currency;

export const getSelectedCurrency = createDraftSafeSelector(
  selectSelf,
  (state) => state.selectedCurrency
);
