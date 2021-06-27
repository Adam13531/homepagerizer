import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./colorsSlice";

export default configureStore({
  reducer: {
    colors: colorsReducer,
  },
});
