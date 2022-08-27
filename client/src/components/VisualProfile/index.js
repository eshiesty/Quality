import React from "react";
import Styles from "./styles.css";
import ProfilePhoto from "../ProfilePhoto";
import PostHolder from "../PostHolder";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const VisualProfile = ({ platform }) => {
  let prerender = { name: "", username: "" };
  let data = { prerender };
  const [profile, setProfile] = useState({ data });
  const { username } = useParams();
  useEffect(() => {
    axios
      .post("/api/auth/retrieve/username", { username })

      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  if (platform === "browser") {
    return (
      <div className="profile-container">
        <div className="profile-photo-placement">
          <ProfilePhoto platform="browser" />
        </div>
        <div className="name name-placement inline">{profile.data.name}</div>
        <div className="handle">@{profile.data.username}</div>
        <div className="follow ers inline">
          652k
          <br />
          followers
        </div>
        <div className="follow ing inline">
          33
          <br />
          following
        </div>
        <PostHolder
          platform="browser"
          page="profile"
          id={profile.data._id}
          name={profile.data.name}
          handle={profile.data.username}
        />
      </div>
    );
  } else if (platform === "mobile") {
    return (
      <div className="mobile-profile-container">
        <div className="profile-photo-placement">
          <ProfilePhoto platform="mobile" />
        </div>
        <div className="mobile-name mobile-name-placement inline">
          {username}
        </div>
        <div className="mobile-handle">@{username}</div>
        <div className="mobile-follow mobile-ers inline">
          652k
          <br />
          followers
        </div>
        <div className="mobile-follow mobile-ing inline">
          33
          <br />
          following
        </div>
        <PostHolder platform="browser" page="profile" />
      </div>
    );
  }
};

export default VisualProfile;
