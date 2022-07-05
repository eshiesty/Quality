import { LIGHT_MODE, DARK_MODE } from "../actions/types";
import { createReducer } from "@reduxjs/toolkit";
//import _ from "lodash";
const INITIAL_STATE = {
  mode: "DARK",
};
const bookReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(LIGHT_MODE, (state, action) => {
      state.mode = "LIGHT";
      //state = { ...state, mode: "LIGHT" };
    })
    .addCase(DARK_MODE, (state, action) => {
      //state = { ...state, mode: "DARK" };
      state.mode = "DARK";
    });
});

export default bookReducer;
// export default (state = { INITIAL_STATE }, action) => {
//   console.log(action.type);
//   switch (action.type) {
//     case LIGHT_MODE:
//       return { ...state, mode: "LIGHT" };
//     case DARK_MODE:
//       return { ...state, mode: "DARK" };
//     default:
//       return state;
//   }
// };
