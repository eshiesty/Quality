import React from "react";
import Styles from "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
const Comment = ({ comment }) => {
  const [cmt, setCmt] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  //   setcmt(JSON.parse(comment));

  useEffect(() => {
    if (comment) {
      const foo = JSON.parse(comment);
      setFormattedDate(DateTime.fromISO(foo.createdAt).toFormat("f"));
      setCmt(foo);
      const _id = foo.sender;
      axios.post("/api/auth/retrieve/id", { _id }).then((res) => {
        setName(res.data.name);
        setHandle(res.data.username);
      });
    }
    // console.log(cmt);
    // console.log(typeof comment);
  }, []);
  if (comment) {
    return (
      <div className="comment-holder">
        <div className="font-lato comment-name inline">@{handle}</div>
        <div className="font-lato comment-date inline">{formattedDate}</div>
        <div className="font-lato comment-content ">{cmt.comment}</div>
      </div>
    );
  }
};

export default Comment;
