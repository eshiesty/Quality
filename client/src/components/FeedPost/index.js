import React from "react";
import { useSelector } from "react-redux";
import Styles from "./styles.css";
import likedicon from "../../icons/likedicon.svg";
import unlikedicon from "../../icons/unlikedicon.svg";
import lightmodeheartwhite from "../../icons/lightmodeheartwhite.svg";
import lightmodeheartred from "../../icons/lightmodeheartred.svg";
import ModalButton from "../ModalButton";
import { DateTime } from "luxon";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { rerender } from "../../actions";
import { useEffect } from "react";

const FeedPost = ({ postId }) => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [interval, setInterval] = useState("");
  const [likeAmount, setLikeAmount] = useState("");

  console.log(postId);
  useEffect(() => {
    axios.post("/api/posts/view/post", { postId }).then((res) => {
      setContent(res.data.content);
      let _id = res.data.user;
      setInterval(res.data.interval);
      setLikeAmount(res.data.likes);
      const formattedDate = DateTime.fromISO(res.data.createdAt).toFormat("f");
      setTime(formattedDate);
      axios.post("/api/auth/retrieve/id", { _id }).then((res) => {
        console.log(res);
        setName(res.data.name);
        setHandle(res.data.username);
      });
    });
  }, [postId]);

  const userId = useSelector((state) => state.login.userId);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const mode = useSelector((state) => state.visual.mode);
  const currentUser = useSelector((state) => state.login.username);
  const navigate = useNavigate();
  const rend = useSelector((state) => state.render.render);
  const ownPost = currentUser === handle;

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
    isLiked();
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
    if (!liked) {
      axios.put("/api/posts/like", { postId, userId }).then((res) => {
        setLiked(true);
        dispatch(rerender());
      });
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

  if (content && handle) {
    return (
      <div
        className={`post-margin this-post ${
          mode === "DARK" ? "post-dark" : "post-light"
        }`}
      >
        <div
          onClick={() => navigate(`/profile/${handle}`)}
          className={`pointer post-pfp`}
        ></div>
        <div
          onClick={() => navigate(`/profile/${handle}`)}
          className={`pointer post-display-name ${
            mode === "DARK" ? "post-light-text" : "post-dark-text"
          }`}
        >
          {name}
        </div>
        <div
          onClick={() => navigate(`/profile/${handle}`)}
          className={`pointer post-handle ${
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
        <ModalButton ownPost={ownPost} postId={postId} />

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
  } else {
    return <div></div>;
  }
};

export default FeedPost;
