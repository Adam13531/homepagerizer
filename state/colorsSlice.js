import { createSlice } from "@reduxjs/toolkit";
import { loadSavedState } from "./actions";
import { ensureStartsWithHash } from "../misc/util";

const reducerName = "colors";

export const slice = createSlice({
  name: reducerName,
  initialState: {
    bgColor: "#ffffff",
    textColor: "#000000",
    linkColor: "#3275f4",
    accentColor: "#4100ff",
    hoverColor: "#e7e7e7",
  },
  reducers: {
    setBgColor: (state, { payload }) => {
      state.bgColor = ensureStartsWithHash(payload);
    },
    setTextColor: (state, { payload }) => {
      state.textColor = ensureStartsWithHash(payload);
    },
    setLinkColor: (state, { payload }) => {
      state.linkColor = ensureStartsWithHash(payload);
    },
    setAccentColor: (state, { payload }) => {
      state.accentColor = ensureStartsWithHash(payload);
    },
    setHoverColor: (state, { payload }) => {
      state.hoverColor = ensureStartsWithHash(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSavedState, (state, { payload }) => {
      state.bgColor = payload.bgColor;
      state.textColor = payload.textColor;
      state.linkColor = payload.linkColor;
      state.accentColor = payload.accentColor;
      state.hoverColor = payload.hoverColor;
    });
  },
});

export const {
  setBgColor,
  setTextColor,
  setLinkColor,
  setAccentColor,
  setHoverColor,
} = slice.actions;

export const selectAllColors = (state) => state[reducerName];

export default slice.reducer;
