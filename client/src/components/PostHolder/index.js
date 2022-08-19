import React from "react";
import Post from "../Post";
import Styles from "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DateTime } from "luxon";
const PostHolder = ({ platform, page, userId }, posts) => {
  const [postContentState, setPostContentState] = useState([]);
  const [postTimeState, setPostTimeState] = useState([]);
  let profilePostsContent = [];
  let profilePostsTime = [];
  useEffect(() => {
    axios.get("/api/posts/view/profileposts", userId).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        profilePostsContent[i] = res.data[i].content;
        // const date = new Date(res.data[i].createdAt);
        const formattedDate = DateTime.fromISO(res.data[i].createdAt).toFormat(
          "f"
        );
        profilePostsTime[i] = formattedDate;

        // res.data[i].createdAt.split("T").join(", ").substring(0, 17) + " utc"; AN ANCIENT RELIC OF STUPIDITY
      }
      profilePostsContent.reverse();
      profilePostsTime.reverse();
      setPostContentState(profilePostsContent);
      setPostTimeState(profilePostsTime);
    });
  }, []);

  if (platform === "browser") {
    if (page === "profile") {
      //if on a profile page

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
          <Post
            platform="browser"
            content={postContentState[2]}
            time={postTimeState[2]}
          ></Post>
          <Post
            platform="browser"
            content={postContentState[3]}
            time={postTimeState[3]}
          ></Post>
          <Post
            platform="browser"
            content={postContentState[4]}
            time={postTimeState[4]}
          ></Post>
          <Post
            platform="browser"
            content={postContentState[5]}
            time={postTimeState[5]}
          ></Post>
          <Post
            platform="browser"
            content={postContentState[6]}
            time={postTimeState[6]}
          ></Post>
          <Post
            platform="browser"
            content={postContentState[7]}
            time={postTimeState[7]}
          ></Post>

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
//testing g
export default PostHolder;
