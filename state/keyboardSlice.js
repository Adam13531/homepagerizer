import { deleteItem } from "./actions";
import { createSlice } from "@reduxjs/toolkit";

const reducerName = "keyboard";

export const slice = createSlice({
  name: reducerName,
  initialState: {
    /**
     * If this is null, no items are listening for a hotkey. Otherwise, it's the
     * specific item that's waiting for a hotkey. There can only be one such item
     * at a time.
     * @type {?string}
     */
    itemIdListeningForHotkey: null,

    /**
     * This will just refer to the event.key string property like "b" or "Escape".
     * @type {?string}
     */
    lastPressedHotkey: null,
  },
  reducers: {
    setItemIdListeningForHotkey: (state, { payload }) => {
      state.itemIdListeningForHotkey = payload;
    },
    setLastPressedHotkey: (state, { payload }) => {
      state.lastPressedHotkey = payload;
    },
  },
  extraReducers: (builder) => {
    // If the item we're deleting is the one that was listening for a hotkey,
    // then we have to reset that state.
    builder.addCase(deleteItem, (state, { payload }) => {
      const { itemIdListeningForHotkey } = state;
      const deletingItemListeningForHotkey =
        itemIdListeningForHotkey === payload.id;
      state.itemIdListeningForHotkey = deletingItemListeningForHotkey
        ? null
        : itemIdListeningForHotkey;
    });
  },
});

export const { setItemIdListeningForHotkey, setLastPressedHotkey } =
  slice.actions;

export const selectItemIdListeningForHotkey = (state) =>
  state[reducerName].itemIdListeningForHotkey;
export const selectLastPressedHotkey = (state) =>
  state[reducerName].lastPressedHotkey;

export default slice.reducer;
