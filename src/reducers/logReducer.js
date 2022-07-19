import { createReducer } from "@reduxjs/toolkit";
import { logIn, logOut, signUp } from "../actions";

const INITIAL_LOG = {
  loggedIn: false,
};
const logReducer = createReducer(INITIAL_LOG, (builder) => {
  builder
    .addCase(logIn, (state, payload) => {
      state.loggedIn = true;
      state.currentUser = payload.email;
      console.log(state.currentUser);
    })
    .addCase(logOut, (state, payload) => {
      state.loggedIn = false;
    })
    .addCase(signUp, (state, payload) => {
      //create an account
    });
});

export default logReducer;
