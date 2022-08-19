import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lightMode, darkMode } from "../../actions";
const ModeButton = (props) => {
  const dispatch = useDispatch();
  const [DarkMode, setDarkMode] = useState(true);
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  const changeMode = () => {
    DarkMode ? dispatch(lightMode()) : dispatch(darkMode());
    setDarkMode(!DarkMode);
  };

  return (
    <span>
      <button className={`button-1 ${textColor}`} onClick={changeMode}>
        Toggle dark/light mode
      </button>
    </span>
  );
};

export default ModeButton;
