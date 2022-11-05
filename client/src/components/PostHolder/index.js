import React from "react";
import Post from "../Post";
import Styles from "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
const PostHolder = ({ platform, page, id, name, handle }, posts) => {
  const rend = useSelector((state) => state.render.render);
  const [postContentState, setPostContentState] = useState([]);
  const [postTimeState, setPostTimeState] = useState([]);
  const [postIntervalState, setPostIntervalState] = useState([]);
  const [postIdState, setPostIdState] = useState([]);
  const [postLikeAmountState, setPostLikeAmountState] = useState([]);
  const [rendState, setRendState] = useState([]);
  let profilePostsContent = [];
  let profilePostsTime = [];
  let profilePostsInterval = [];
  let profilePostsId = [];
  let profilePostsLikeAmount = [];
  useEffect(() => {
    const userId = id;
    axios.post("/api/posts/view/userposts", { userId }).then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        profilePostsContent[i] = res.data[i].content;
        // const date = new Date(res.data[i].createdAt);
        const formattedDate = DateTime.fromISO(res.data[i].createdAt).toFormat(
          "f"
        );
        profilePostsTime[i] = formattedDate;
        profilePostsInterval[i] = res.data[i].interval;
        profilePostsId[i] = res.data[i]._id;
        profilePostsLikeAmount[i] = res.data[i].likes;
        // res.data[i].createdAt.split("T").join(", ").substring(0, 17) + " utc"; AN ANCIENT RELIC OF STUPIDITY
      }
      profilePostsContent.reverse();
      profilePostsTime.reverse();
      profilePostsInterval.reverse();
      profilePostsId.reverse();
      profilePostsLikeAmount.reverse();
      setPostContentState(profilePostsContent);
      setPostTimeState(profilePostsTime);
      setPostIntervalState(profilePostsInterval);
      setPostIdState(profilePostsId);
      setPostLikeAmountState(profilePostsLikeAmount);
    });
    setRendState(rend);
  }, [id, rend]);

  if (platform === "browser") {
    if (page === "profile") {
      //if on a profile page

      return (
        <div className="holder-div">
          {rend}
          <Post
            postId={postIdState[0]}
            platform="browser"
            content={postContentState[0]}
            time={postTimeState[0]}
            name={name}
            handle={handle}
            interval={postIntervalState[0]}
            likeAmount={postLikeAmountState[0]}
          ></Post>
          <Post
            postId={postIdState[1]}
            platform="browser"
            content={postContentState[1]}
            time={postTimeState[1]}
            name={name}
            handle={handle}
            interval={postIntervalState[1]}
            likeAmount={postLikeAmountState[1]}
          ></Post>
          <Post
            postId={postIdState[2]}
            platform="browser"
            content={postContentState[2]}
            time={postTimeState[2]}
            name={name}
            handle={handle}
            interval={postIntervalState[2]}
            likeAmount={postLikeAmountState[2]}
          ></Post>
          <Post
            postId={postIdState[3]}
            platform="browser"
            content={postContentState[3]}
            time={postTimeState[3]}
            name={name}
            handle={handle}
            interval={postIntervalState[3]}
            likeAmount={postLikeAmountState[3]}
          ></Post>
          <Post
            postId={postIdState[4]}
            platform="browser"
            content={postContentState[4]}
            time={postTimeState[4]}
            name={name}
            handle={handle}
            interval={postIntervalState[4]}
            likeAmount={postLikeAmountState[4]}
          ></Post>
          <Post
            postId={postIdState[5]}
            platform="browser"
            content={postContentState[5]}
            time={postTimeState[5]}
            name={name}
            handle={handle}
            interval={postIntervalState[5]}
            likeAmount={postLikeAmountState[5]}
          ></Post>
          <Post
            postId={postIdState[6]}
            platform="browser"
            content={postContentState[6]}
            time={postTimeState[6]}
            name={name}
            handle={handle}
            interval={postIntervalState[6]}
            likeAmount={postLikeAmountState[6]}
          ></Post>
          <Post
            postId={postIdState[7]}
            platform="browser"
            content={postContentState[7]}
            time={postTimeState[7]}
            name={name}
            handle={handle}
            interval={postIntervalState[7]}
            likeAmount={postLikeAmountState[7]}
          ></Post>
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
