import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Styles from "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logOut } from "../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logIn } from "../../actions";

import { motion, AnimatePresence } from "framer-motion";
const LogDropdown = () => {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.visual.mode);
  const [hidden, setHidden] = useState(true);
  const currentuser = useSelector((state) => state.login.username);
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.loggedIn);
  const loggedInUser = JSON.parse(localStorage.getItem("user")); //forgot to close

  //Since this is displayed on every page, this will prevent
  //the user from being signed out after a page refresh.
  useEffect(() => {
    if (loginStatus === false) {
      if (loggedInUser) {
        dispatchUser(loggedInUser);
      } else {
        navigate("/");
      }
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
  const menu = () => {
    if (hidden) {
      return <></>;
    } else {
      return (
        <>
          <motion.div
            key="window"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, zIndex: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
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
                    localStorage.clear();
                    navigate("/");
                  });
                }}
              >
                logout
              </button>
            </div>
          </motion.div>
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
