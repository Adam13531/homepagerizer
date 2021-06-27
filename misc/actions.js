import { createEnum } from "./util";

const actions = createEnum([
  "ADD_ROW",
  "DELETE_ROW",
  "ADD_ITEM_AT_END_OF_ROW",
  "ADD_ITEM_BEFORE",
  "UPDATE_ITEM",
  "DELETE_ITEM",
  "SET_LISTENING_FOR_HOTKEY",
  "SET_LAST_PRESSED_HOTKEY",
  "SET_BG_COLOR",
  "SET_TEXT_COLOR",
  "SET_LINK_COLOR",
  "SET_ACCENT_COLOR",
  "SET_HOVER_COLOR",
  "SET_HOMEPAGERIZER_ADDRESS",
  "LOAD_SAVED_STATE",
]);

export default actions;
