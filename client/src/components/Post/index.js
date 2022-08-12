import React from "react";
import { useSelector } from "react-redux";
import Styles from "./styles.css";
import likedicon from "../../icons/likedicon.svg";
import unlikedicon from "../../icons/unlikedicon.svg";
import lightmodeheartwhite from "../../icons/lightmodeheartwhite.svg";
import lightmodeheartred from "../../icons/lightmodeheartred.svg";
import { useState } from "react";

const Post = ({ platform, content, time }) => {
  const [likeAmount, setLikeAmount] = useState(0);
  const [liked, setLiked] = useState(false);
  const mode = useSelector((state) => state.visual.mode);
  const ReturnHeart = (modeasync) => {
    if (mode === "DARK") {
      if (liked) {
        return lightmodeheartred;
      } else {
        return lightmodeheartwhite;
      }
    } else {
      if (liked) {
        return likedicon;
      } else {
        return unlikedicon;
      }
    }
  };

  if (platform === "browser") {
    return (
      <div
        className={`post-margin this-post ${
          mode === "DARK" ? "post-dark" : "post-light"
        }`}
      >
        <div className={`post-pfp`}></div>
        <div
          className={`post-display-name ${
            mode === "DARK" ? "post-light-text" : "post-dark-text"
          }`}
        >
          Display Name
        </div>
        <div
          className={`post-handle ${
            mode === "DARK" ? "post-light-text" : "post-dark-text"
          }`}
        >
          @handle
        </div>
        <div
          className={`post-content ${
            mode === "DARK" ? "post-light-text" : "post-dark-text"
          }`}
        >
          {content}
        </div>
        <div
          className={`post-timestamp ${
            mode === "DARK" ? "post-light-text" : "post-dark-text"
          }`}
        >
          {time}
        </div>

        <img
          className="post-heart-icon"
          src={ReturnHeart()}
          onClick={() => {
            if (!liked) {
              setLikeAmount(liked + 1);
            } else {
              setLikeAmount(liked - 1);
            }
            setLiked(!liked);
          }}
        />
        <div
          className={`post-like-amount ${
            mode === "DARK" ? "post-light-text" : "post-dark-text"
          }`}
        >
          {likeAmount}
        </div>
      </div>
    );
  } else if (platform === "mobile") {
    return <div>WAAAA</div>;
  }
};

export default Post;
