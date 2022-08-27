import { createAction } from "@reduxjs/toolkit";

export const lightMode = createAction("LIGHT_MODE");
export const darkMode = createAction("DARK_MODE");
export const createPost = createAction("CREATE_POST");
export const deletePost = createAction("DELETE_POST");
export const getPost = createAction("GET_POST");
export const editPost = createAction("EDIT_POST");
export const logIn = createAction("LOG_IN");
export const logOut = createAction("LOG_OUT");
export const signUp = createAction("SIGN_UP");
export const rerender = createAction("RERENDER");
