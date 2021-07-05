import { deleteItem } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const reducerName = "keyboard";

export const slice = createSlice({
  name: reducerName,
  initialState: {
    /**
     * Whether or not we're trying to set a hotkey for an item.
     * @type {boolean}
     */
    isListeningForHotkey: false,

    /**
     * This will just refer to the event.key string property like "b" or "Escape".
     * @type {?string}
     */
    lastPressedHotkey: null,
  },
  reducers: {
    setIsListeningForHotkey: (state, { payload }) => {
      state.isListeningForHotkey = payload;
    },
    setLastPressedHotkey: (state, { payload }) => {
      state.lastPressedHotkey = payload;
    },
  },
  extraReducers: (builder) => {
    // If we deleted an item, then we can no longer be listening for a hotkey
    // since it would close the edit dialog.
    builder.addCase(deleteItem, (state) => {
      state.isListeningForHotkey = false;
    });
  },
});

export const { setIsListeningForHotkey, setLastPressedHotkey } = slice.actions;

export const selectIsListeningForHotkey = (state) =>
  state[reducerName].isListeningForHotkey;
export const selectLastPressedHotkey = (state) =>
  state[reducerName].lastPressedHotkey;

export default slice.reducer;
