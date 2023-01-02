import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import eyeicon from "../icons/eyeicon.png";
import eyestrike from "../icons/eyestrike.png";
import { logIn } from "../actions";
import { MobileView, BrowserView } from "react-device-detect";
import Loader from "../components/Loader";
import axios from "axios";

import { ReactComponent as Mintervalclock } from "../icons/mintervalclock.svg";
import { ReactComponent as CenterDot } from "../icons/clock-assets/CenterDot.svg";
import { ReactComponent as ClockFrame } from "../icons/clock-assets/ClockFrame.svg";
import { ReactComponent as ClockHand } from "../icons/clock-assets/ClockHand.svg";
import Cookies from "js-cookie";
const Landing = () => {
  // const [cookies, setCookie] = useCookies();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.visual.mode);
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const textColor = mode === "DARK" ? "DarkModeFont" : "LightModeFont";
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVis = () => {
    setPasswordShown(!passwordShown);
  };
  useEffect(() => {
    //check to see if we are logged in in local storage
    //if we are logged in, dispatch the information to redux
    //store, and go to daily

    const loggedInUser = JSON.parse(localStorage.getItem("user")); //forgot to close
    console.log(loggedInUser);
    let persistLog = false;
    if (loggedInUser) {
      persistLog = true;
      dispatchUser(loggedInUser);
    }
    if (loggedIn || persistLog) {
      navigate("/daily");
    }
  });

  const dispatchUser = (info) => {
    //redundant function
    dispatch(
      logIn({
        email: info.email,
        name: info.name,
        username: info.username,
        userId: info._id,
      })
    );
  };

  const handleSubmit = async (event) => {
    //on submitting, make the api post request to the login route
    //save the login information into local storage
    //

    event.preventDefault();
    setIsLoading(true);
    console.log(event.target);
    const email = event.target.email.value;
    const password = event.target.password.value;
    let data = { email, password };
    axios
      .post("api/auth/login", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch(
          logIn({
            email: email,
            name: res.data.user.name,
            username: res.data.user.username,
            userId: res.data.user._id,
          })
        );
        setIsLoading(false);
        navigate("/daily");
      })
      .catch((err) => {
        if (err?.response?.data) {
          console.log(err.response.data);
          setErrors([err.response.data.error]);
          setIsLoading(false);
        }
      });
  };
  const goTo = (destination) => {
    navigate(destination);
  };
  const log = (email) => {
    dispatch(logIn());
  };

  return (
    <>
      <BrowserView>
        <div className="landing-gradient">
          <div className="clock-holder">
            <div className="clock-frame">
              <ClockFrame />
            </div>
            <div className="clock-hand-holder">
              <div className="clock-hand">
                <ClockHand width="40px" />
              </div>
            </div>
            <div className="clock-hand-holder">
              <div className="clock-hand-2">
                <ClockHand width="40px" />
              </div>
            </div>
            <div className="center-dot">
              <CenterDot width="12px" />
            </div>
          </div>
          <div className="landing-header bold logo-color">Minterval</div>
          <div className="landing-sub-header-holder">
            <div className="landing-sub-header DarkModeFont">
              gives your posts{" "}
              <div className="landing-sub-header LogoText inline bold">
                meaning
              </div>
              .
            </div>
          </div>
          <div className="landing-body-holder">
            <div className="landing-body DarkModeFont">
              What if everyone could make one post per day, week, or month?
              <br />
              Posts would mean more, right?
            </div>
          </div>
          <div className="loader">{isLoading ? <Loader /> : ""}</div>
          <div className="log-in-area">
            {/* <Mintervalclock /> */}

            <form onSubmit={handleSubmit}>
              <input
                className="login-input login-username-position"
                type="text"
                name="email"
                placeholder="Email "
              />
              <div>
                <input
                  className="login-input login-password-position"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Password "
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
                <label className="error-text">{errors ? errors : ""}</label>
              </div>
              <div>
                <input
                  disabled={isLoading}
                  type="submit"
                  className="login-button vertical-spacing"
                  value="Log in"
                ></input>
              </div>
            </form>
          </div>

          <button
            onClick={() => goTo("/createaccount")}
            className="login-button signup-button"
          >
            Sign up
          </button>
          <div className="bottom-link-holder">
            <div className="inline bottom-link">about</div>
            <div className="inline bottom-link">contact</div>
            <div className="inline bottom-link">privacy policy</div>
            <div className="inline bottom-link">help</div>
          </div>
        </div>
      </BrowserView>
      {/* 
      
      
      
      
      
      MOBILE HERE 
      
      */}
      <MobileView>
        <h1 className="LogoText font-patua LogoSize top-div">Minterval</h1>

        <div className="mobile-container top-margin">
          <div className="centered-div parent">
            <form onSubmit={handleSubmit}>
              <h1 className="font-patua">Welcome back!</h1>
              <input
                className="mobile-input"
                type="text"
                name="email"
                placeholder="email"
              />
              <div>
                <input
                  className="mobile-input vertical-spacing"
                  type={passwordShown ? "text" : "password"}
                  name="password"
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
                <label className="error-text">{errors ? errors : ""}</label>
              </div>
              <div>
                <input
                  disabled={isLoading}
                  type="submit"
                  className="button-log vertical-spacing"
                />
              </div>
            </form>
            <div className="horizontal-line">{isLoading ? <Loader /> : ""}</div>

            <h1 className="font-patua">Sign up</h1>
            <button
              onClick={() => goTo("/createaccount")}
              className="button-log button-sign vertical-spacing"
            >
              Create an account
            </button>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default Landing;

//this was the origininal, if i need to go back
{
  /* <BrowserView>
        <div className="landing-gradient">
          <h1 className="LogoText font-patua LogoSize top-div">Minterval</h1>
          <div className="container top-margin">
            <div className="vertical-line">{isLoading ? <Loader /> : ""}</div>
            <div className="parent">
              <div className="left">
                <form onSubmit={handleSubmit}>
                  <h1 className="font-patua">Log in</h1>
                  <input
                    className="input"
                    type="text"
                    name="email"
                    placeholder="email"
                  />
                  <div>
                    <input
                      className="input vertical-spacing"
                      type={passwordShown ? "text" : "password"}
                      name="password"
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
                    <label className="error-text">{errors ? errors : ""}</label>
                  </div>
                  <div>
                    <input
                      disabled={isLoading}
                      type="submit"
                      className="button-log vertical-spacing"
                      value="Go!"
                    ></input>
                  </div>
                </form>
              </div>

              <div className="right">
                <h1 className="font-patua">Sign up</h1>
                <button
                  onClick={() => goTo("/createaccount")}
                  className="button-log button-sign vertical-spacing"
                >
                  Create an <br /> account
                </button>
              </div>
            </div>
          </div>
        </div>
      </BrowserView> */
}
