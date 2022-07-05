import React from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { lightMode, darkMode } from "../actions";

const ModeButton = (props) => {
  const dispatch = useDispatch();
  const [DarkMode, setDarkMode] = useState(true);
  const changeMode = () => {
    DarkMode ? dispatch(lightMode()) : dispatch(darkMode());

    setDarkMode(!DarkMode);
    console.log(DarkMode);
  };

  return (
    <span className="bottom-div">
      <button className="button-1" onClick={changeMode}>
        Change Mode
      </button>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
        <button className="button-1">Rick Roll</button>
      </a>
    </span>
  );
};

export default ModeButton;
