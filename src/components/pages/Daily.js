import React, { useEffect } from "react";
import Background from "../background";
import { useSelector } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import PostHolder from "../PostHolder";
const Daily = (props) => {
  return (
    <div>
      <Header />
      <div>
        <PostHolder></PostHolder>
      </div>
      <Footer />
    </div>
  );
};

export default Daily;
