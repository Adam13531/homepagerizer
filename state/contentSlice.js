import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { loadSavedState, deleteItem } from "./actions";
import uniqid from "uniqid";

const reducerName = "content";

function makeNewTextItem() {
  return {
    text: "New item",
    url: "",
    isSmallText: false,
    keyboardShortcut: null,
    id: uniqid.time(),
  };
}

export const slice = createSlice({
  name: reducerName,
  initialState: {
    rows: [],

    /**
     * The protocol, host, and port where Homepagerizer loaded.
     * @type {?string}
     */
    homepagerizerAddress: null,

    /**
     * Title of the resulting homepage.
     * @type {string}
     */
    homepageTitle: "My Homepage",

    /**
     * This can be any font family that the user's browser can load, including
     * one only on their hard drive.
     * @type {string}
     */
    fontFamily: "",
  },
  reducers: {
    addRow: (state) => {
      state.rows.push([]);
    },
    relocateRow: {
      reducer: (state, { payload }) => {
        const { rowNum, targetRowNum } = payload;
        const sourceRow = state.rows[rowNum];

        state.rows.splice(rowNum, 1);
        state.rows.splice(targetRowNum, 0, sourceRow);
      },
      prepare: (rowNum, targetRowNum) => {
        return { payload: { rowNum, targetRowNum } };
      },
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
    setHomepagerizerAddress: (state, { payload }) => {
      state.homepagerizerAddress = payload;
    },
    setFontFamily: (state, { payload }) => {
      state.fontFamily = payload;
    },
    setHomepageTitle: (state, { payload }) => {
      state.homepageTitle = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSavedState, (state, { payload }) => {
      state.rows = payload.rows;
      state.fontFamily = payload.fontFamily;
      state.homepageTitle = payload.homepageTitle;
    });
    builder.addCase(deleteItem, (state, { payload }) => {
      const { rowNum, itemNum } = payload;
      const { rows } = state;
      _.pullAt(rows[rowNum], itemNum);
    });
  },
});

export const {
  addRow,
  deleteRow,
  addItemBefore,
  updateItem,
  relocateRow,
  addItemAtEndOfRow,
  setHomepagerizerAddress,
  setFontFamily,
  setHomepageTitle,
} = slice.actions;

export const selectRows = (state) => state[reducerName].rows;
export const selectItem = (rowNum, itemNum) => (state) => {
  if (_.isNil(rowNum) || _.isNil(itemNum)) {
    return null;
  }
  return state[reducerName].rows[rowNum][itemNum];
};
export const selectHomepagerizerAddress = (state) =>
  state[reducerName].homepagerizerAddress;
export const selectFontFamily = (state) => state[reducerName].fontFamily;
export const selectHomepageTitle = (state) => state[reducerName].homepageTitle;

export default slice.reducer;
