import React from "react";
import Styles from "./styles.css";
import ProfilePhoto from "../ProfilePhoto";
import axios from "axios";
import { useState } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router";
const Notification = ({ noti }) => {
  const navigate = useNavigate();
  const [sender, setSender] = useState();
  const [time, setTime] = useState();
  const notification = JSON.parse(noti); //turn the prop back into an object
  console.log(notification);
  const getSenderInfo = (id) => {
    const _id = id; //for teh sake of the request
    axios.post("/api/auth/retrieve/id", { _id }).then((res) => {
      setSender(res.data.username);
      setTime(DateTime.fromISO(notification.createdAt).toFormat("f"));
    });
  };
  getSenderInfo(notification.sender);
  console.log(notification);
  switch (notification.type) {
    case "follow":
      return (
        <div className="notif-holder">
          <div className="notif-pfp" />
          <div className="notif-text">
            <div
              onClick={() => navigate(`/profile/${sender}`)}
              className="inline pointer"
            >
              @{sender}
            </div>{" "}
            has followed you
          </div>
          <div className="notif-text">{time}</div>
          <div></div>
          <div className="horizontal-line" />
        </div>
      );

    case "like":
      return (
        <div className="notif-holder">
          <div className="notif-pfp" />
          <div className="notif-text">
            {" "}
            <div
              onClick={() => navigate(`/profile/${sender}`)}
              className="inline pointer"
            >
              @{sender}
            </div>{" "}
            has liked your post
          </div>
          <div className="notif-text">{time}</div>
          <div className="horizontal-line" />
        </div>
      );
    case "comment":
      return (
        <div className="notif-holder">
          <div className="notif-pfp" />
          <div className="notif-text">
            {" "}
            <div
              onClick={() => navigate(`/profile/${sender}`)}
              className="inline pointer"
            >
              @{sender}
            </div>{" "}
            has commented "{`${notification.content}`}" on your post
          </div>
          <div className="notif-text">{time}</div>
          <div className="horizontal-line" />
        </div>
      );
  }
};

export default Notification;
