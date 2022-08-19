import React from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import LogDropdown from "../LogDropdown";
import mintervalclock from "../../icons/mintervalclock.svg";
import Search from "../Search";
const Header = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  return (
    <div className="centered-div">
      <Search />
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="LogoText font-patua inline"
      >
        Minterval
      </h1>
      <img className="minterval-logo" src={mintervalclock}></img>
      <LogDropdown className="inline" />
    </div>
  );
};

export default Header;
