import { combineReducers } from "@reduxjs/toolkit";
//import { reducer as formReducer } from "redux-form";
import visualReducer from "./visualReducer";

const rootReducer = combineReducers({
  visual: visualReducer,
});

export default rootReducer;
// export default combineReducers({
//   //only have 1 rn
//   visual: visualReducer,
// });
