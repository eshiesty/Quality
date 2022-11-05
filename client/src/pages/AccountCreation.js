import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import eyeicon from "../icons/eyeicon.png";
import eyestrike from "../icons/eyestrike.png";
import { signUp, logIn } from "../actions";
import { useNavigate } from "react-router";
import { MobileView, BrowserView } from "react-device-detect";
import axios from "axios";
import styles from "./styles.css";
const AccountCreation = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const togglePasswordVis = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmpassword = event.target.confirmpassword.value;
    const username = event.target.username.value;
    const name = event.target.name.value;
    const dob = event.target.dob.value;

    dispatch(
      signUp({
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        username: username,
        name: name,
        dob: dob, //fix this later
      })
    );

    let data = { email, password, confirmpassword, username, name, dob };
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        console.log(res);
        dispatch(
          logIn({
            email: email,
            name: name,
            username: username,
            userId: res.data._id,
          })
        );
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/daily");
      })
      .catch((err) => {
        if (err?.response?.data) {
          console.log(err.response.data);
          setErrors([
            err.response.data.email,
            "\n",
            err.response.data.password,
            "\n",
            err.response.data.confirmpassword,
            "\n",
            err.response.data.username,
            "\n",
            err.response.data.name,
            "\n",
            err.response.data.dob,
            "\n",
            err.response.data.error,
          ]);
        }
      });
  };

  return (
    <>
      <BrowserView>
        <h1
          onClick={() => navigate("/")}
          className="LogoText font-patua LogoSize centered-div"
        >
          Minterval
        </h1>
        <div className="container-sign top-margin">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <h1 className="font-patua"> Login info</h1>

              <input
                className="input-createacc"
                type="text"
                name="email"
                placeholder="email"
              />

              <div>
                <input
                  className="input-createacc vertical-spacing"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="password"
                />
                <div>
                  <input
                    className="input-createacc vertical-spacing"
                    type={passwordShown ? "text" : "password"}
                    name="confirmpassword"
                    placeholder="confirm password"
                  />

                  <img
                    className={` ${
                      passwordShown ? "eye-logo-open" : "eye-logo-closed"
                    }`}
                    src={passwordShown ? eyeicon : eyestrike}
                    alt="eye"
                    onClick={togglePasswordVis}
                  />
                </div>
              </div>
            </div>
            <div className="right">
              <h1 className="font-patua">Profile info</h1>
              <div>
                <div>
                  <input
                    className="input-createacc"
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                </div>
                <div className="vertical-spacing">
                  <input
                    className="input-createacc"
                    type="text"
                    name="name"
                    placeholder="display name"
                  />
                </div>
                <div className="vertical-spacing">
                  <input
                    className="input-createacc"
                    type="date"
                    name="dob"
                    placeholder="Date of birth"
                  />
                </div>
                <div>
                  <label className="error-text">{errors ? errors : ""}</label>
                </div>
                <div>
                  <input
                    type="submit"
                    className="button-log vertical-spacing"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </BrowserView>
      <MobileView>
        <h1
          onClick={() => navigate("/")}
          className="LogoText font-patua LogoSize centered-div"
        >
          Minterval
        </h1>
        <div className="mobile-container top-margin">
          <div className="centered-div">
            <form onSubmit={handleSubmit}>
              <h1 className="font-patua"> Login info</h1>

              <input
                className="mobile-input"
                type="text"
                name="email"
                placeholder="email"
                autoCapitalize="none"
                autoCorrect="false"
              />

              <div>
                <input
                  className="mobile-input vertical-spacing"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  autoCapitalize="none"
                  autoCorrect="false"
                />
                <div>
                  <input
                    className="mobile-input vertical-spacing"
                    type={passwordShown ? "text" : "password"}
                    name="confirmpassword"
                    placeholder="confirm password"
                    autoCapitalize="none"
                    autoCorrect="false"
                  />
                </div>
                <img
                  className={`vertical-spacing ${
                    passwordShown
                      ? "mobile-eye-logo-open"
                      : "mobile-eye-logo-closed"
                  }`}
                  src={passwordShown ? eyeicon : eyestrike}
                  alt="eye"
                  onClick={togglePasswordVis}
                />
              </div>

              <h1 className="font-patua">Profile info</h1>
              <div>
                <div>
                  <input
                    className="mobile-input"
                    type="text"
                    name="username"
                    placeholder="username"
                    autoCapitalize="none"
                    autoCorrect="false"
                  />
                </div>
                <div className="vertical-spacing">
                  <input
                    className="mobile-input"
                    type="text"
                    name="name"
                    placeholder="display name"
                    autoCapitalize="words"
                    autoCorrect="false"
                  />
                </div>
                <div className="vertical-spacing">
                  <label className="font-patua">
                    date of birth
                    <input
                      className="mobile-input"
                      type="date"
                      name="dob"
                      placeholder="Date of birth"
                    />
                  </label>
                </div>
                <div>
                  <label className="error-text">{errors ? errors : ""}</label>
                </div>
                <div>
                  <input
                    type="submit"
                    className="button-log vertical-spacing"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default AccountCreation;
