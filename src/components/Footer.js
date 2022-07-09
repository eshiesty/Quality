import React from "react";
import ModeButton from "./ModeButton";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Footer = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
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
      className={`bottom-div ${
        active === "/" || active === "/createaccount" ? "hidden" : ""
      }`}
    >
      <button
        className={
          "button-1 " +
          `${active === "/daily" ? "button-1-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/daily")}
      >
        daily
      </button>
      <button
        className={
          "button-1 " +
          `${active === "/weekly" ? "button-1-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/weekly")}
      >
        weekly
      </button>
      <button
        className={
          "button-1 " +
          `${active === "/monthly" ? "button-1-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/monthly")}
      >
        monthly
      </button>
      <button
        className={
          "button-1 " +
          `${active === "/profile" ? "button-1-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/profile")}
      >
        profile
      </button>
      <button
        className={
          "button-1 " +
          `${active === "/create" ? "button-1-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/create")}
      >
        create
      </button>
    </div>
  );
};

export default Footer;
