import React from "react";
import "./styles.css";
import { useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-div">
      <h1 onClick={() => navigate("/")} className="LogoText font-patua">
        Mynt
      </h1>
    </div>
  );
};

export default Header;
