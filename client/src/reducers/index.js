import { combineReducers } from "@reduxjs/toolkit";
import visualReducer from "./visualReducer";
import postReducer from "./postReducer";
import logReducer from "./logReducer";
import renderReducer from "./renderReducer";
const rootReducer = combineReducers({
  visual: visualReducer,
  post: postReducer,
  login: logReducer,
  render: renderReducer,
});

export default rootReducer;
