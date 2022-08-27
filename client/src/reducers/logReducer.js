import { createReducer } from "@reduxjs/toolkit";
import { logIn, logOut, signUp } from "../actions";

const INITIAL_LOG = {
  loggedIn: false,
};
const logReducer = createReducer(INITIAL_LOG, (builder) => {
  builder
    .addCase(logIn, (state, action) => {
      state.loggedIn = true;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
    })
    .addCase(logOut, (state, action) => {
      state.loggedIn = false;
      state.email = null;
      state.username = null;
      state.name = null;
      state.password = null;
      state.dob = null;
    })
    .addCase(signUp, (state, action) => {
      state.loggedIn = true;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.confirmpassword = action.payload.confirmpassword;
      state.dob = action.payload.dob;
      state.userId = action.payload.userId;
    });
});

export default logReducer;
