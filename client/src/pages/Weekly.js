import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostHolder from "../components/PostHolder";
import styles from "./styles.css";
const Weekly = () => {
  return (
    <div>
      <Header />
      <h1>week</h1>
      <PostHolder platform="browser"></PostHolder>
      <Footer />
    </div>
  );
};

export default Weekly;
