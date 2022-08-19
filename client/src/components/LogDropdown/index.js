import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Styles from "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logOut } from "../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const LogDropdown = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const [hidden, setHidden] = useState(true);
  const currentuser = useSelector((state) => state.login.username);
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.loggedIn);

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
    }
  });
  const menu = () => {
    if (hidden) {
      return <></>;
    } else {
      return (
        <>
          <div>
            <hr
              className={`divider-line ${
                mode === "DARK" ? "light-background" : "dark-background"
              }`}
            />
            <button
              className={`drop-down-option ${
                mode === "DARK" ? "light-component" : "dark-component"
              }`}
              onClick={() => {
                setHidden(!hidden);
                navigate("/settings");
              }}
            >
              settings
            </button>
          </div>
          <div>
            <hr
              className={`divider-line ${
                mode === "DARK" ? "light-background" : "dark-background"
              }`}
            />
            <button
              className={`drop-down-option ${
                mode === "DARK" ? "light-component" : "dark-component"
              }`}
              onClick={() => {
                setHidden(!hidden);
              }}
            >
              help
            </button>
          </div>
          <div>
            <hr
              className={`divider-line ${
                mode === "DARK" ? "light-background" : "dark-background"
              }`}
            />
            <button
              className={`drop-down-option ${
                mode === "DARK" ? "light-component" : "dark-component"
              }`}
              onClick={() => {
                setHidden(!hidden);
                axios.put("/api/auth/logout").then((res) => {
                  dispatch(logOut({}));
                  console.log("api request completed");
                });
              }}
            >
              logout
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="drop-down-holder">
        <button
          onMouseEnter={() => setHidden(false)}
          onClick={() => {
            setHidden(!hidden);
          }}
          className={`drop-down-cover ${
            mode === "DARK" ? "light-component" : "dark-component"
          }`}
        >
          {currentuser ? currentuser : "user"}⌄
        </button>
        {menu()}
      </div>
    </>
  );
};

export default LogDropdown;
