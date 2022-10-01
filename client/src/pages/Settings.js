import React from "react";
import styles from "./styles.css";
import Header from "../components/Header";
import ModeButton from "../../src/components/ModeButton";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <ModeButton />
      <button onClick={() => navigate("/editprofile")} className="button-1">
        Edit profile
      </button>
      <Footer />
    </div>
  );
};

export default Settings;
