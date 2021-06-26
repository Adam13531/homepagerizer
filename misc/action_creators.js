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

export function updateItem(rowNum, itemNum, params) {
  return {
    type: actions.UPDATE_ITEM,
    rowNum,
    itemNum,
    params,
  };
}

export function deleteItem(rowNum, itemNum) {
  return {
    type: actions.DELETE_ITEM,
    rowNum,
    itemNum,
  };
}
