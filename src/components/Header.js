import React from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import ModeButton from "./ModeButton";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  return (
    <div className="centered-div">
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
        <button className={`button-1 ${textColor}`}>Rick</button>
      </a>
      <h1 onClick={() => navigate("/")} className="LogoText font-patua inline">
        Mynt
      </h1>
      <ModeButton />
    </div>
  );
};

export default Header;
