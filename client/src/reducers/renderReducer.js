import { rerender } from "../actions";
import { createReducer } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

const initial = { render: false };

const renderReducer = createReducer(initial, (builder) => {
  builder.addCase(rerender, (state, action) => {
    state.render = !state.render;
  });
});

export default renderReducer;
