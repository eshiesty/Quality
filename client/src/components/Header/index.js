import React from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import LogDropdown from "../LogDropdown";
import mintervalclock from "../../icons/mintervalclock.svg";
import Search from "../Search";
import darkbellplain from "../../icons/darkbellplain.svg";
import whitebellplain from "../../icons/whitebellplain.svg";
const Header = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  return (
    <div
      className={`centered-div-header top-bar ${
        mode === "DARK" ? "DarkModeBack" : "LightModeBack"
      }`}
    >
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
      <img
        onClick={() => {
          navigate("/activity");
        }}
        className="activity-button"
        src={whitebellplain}
      ></img>
    </div>
  );
};

export default Header;
