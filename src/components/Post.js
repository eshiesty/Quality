import React from "react";
import { useSelector } from "react-redux";
const Post = (props) => {
  const mode = useSelector((state) => state.visual.mode);
  return (
    <div
      className={`post-spacing container ${
        mode === "DARK" ? "post-dark" : "post-light"
      }`}
    >
      <h1 className={`${mode === "DARK" ? "DarkModeFont" : "LightModeFont"}`}>
        this is a post
      </h1>
    </div>
  );
};

export default Post;
