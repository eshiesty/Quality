import React from "react";
import { useSelector } from "react-redux";
import Styles from "./styles.css";
import likedicon from "../../icons/likedicon.svg";
import unlikedicon from "../../icons/unlikedicon.svg";
import lightmodeheartwhite from "../../icons/lightmodeheartwhite.svg";
import lightmodeheartred from "../../icons/lightmodeheartred.svg";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { rerender } from "../../actions";
import { useEffect } from "react";
import { DateTime } from "luxon";
const Post = ({
  platform,
  content,
  time,
  name,
  handle,
  interval,
  postId,
  likeAmount,
}) => {
  //const Post = ({ platform, postId }) => {
  const userId = useSelector((state) => state.login.userId);
  const dispatch = useDispatch();
  // const [likeAmount, setLikeAmount] = useState(0);

  const [liked, setLiked] = useState(false);
  const mode = useSelector((state) => state.visual.mode);
  const currentUser = useSelector((state) => state.login.username);
  const navigate = useNavigate();
  const rend = useSelector((state) => state.render.render);
  const DeletePost = () => {
    axios.put("/api/posts/delete", { postId }).then(() => {
      dispatch(rerender());
    });
  };
  useEffect(() => {
    isLiked();
  }, []);
  const isLiked = () => {
    axios
      .post("/api/posts/isLikedBy", { postId: postId, userId: userId })
      .then((res) => {
        if (res.data) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
  };

  const ReturnHeart = () => {
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

  const likeLogic = () => {
    console.log(userId);
    if (!liked) {
      axios.put("/api/posts/like", { postId, userId }).then((res) => {
        setLiked(true);
        dispatch(rerender());
      });

      // setLikeAmount(liked + 1);
    } else if (liked) {
      // setLikeAmount(liked - 1);
      axios
        .put("/api/posts/unlike", { postId, userId })
        .then((res) => {
          setLiked(false);
          dispatch(rerender());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLiked(!liked);
  };

  const DeleteOwnPost = () => {
    if (currentUser === handle) {
      return (
        <button className="post-delete" onClick={DeletePost}>
          Delete
        </button>
      );
    }
    return <></>;
  };

  if (platform === "browser") {
    if (content) {
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
            {name}
          </div>
          <div
            className={`post-handle ${
              mode === "DARK" ? "post-light-text" : "post-dark-text"
            }`}
          >
            @{handle}
          </div>
          <div
            className={`post-interval ${
              mode === "DARK" ? "post-light-text" : "post-dark-text"
            }`}
          >
            {interval}
          </div>
          <DeleteOwnPost />
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
            {`${time}`}
          </div>

          <img
            className="post-heart-icon"
            src={ReturnHeart()}
            onClick={() => {
              likeLogic();
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
    }
  } else if (platform === "mobile") {
    return <div>WAAAA</div>;
  }
};

export default Post;
