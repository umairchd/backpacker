import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import trim from "lodash/trim";
import debounce from "lodash/debounce";
import {
  TextSearchDocument,
  TextSearchQuery,
  TextSearchQueryVariables,
} from "@/src/features/search/queries/textSearch-queries.generated";
import { ThunkExtraArgs } from "@@/features/store";

export const fetchContextSearchResults = createAsyncThunk<
  TextSearchQuery,
  string,
  { extra: ThunkExtraArgs }
>(
  "contextSearch/fetchContextSearchResults",
  async (searchText: string, { extra }) => {
    const { travelloGraphClient: client, channelHost } = extra;

    return (
      await client.query<TextSearchQuery, TextSearchQueryVariables>({
        query: TextSearchDocument,
        variables: {
          query: trim(searchText),
          channelHost: channelHost,
          limit: 20,
        },
        fetchPolicy: "no-cache",
      })
    ).data;
  }
);

// state

interface ContextSearchState {
  hideSearchBar: boolean;
  isOpen: boolean;
  searchText: string;
  data?: TextSearchQuery;
}

const initialState: ContextSearchState = {
  hideSearchBar: false,
  isOpen: false,
  searchText: "",
};

const debouncedfetchContextSearchResults = debounce(
  (dispatch, searchText) => dispatch(fetchContextSearchResults(searchText)),
  300
);

const setSearchText = createAsyncThunk(
  "contextSearch/setSearchText",
  (searchText: string, { dispatch }) => {
    debouncedfetchContextSearchResults(dispatch, searchText);
    return searchText;
  }
) as any;

const contextSearchSlice = createSlice({
  name: "contextSearch",
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setHideSearchBar(state, action: PayloadAction<boolean>) {
      state.hideSearchBar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setSearchText.fulfilled, (state, action) => {
      const { payload: newVal } = action;
      state.searchText = newVal;
    });
    builder.addCase(fetchContextSearchResults.fulfilled, (state, action) => {
      const { payload: searchResults } = action;
      if (searchResults) {
        state.data = searchResults;
      }
    });
  },
});

export const { setIsOpen } = contextSearchSlice.actions;
export { setSearchText };
export * from "./selectors";
export default contextSearchSlice;
