import { createSlice } from "@reduxjs/toolkit";
import { deleteItem } from "./actions";

const reducerName = "editing";

export const slice = createSlice({
  name: reducerName,
  initialState: {
    /**
     * @type {?number} - the row number of the item we're editing, or null if we
     * aren't editing anything.
     */
    rowNum: null,
    itemNum: null,

    /**
     * If true, the import-homepage dialog is open.
     * @type {boolean}
     */
    isImportDialogOpen: false,
  },
  reducers: {
    setEditingItem: {
      reducer: (state, { payload }) => {
        const { rowNum, itemNum } = payload;
        state.rowNum = rowNum;
        state.itemNum = itemNum;
      },
      prepare: (rowNum, itemNum) => {
        return { payload: { rowNum, itemNum } };
      },
    },
    setShowImportDialog: (state, { payload }) => {
      state.isImportDialogOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteItem, (state, { payload }) => {
      const { rowNum, itemNum } = payload;
      // If you deleted the item that was being edited, then you are no longer
      // editing an item.
      if (rowNum === state.rowNum && itemNum === state.itemNum) {
        state.rowNum = null;
        state.itemNum = null;
      }
    });
  },
});

export const { setEditingItem, setShowImportDialog } = slice.actions;

export const selectEditingItem = (state) => {
  return {
    rowNum: state[reducerName].rowNum,
    itemNum: state[reducerName].itemNum,
  };
};
export const selectIsImportDialogOpen = (state) =>
  state[reducerName].isImportDialogOpen;

export default slice.reducer;
