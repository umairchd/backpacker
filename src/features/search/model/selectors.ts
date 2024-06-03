import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// selectors - derived values

const selectSelf = (state: RootState) => state.contextSearch;

export const getIsSearchBarHidden = createDraftSafeSelector(
  selectSelf,
  (state) => state.hideSearchBar
);

export const getIsOpen = createDraftSafeSelector(
  selectSelf,
  (state) => state.isOpen
);

export const getSearchText = createDraftSafeSelector(
  selectSelf,
  (state) => state.searchText
);

export interface SearchResultGroup {
  group: string;
  index: number; // use for up/down arrow key (should asc)
  name: string;
  url: string;
}

export const getCombinedSearchResults = createDraftSafeSelector(
  selectSelf,
  (state) => {
    if (!state.data) {
      return [];
    }

    const {
      data: {
        others: { categories, countries, cities },
        products,
      },
    } = state;

    const results = [
      ...categories.map((item) => ({
        group: "Activities",
        name: item.name,
        url: item.uri.url,
      })),
      ...countries.map((item) => ({
        group: "Countries",
        name: item.name,
        url: item.uri.url,
      })),
      ...cities.map((item) => ({
        group: "Cities",
        name: item.name,
        url: item.uri.url,
      })),
      ...products.edges.map((item) => ({
        group: "Offers",
        name: item.node.title,
        url: item.node.uri.url,
      })),
    ].map((item, index) => ({ ...item, index }));

    return results;
  }
);
