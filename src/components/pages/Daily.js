import React, { useEffect } from "react";
import Background from "../background";
import { useSelector } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
const Daily = (props) => {
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  return (
    <div>
      <Header />
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <h1 className={`font-patua ${textColor}`}>Daily</h1>
      <Footer />
    </div>
  );
};

export default Daily;
