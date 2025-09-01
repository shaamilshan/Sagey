import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const getSearchSuggestions = createAsyncThunk(
  "searchSuggestions/getSearchSuggestions",
  async (query, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/search-suggestions?q=${encodeURIComponent(query)}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);