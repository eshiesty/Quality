import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VisualProfile from "../components/VisualProfile";
import styles from "./styles.css";
import { MobileView, BrowserView } from "react-device-detect";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
const Profile = () => {
  // const [profile, setProfile] = useState({});
  // axios.get("/api/auth/retrieve/username", { username }).then((res) => {
  //   setProfile(res);
  //   console.log(profile);
  // });

  const user = useSelector((state) => state.login);
  return (
    <>
      <BrowserView>
        <div>
          <Header />
          <Sidebar />
          <div className="profile-holder">
            <VisualProfile platform="browser" />
          </div>
          <Footer />
        </div>
      </BrowserView>
      <MobileView>
        <div>
          <Header />
          <div className="mobile-profile-holder">
            <VisualProfile platform="mobile" />
          </div>
          <Footer />
        </div>
      </MobileView>
    </>
  );
};

export default Profile;
