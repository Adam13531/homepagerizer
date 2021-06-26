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
