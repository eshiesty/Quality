import React from "react";
import Styles from "./styles.css";
import ProfilePhoto from "../ProfilePhoto";
import PostHolder from "../PostHolder";
import FollowButton from "../FollowButton";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FeedPost from "../FeedPost";
const VisualProfile = ({ platform }) => {
  let prerender = { name: "", username: "", followers: "", following: "" };
  let data = { prerender };
  const [profile, setProfile] = useState({ data });
  const { username } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [postArray, setPostArray] = useState([]);
  useEffect(() => {
    console.log(username);
    axios
      .post("/api/auth/retrieve/username", { username })
      .then((res) => {
        setProfile(res);
        const _id = res.data._id;
        console.log(_id);
        axios.post("/api/posts/view/profilepostids", { _id }).then((res) => {
          setPostArray(res.data);
          console.log(res.data);
        });
      })
      .catch((err) => {
        setNotFound(true);
        console.log(err);
      });
  }, [username]);
  if (notFound) {
    return (
      <>
        <h1 className="error">404: User not found ☹</h1>
        <button className="home-button" onClick={() => navigate("/home")}>
          home
        </button>
      </>
    );
  }
  if (platform === "browser") {
    return (
      <div className="profile-container">
        <div className="profile-photo-placement">
          <ProfilePhoto platform="browser" />
        </div>
        <div className="name name-placement inline">{profile.data.name}</div>
        <div className="handle">@{profile.data.username}</div>
        <div className="follow ers inline">
          {profile.data.followers}
          <br />
          followers
        </div>
        {/* <div className="follow-button-placement"> */}
        <FollowButton ProfileUser={profile} />
        {/* </div> */}
        <div className="follow ing inline">
          {profile.data.following}
          <br />
          following
        </div>
        {postArray.map((singularId) => {
          return <FeedPost postId={singularId._id} />;
        })}
        {/* <PostHolder
          platform="browser"
          page="profile"
          id={profile.data._id}
          name={profile.data.name}
          handle={profile.data.username}
        /> */}
        {/* ^ this was the old way of doing it, its faster but limited */}
      </div>
    );
  } else if (platform === "mobile") {
    return (
      <div className="mobile-profile-container">
        <div className="mobile-profile-photo-placement">
          <ProfilePhoto platform="mobile" />
        </div>
        <div className="mobile-name name-placement inline">
          {profile.data.name}
        </div>
        <div className="mobile-handle">@{profile.data.username}</div>
        <div className="mobile-follow mobile-ers inline">
          {profile.data.followers}
          <br />
          followers
        </div>
        {/* <div className="follow-button-placement"> */}
        <FollowButton ProfileUser={profile} />
        {/* </div> */}
        <div className="mobile-follow mobile-ing inline">
          {profile.data.following}
          <br />
          following
        </div>
        {postArray.map((singularId) => {
          return <FeedPost postId={singularId._id} />;
        })}
      </div>
    );
    // return (
    //   <div className="mobile-profile-container">
    //     <div className="profile-photo-placement">
    //       <ProfilePhoto platform="mobile" />
    //     </div>
    //     <div className="mobile-name mobile-name-placement inline">
    //       {username}
    //     </div>
    //     <div className="mobile-handle">@{username}</div>
    //     <div className="mobile-follow mobile-ers inline">
    //       652k
    //       <br />
    //       followers
    //     </div>
    //     <div className="mobile-follow mobile-ing inline">
    //       33
    //       <br />
    //       following
    //     </div>
    //     <PostHolder platform="browser" page="profile" />
    //   </div>
    // );
  }
};

export default VisualProfile;
