import { createSlice } from "@reduxjs/toolkit";
import { loadSavedState } from "./actions";
import uniqid from "uniqid";

const reducerName = "content";

function makeNewTextItem() {
  return {
    text: "New item",
    url: "",
    keyboardShortcut: null,
    id: uniqid.time(),
  };
}

export const slice = createSlice({
  name: reducerName,
  initialState: {
    rows: [],

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

    /**
     * The protocol, host, and port where Homepagerizer loaded.
     * @type {?string}
     */
    homepagerizerAddress: null,
  },
  reducers: {
    addRow: (state) => {
      state.rows.push([]);
    },
    deleteRow: (state, { payload: rowNum }) => {
      state.rows.splice(rowNum, 1);
    },
    addItemBefore: {
      reducer: (state, { payload }) => {
        const { rowNum, itemNum } = payload;
        const newItem = makeNewTextItem();
        state.rows[rowNum].splice(itemNum, 0, newItem);
      },
      prepare: (rowNum, itemNum) => {
        return { payload: { rowNum, itemNum } };
      },
    },
    deleteItem: {
      reducer: (state, { payload }) => {
        const { rowNum, itemNum } = payload;
        const { itemIdListeningForHotkey, rows } = state;

        // If the item we're deleting is the one that was listening for a hotkey,
        // then we have to reset that state.
        const deletingItemListeningForHotkey =
          itemIdListeningForHotkey === rows[rowNum][itemNum].id;
        _.pullAt(rows[rowNum], itemNum);
        state.itemIdListeningForHotkey = deletingItemListeningForHotkey
          ? null
          : itemIdListeningForHotkey;
      },
      prepare: (rowNum, itemNum) => {
        return { payload: { rowNum, itemNum } };
      },
    },
    updateItem: {
      reducer: (state, { payload }) => {
        const { rowNum, itemNum, params } = payload;
        const item = state.rows[rowNum][itemNum];
        state.rows[rowNum][itemNum] = {
          ...item,
          ...params,
        };
      },
      prepare: (rowNum, itemNum, params) => {
        return { payload: { rowNum, itemNum, params } };
      },
    },
    addItemAtEndOfRow: (state, { payload: rowNum }) => {
      const newItem = makeNewTextItem();
      state.rows[rowNum].push(newItem);
    },
    setItemIdListeningForHotkey: (state, { payload }) => {
      state.itemIdListeningForHotkey = payload;
    },
    setLastPressedHotkey: (state, { payload }) => {
      state.lastPressedHotkey = payload;
    },
    setHomepagerizerAddress: (state, { payload }) => {
      state.homepagerizerAddress = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSavedState, (state, { payload }) => {
      state.rows = payload.rows;
    });
  },
});

export const {
  addRow,
  deleteRow,
  addItemBefore,
  deleteItem,
  updateItem,
  addItemAtEndOfRow,
  setItemIdListeningForHotkey,
  setLastPressedHotkey,
  setHomepagerizerAddress,
} = slice.actions;

export const selectRows = (state) => state[reducerName].rows;
export const selectItemIdListeningForHotkey = (state) =>
  state[reducerName].itemIdListeningForHotkey;
export const selectLastPressedHotkey = (state) =>
  state[reducerName].lastPressedHotkey;
export const selectHomepagerizerAddress = (state) =>
  state[reducerName].homepagerizerAddress;

export default slice.reducer;
