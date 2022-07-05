import React from "react";
import ModeButton from "./ModeButton";
import { useNavigate } from "react-router";
import { useState } from "react";
const Footer = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("/home");

  const goTo = (destination) => {
    console.log("clicked");
    setActive(destination);
    navigate(destination);
  };

  return (
    <div className="bottom-div">
      <button
        className={
          "button-1 " + `${active === "/daily" ? "button-1-selected" : ""}`
        }
        onClick={() => goTo("/daily")}
      >
        daily
      </button>
      <button
        className={
          "button-1 " + `${active === "/weekly" ? "button-1-selected" : ""}`
        }
        onClick={() => goTo("/weekly")}
      >
        weekly
      </button>
      <button
        className={
          "button-1 " + `${active === "/monthly" ? "button-1-selected" : ""}`
        }
        onClick={() => goTo("/monthly")}
      >
        monthly
      </button>
      <button
        className={
          "button-1 " + `${active === "/profile" ? "button-1-selected" : ""}`
        }
        onClick={() => goTo("/profile")}
      >
        profile
      </button>
      <button
        className={
          "button-1 " + `${active === "/create" ? "button-1-selected" : ""}`
        }
        onClick={() => goTo("/create")}
      >
        create
      </button>
    </div>
  );
};

export default Footer;
