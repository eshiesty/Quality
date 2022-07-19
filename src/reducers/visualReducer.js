import { LIGHT_MODE, DARK_MODE } from "../actions/types";
import { createReducer } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const INITIAL_MODE = {
  mode: "DARK",
};
const bookReducer = createReducer(INITIAL_MODE, (builder) => {
  builder
    .addCase(LIGHT_MODE, (state, action) => {
      state.mode = "LIGHT";
      console.log(action);
    })
    .addCase(DARK_MODE, (state, action) => {
      state.mode = "DARK";
    });
});

export default bookReducer;
