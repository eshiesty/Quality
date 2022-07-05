import { LIGHT_MODE, DARK_MODE } from "./types";
import { createAction } from "@reduxjs/toolkit";

export const lightMode = createAction("LIGHT_MODE");
export const darkMode = createAction("DARK_MODE");
// export const lightMode = () => {
//   return {
//     type: LIGHT_MODE,
//   };
// };
// export const darkMode = () => {
//   return {
//     type: DARK_MODE,
//   };
// };
