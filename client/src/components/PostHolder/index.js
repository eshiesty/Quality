import React from "react";
import Post from "../Post";
import Styles from "./styles.css";
import axios from "axios";
import { useState } from "react";
const PostHolder = ({ platform, page }, posts) => {
  const [postContentState, setPostContentState] = useState([]);
  const [postTimeState, setPostTimeState] = useState([]);
  let profilePostsContent = [];
  let profilePostsTime = [];
  if (platform === "browser") {
    if (page === "profile") {
      //if on a profile page
      axios.get("/api/posts/view/profileposts").then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          profilePostsContent[i] = res.data[i].content;
          profilePostsTime[i] = res.data[i].createdAt;
        }
        setPostContentState(profilePostsContent);
        setPostTimeState(profilePostsTime);
      });

      return (
        <div className="holder-div">
          <Post
            platform="browser"
            content={postContentState[0]}
            time={postTimeState[0]}
          ></Post>
          <Post
            platform="browser"
            content={postContentState[1]}
            time={postTimeState[1]}
          ></Post>
          <Post platform="browser" props={posts[2]}></Post>
          <Post platform="browser" props={posts[3]}></Post>
          <Post platform="browser" props={posts[4]}></Post>
          <Post platform="browser" props={posts[5]}></Post>
          <Post platform="browser" props={posts[6]}></Post>
          <Post platform="browser" props={posts[7]}></Post>
          <Post platform="browser" props={posts[8]}></Post>
          <Post platform="browser" props={posts[9]}></Post>
        </div>
      );
    } else {
      //if on regular pages
      return (
        <div className="holder-div container">
          <Post platform="browser" props={posts[0]}></Post>
          <Post platform="browser" props={posts[1]}></Post>
          <Post platform="browser" props={posts[2]}></Post>
          <Post platform="browser" props={posts[3]}></Post>
          <Post platform="browser" props={posts[4]}></Post>
          <Post platform="browser" props={posts[5]}></Post>
          <Post platform="browser" props={posts[6]}></Post>
          <Post platform="browser" props={posts[7]}></Post>
          <Post platform="browser" props={posts[8]}></Post>
          <Post platform="browser" props={posts[9]}></Post>
        </div>
      );
    }
  } else if (platform === "mobile") {
    if (page === "profile") {
      //if on a profile
      return (
        <div className="holder-div container">
          <Post platform="mobile" props={posts[0]}></Post>
          <Post platform="mobile" props={posts[1]}></Post>
          <Post platform="mobile" props={posts[2]}></Post>
          <Post platform="mobile" props={posts[3]}></Post>
          <Post platform="mobile" props={posts[4]}></Post>
          <Post platform="mobile" props={posts[5]}></Post>
          <Post platform="mobile" props={posts[6]}></Post>
          <Post platform="mobile" props={posts[7]}></Post>
          <Post platform="mobile" props={posts[8]}></Post>
          <Post platform="mobile" props={posts[9]}></Post>
        </div>
      );
    } else {
      //if on regular pages
      return (
        <div className="holder-div container">
          <Post platform="mobile" props={posts[0]}></Post>
          <Post platform="mobile" props={posts[1]}></Post>
          <Post platform="mobile" props={posts[2]}></Post>
          <Post platform="mobile" props={posts[3]}></Post>
          <Post platform="mobile" props={posts[4]}></Post>
          <Post platform="mobile" props={posts[5]}></Post>
          <Post platform="mobile" props={posts[6]}></Post>
          <Post platform="mobile" props={posts[7]}></Post>
          <Post platform="mobile" props={posts[8]}></Post>
          <Post platform="mobile" props={posts[9]}></Post>
        </div>
      );
    }
  }
};

export default PostHolder;
