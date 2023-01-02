import React from "react";
import "./styles.css";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { ReactComponent as ProfileIcon } from "../../icons/profileicon.svg";
import { ReactComponent as CreateIcon } from "../../icons/createicon.svg";
import { ReactComponent as ActivityIcon } from "../../icons/whitebellplain.svg";
import lightmonthly from "../../icons/lightmonthly.svg";
import { ReactComponent as HomeIcon } from "../../icons/homeicon-light.svg";

const Sidebar = () => {
  const MotionProfileIcon = motion(ProfileIcon);
  const MotionHomeIcon = motion(HomeIcon);
  const MotionCreateIcon = motion(CreateIcon);
  const MotionActivityIcon = motion(ActivityIcon);
  const location = useLocation();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const username = useSelector((state) => state.login.username);
  const textColor = mode === "DARK" ? "DarkModeFont" : "LightModeFont";
  const [active, setActive] = useState("/");
  const attributeColor = mode === "DARK" ? "#FFFDE7" : "#282828";

  const goTo = (destination) => {
    navigate(destination);
  };

  return (
    //sidebar
    <div
      className={`sidebar-positioning
        //{ active === "/" || active === "/createaccount" ? "hidden" : ""}
       ${mode === "DARK" ? "DarkModeBack" : "LightModeBack"}`}
    >
      {/* profile */}
      <div
        className="side-option-holder pointer"
        onClick={() => goTo(`/profile/${username}`)}
      >
        {location.pathname.includes("/profile") ? (
          <MotionProfileIcon
            fill={attributeColor}
            stroke={attributeColor}
            initial={{ fill: "FFFDE700", scale: 0.8 }}
            animate={{ fill: "#FFFDE7", scale: 1 }}
            transition={{ ease: "easeOut" }}
          />
        ) : (
          <ProfileIcon fill="none" stroke={attributeColor} />
        )}

        <div
          className={`side-button-content ${
            mode === "DARK" ? "light-font" : "dark-font"
          }`}
        >
          &nbsp;&nbsp;profile
        </div>
        <div
          className={
            "side-button " +
            `${
              active === "/profile" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        ></div>
      </div>
      {/* create */}
      <div
        className="side-option-holder pointer"
        onClick={() => goTo(`/create`)}
      >
        {location.pathname.includes("/create") ? (
          <MotionCreateIcon
            fill={attributeColor}
            stroke={attributeColor}
            initial={{ fill: "FFFDE700", scale: 0.8 }}
            animate={{ fill: "#FFFDE7", scale: 1 }}
            transition={{ ease: "easeOut" }}
          />
        ) : (
          <CreateIcon fill="none" stroke={attributeColor} />
        )}

        <div
          className={`side-button-content ${
            mode === "DARK" ? "light-font" : "dark-font"
          }`}
        >
          &nbsp;&nbsp;create
        </div>
        <div
          className={
            "side-button " +
            `${
              active === "/create" ? "footer-button-selected" : ""
            } ${textColor}`
          }
        ></div>
      </div>
      {/* activity */}
      <div
        className="side-option-holder pointer"
        onClick={() => goTo("/activity")}
      >
        {location.pathname.includes("/activity") ? (
          <MotionActivityIcon
            fill={attributeColor}
            stroke={attributeColor}
            initial={{ fill: "FFFDE700", scale: 0.8 }}
            animate={{ fill: "#FFFDE7", scale: 1 }}
            transition={{ ease: "easeOut" }}
          />
        ) : (
          <ActivityIcon fill="none" stroke={attributeColor} />
        )}
        <div
          className={`side-button-content ${
            mode === "DARK" ? "light-font" : "dark-font"
          }`}
        >
          activity
        </div>
      </div>
      <div
        className="side-option-holder pointer"
        onClick={() => goTo(`/daily`)}
      >
        {location.pathname == "/daily" ||
        location.pathname == "/weekly" ||
        location.pathname == "/monthly" ? (
          <MotionHomeIcon
            fill={attributeColor}
            stroke={attributeColor}
            initial={{ fill: "FFFDE700", scale: 0.8 }}
            animate={{ fill: "#FFFDE7", scale: 1 }}
            transition={{ ease: "easeOut" }}
          />
        ) : (
          <HomeIcon fill="none" stroke={attributeColor} />
        )}
        {/* home */}
        <div
          className={`side-button-content ${
            mode === "DARK" ? "light-font" : "dark-font"
          }`}
        >
          &nbsp;&nbsp;home
        </div>
        <div
          className={
            "side-button " +
            `${active === "/home" ? "footer-button-selected" : ""} ${textColor}`
          }
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
