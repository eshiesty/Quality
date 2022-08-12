import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import VisualProfile from "../components/VisualProfile";
import styles from "./styles.css";
import { MobileView, BrowserView } from "react-device-detect";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.login);
  return (
    <>
      <BrowserView>
        <div>
          <Header />
          <div className="profile-holder">
            <VisualProfile user={user} platform="browser" />
          </div>
          <Footer />
        </div>
      </BrowserView>
      <MobileView>
        <div>
          <Header />
          <div className="mobile-profile-holder">
            <VisualProfile user={user} platform="mobile" />
          </div>
          <Footer />
        </div>
      </MobileView>
    </>
  );
};

export default Profile;
