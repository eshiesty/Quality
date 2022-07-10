import React from "react";
import { useState } from "react";
import eyeicon from "../../eyeicon.png";
import eyestrike from "../../eyestrike.png";
const AccountCreation = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVis = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <h1 className="LogoText font-patua LogoSize centered-div">Mynt</h1>
      <div className="container top-margin">
        <form>
          <div className="left">
            <h1 className="font-patua"> Login info</h1>

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

              <input
                className="input vertical-spacing"
                type={passwordShown ? "text" : "password"}
                password="password"
                placeholder="confirm password"
              />

              <img
                className="eyelogo"
                src={passwordShown ? eyeicon : eyestrike}
                alt="eye"
                onClick={togglePasswordVis}
              ></img>
            </div>
          </div>
          <div className="right">
            <h1 className="font-patua">Profile info</h1>
            <div>
              <div>
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="@mynt"
                />
              </div>
              <div className="vertical-spacing">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Ellis Mynt"
                />
              </div>
              <div className="vertical-spacing">
                <input
                  className="input"
                  type="date"
                  name="name"
                  placeholder="Date of birth"
                />
              </div>
              <div>
                <input type="submit" className="button-log vertical-spacing" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountCreation;
