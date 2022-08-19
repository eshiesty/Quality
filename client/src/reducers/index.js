import { combineReducers } from "@reduxjs/toolkit";
import visualReducer from "./visualReducer";
import postReducer from "./postReducer";
import logReducer from "./logReducer";
const rootReducer = combineReducers({
  visual: visualReducer,
  post: postReducer,
  login: logReducer,
});

export default rootReducer;
