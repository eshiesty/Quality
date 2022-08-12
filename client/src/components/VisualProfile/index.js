import React from "react";
import Styles from "./styles.css";
import ProfilePhoto from "../ProfilePhoto";
import PostHolder from "../PostHolder";
const VisualProfile = ({ user, platform }) => {
  if (platform === "browser") {
    return (
      <div className="profile-container">
        <div className="profile-photo-placement">
          <ProfilePhoto platform="browser" />
        </div>
        <div className="name name-placement inline">{user.name}</div>
        <div className="handle">@{user.username}</div>
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
        <PostHolder platform="browser" page="profile" />
      </div>
    );
  } else if (platform === "mobile") {
    return (
      <div className="mobile-profile-container">
        <div className="profile-photo-placement">
          <ProfilePhoto platform="mobile" />
        </div>
        <div className="mobile-name mobile-name-placement inline">
          {user.name}
        </div>
        <div className="mobile-handle">@{user.username}</div>
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
