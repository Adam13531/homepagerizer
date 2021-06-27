import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./colorsSlice";
import contentReducer from "./contentSlice";
import keyboardReducer from "./keyboardSlice";

export default configureStore({
  reducer: {
    colors: colorsReducer,
    content: contentReducer,
    keyboard: keyboardReducer,
  },
});
