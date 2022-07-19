import { createPost, deletePost, editPost, getPost } from "../actions/index";
import { createReducer } from "@reduxjs/toolkit";
import { get } from "mongoose";

const initial = null;

const postReducer = createReducer(initial, (builder) => {
  builder
    .addCase(createPost, (state, action) => {})
    .addCase(deletePost, (state, action) => {})
    .addCase(editPost, (state, action) => {})
    .addCase(getPost, (state, action) => {});
});

export default postReducer;
