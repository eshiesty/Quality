import React from "react";

import thunkMiddleware from "redux-thunk";

import App from "./components/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { CookiesProvider } from "react-cookie";
import * as ReactDOMClient from "react-dom/client";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
//const store = legacy_createStore(reducers, applyMiddleware(thunk));
const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
);
