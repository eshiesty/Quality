import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
const PostHolder = (posts) => {
  return (
    <div className="centered-div container">
      <Post props={posts[0]}></Post>
      <Post props={posts[1]}></Post>
      <Post props={posts[2]}></Post>
      <Post props={posts[3]}></Post>
      <Post props={posts[4]}></Post>
      <Post props={posts[5]}></Post>
      <Post props={posts[6]}></Post>
      <Post props={posts[7]}></Post>
      <Post props={posts[8]}></Post>
      <Post props={posts[9]}></Post>
    </div>
  );
};

export default PostHolder;
