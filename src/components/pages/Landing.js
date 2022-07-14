import React from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import eyeicon from "../../eyeicon.png";
import eyestrike from "../../eyestrike.png";
import Footer from "../Footer";
const Landing = () => {
  const mode = useSelector((state) => state.visual.mode);
  const textColor = mode === "DARK" ? "DarkModeFont" : "#LightModeFont";
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVis = () => {
    setPasswordShown(!passwordShown);
  };

  const goTo = (destination) => {
    navigate(destination);
  };
  return (
    <>
      <h1 className="LogoText font-patua LogoSize centered-div">Mynt</h1>
      <div className="container top-margin">
        <div className=" parent">
          <div className="left">
            <form>
              <h1 className="font-patua">Log in</h1>
              <input
                className="input"
                type="text"
                name="name"
                placeholder="email"
              />
              <div>
                <input
                  className="input vertical-spacing"
                  type={passwordShown ? "text" : "password"}
                  password="password"
                  placeholder="password"
                />

                <img
                  className={`${
                    passwordShown ? "eye-logo-open" : "eye-logo-closed"
                  }`}
                  src={passwordShown ? eyeicon : eyestrike}
                  alt="eye"
                  onClick={togglePasswordVis}
                ></img>
              </div>
              <div>
                <input type="submit" className="button-log vertical-spacing" />
              </div>
            </form>
          </div>
          <div className="vertical-line"></div>
          <div className="right">
            <h1 className="font-patua">Sign up</h1>
            <button
              onClick={() => goTo("/createaccount")}
              className="button-log button-sign vertical-spacing"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
