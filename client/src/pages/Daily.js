import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostHolder from "../components/PostHolder";
import styles from "./styles.css";
const Daily = (props) => {
  return (
    <div>
      <Header />
      <div>
        <PostHolder platform="browser"></PostHolder>
      </div>
      <Footer />
    </div>
  );
};

export default Daily;
