import React from "react";
import styles from "./styles.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { rerender } from "../../actions";
import { useNavigate } from "react-router-dom";
const FollowButton = ({ ProfileUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const targetId = ProfileUser.data._id;
    const followerId = currentUser.userId;
    axios
      .post("/api/auth/isFollowing", { targetId, followerId })
      .then((res) => {
        console.log(res);
        if (res.data === true) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
  }, [ProfileUser]);

  const Follow = () => {
    const targetId = ProfileUser.data._id;
    const followerId = currentUser.userId;
    axios.put("/api/auth/follow", { targetId, followerId }).then(() => {
      setIsFollowing(true);
    });
  };
  const Unfollow = () => {
    const targetId = ProfileUser.data._id;
    const followerId = currentUser.userId;
    axios.put("/api/auth/unfollow", { targetId, followerId }).then(() => {
      setIsFollowing(false);
    });
  };
  const ProfileEdit = () => {
    navigate("/editprofile");
  };
  const UserLogic = () => {
    if (currentUser.username === ProfileUser.data.username) {
      return (
        <>
          <button
            onClick={ProfileEdit}
            className="follow-button profile-button"
          >
            <nobr>edit profile</nobr>
          </button>
        </>
      );
    } else {
      if (isFollowing) {
        return (
          <>
            <button
              onClick={Unfollow}
              className="follow-button following-button"
            >
              following✓
            </button>
          </>
        );
      }
      return (
        <>
          <button onClick={Follow} className="follow-button">
            follow
          </button>
        </>
      );
    }
  };

  return (
    <div className="button-location">
      <UserLogic />
    </div>
  );
};

export default FollowButton;
