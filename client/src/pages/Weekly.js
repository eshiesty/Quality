import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostHolder from "../components/PostHolder";
import styles from "./styles.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../components/Feed";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
const Weekly = () => {
  const id = useSelector((state) => state.login.userId);
  const [postArray, setPostArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    renderPosts();
  }, [id]);
  const renderPosts = () => {
    axios.post("/api/posts/getFollowingWeekly", { id }).then((res) => {
      setPostArray(res.data);
      setIsLoading(false);
      return res.data;
    });
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        <Feed ids={postArray} />
        <div className="loader">{isLoading ? <Loader /> : ""}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Weekly;
