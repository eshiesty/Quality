import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import reduxThunk from "redux-thunk";
import redux from "react-redux";
import App from "./components/App";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import visualReducer from "./reducers/visualReducer";
import * as ReactDOMClient from "react-dom/client";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
//const store = legacy_createStore(reducers, applyMiddleware(thunk));
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
