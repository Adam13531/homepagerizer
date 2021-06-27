import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./colorsSlice";
import contentReducer from "./contentSlice";

export default configureStore({
  reducer: {
    colors: colorsReducer,
    content: contentReducer,
  },
});
