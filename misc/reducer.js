import actions from "./actions";
import uniqid from "uniqid";

function makeNewTextItem() {
  return {
    text: "New item",
    url: "",
    keyboardShortcut: null,
    id: uniqid.time(),
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case actions.ADD_ROW:
      return { ...state, rows: [...state.rows, []] };
    case actions.DELETE_ROW: {
      const { rowNum } = action;
      return {
        ...state,
        rows: [...state.rows.slice(0, rowNum), ...state.rows.slice(rowNum + 1)],
      };
    }
    case actions.ADD_ITEM_BEFORE: {
      const { rowNum, itemNum } = action;
      const newItem = makeNewTextItem();
      const clonedRow = _.clone(state.rows[rowNum]);
      clonedRow.splice(itemNum, 0, newItem);

      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === rowNum ? clonedRow : row
        ),
      };
    }
    case actions.UPDATE_ITEM: {
      const { rowNum, itemNum, params } = action;

      const clonedRow = _.clone(state.rows[rowNum]);
      clonedRow[itemNum] = {
        ...clonedRow[itemNum],
        ...params,
      };
      return {
        ...state,
        rows: [
          ...state.rows.slice(0, rowNum),
          clonedRow,
          ...state.rows.slice(rowNum + 1),
        ],
      };
    }
    case actions.ADD_ITEM_AT_END_OF_ROW: {
      const { rowNum } = action;
      const newItem = makeNewTextItem();
      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === rowNum ? [...row, newItem] : row
        ),
      };
    }
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}
