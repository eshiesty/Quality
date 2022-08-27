import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.css";
const Footer = () => {
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
      className={`bottom-div ${
        active === "/" || active === "/createaccount" ? "hidden" : ""
      } ${mode === "DARK" ? "DarkModeBack" : "LightModeBack"}`}
    >
      <button
        className={
          "footer-button " +
          `${active === "/daily" ? "footer-button-selected" : ""} ${textColor}`
        }
        onClick={() => {
          goTo("/daily");
        }}
      >
        daily
      </button>
      <button
        className={
          "footer-button " +
          `${active === "/weekly" ? "footer-button-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/weekly")}
      >
        weekly
      </button>
      <button
        className={
          "footer-button " +
          `${
            active === "/monthly" ? "footer-button-selected" : ""
          } ${textColor}`
        }
        onClick={() => goTo("/monthly")}
      >
        monthly
      </button>
      <button
        className={
          "footer-button " +
          `${
            active === "/profile" ? "footer-button-selected" : ""
          } ${textColor}`
        }
        onClick={() => goTo(`/profile/${username}`)}
      >
        profile
      </button>
      <button
        className={
          "footer-button " +
          `${active === "/create" ? "footer-button-selected" : ""} ${textColor}`
        }
        onClick={() => goTo("/create")}
      >
        create
      </button>
    </div>
  );
};

export default Footer;
