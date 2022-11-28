import React from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import lightprofile from "../../icons/lightprofile.svg";
const Sidebar = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const username = useSelector((state) => state.login.username);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  const [active, setActive] = useState("/");

  useEffect(() => {
    setActive(window.location.pathname);
  });

  const goTo = (destination) => {
    navigate(destination);
  };

  return (
    //this is where the pages I don't want the footer to appear are blacklisted
    <div
      className={`sidebar-positioning ${
        active === "/" || active === "/createaccount" ? "hidden" : ""
      } ${mode === "DARK" ? "DarkModeBack" : "LightModeBack"}`}
    >
      <div
        onClick={() => {
          goTo("/daily");
        }}
      >
        <button
          className={
            "side-button " +
            `${
              active === "/daily" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        >
          daily
        </button>
      </div>
      <div onClick={() => goTo("/weekly")}>
        <button
          className={
            "side-button " +
            `${
              active === "/weekly" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        >
          weekly
        </button>
      </div>
      <div onClick={() => goTo("/monthly")}>
        <button
          className={
            "side-button " +
            `${
              active === "/monthly" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        >
          monthly
        </button>
      </div>
      <div onClick={() => goTo(`/profile/${username}`)}>
        <img className="side-profile-icon pointer" src={lightprofile} />
        <button
          className={
            "side-button " +
            `${
              active === "/profile" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        >
          profile
        </button>
      </div>
      <div onClick={() => goTo("/create")}>
        <button
          className={
            "side-button " +
            `${
              active === "/create" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        >
          create
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
