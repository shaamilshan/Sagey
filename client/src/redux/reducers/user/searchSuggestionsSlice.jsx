import { createSlice } from "@reduxjs/toolkit";
import { getSearchSuggestions } from "../../actions/user/searchSuggestionsActions";

const searchSuggestionsSlice = createSlice({
  name: "searchSuggestions",
  initialState: {
    loading: false,
    suggestions: [],
    error: null,
    isVisible: false,
  },
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.isVisible = false;
      state.error = null;
    },
    showSuggestions: (state) => {
      state.isVisible = true;
    },
    hideSuggestions: (state) => {
      state.isVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchSuggestions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.suggestions = payload.suggestions || [];
        state.isVisible = state.suggestions.length > 0;
      })
      .addCase(getSearchSuggestions.rejected, (state, { payload }) => {
        state.loading = false;
        state.suggestions = [];
        state.error = payload;
        state.isVisible = false;
      });
  },
});

export const { clearSuggestions, showSuggestions, hideSuggestions } = searchSuggestionsSlice.actions;
export default searchSuggestionsSlice.reducer;