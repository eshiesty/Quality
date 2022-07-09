import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from "../Footer";
const Home = () => {
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  return (
    <div className="centered-div">
      <Header />
      <h1 className={`font-patua ${textColor}`}>
        It's time to get mynti! Landing page!
      </h1>

      <Footer />
    </div>
  );
};

export default Home;
