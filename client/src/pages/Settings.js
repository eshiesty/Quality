import React from "react";
import styles from "./styles.css";
import Header from "../components/Header/Header";
import ModeButton from "../../src/components/ModeButton";
import Footer from "../components/Footer";
const Settings = () => {
  return (
    <div>
      <Header />
      <ModeButton />
      <Footer />
    </div>
  );
};

export default Settings;
