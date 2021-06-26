import actions from "./actions";

export function addRow() {
  return {
    type: actions.ADD_ROW,
  };
}

export function deleteRow(rowNum) {
  return {
    type: actions.DELETE_ROW,
    rowNum,
  };
}

export function addItemAtEndOfRow(rowNum) {
  return {
    type: actions.ADD_ITEM_AT_END_OF_ROW,
    rowNum,
  };
}

export function addItemBefore(rowNum, itemNum) {
  return {
    type: actions.ADD_ITEM_BEFORE,
    rowNum,
    itemNum,
  };
}
