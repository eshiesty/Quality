import React from "react";
import Styles from "./styles.css";

const ProfilePhoto = (props) => {
  if (props.platform === "browser") {
    return <div className="dot"></div>;
  } else if (props.platform === "mobile") {
    return <div className="mobile-dot"></div>;
  }
};

export default ProfilePhoto;
