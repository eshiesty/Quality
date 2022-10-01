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
const Daily = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state) => state.login.userId);
  const [postArray, setPostArray] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    renderPosts();
  }, []);
  const renderPosts = () => {
    axios.post("/api/posts/getFollowingDaily", { id }).then((res) => {
      setPostArray(res.data);
      setIsLoading(false);
      return res.data;
    });
  };

  return (
    <div>
      <Header />
      <div>
        <Feed ids={postArray} />
        <div className="loader">{isLoading ? <Loader /> : ""}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Daily;
