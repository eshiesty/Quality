import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Styles from "./styles.css";
import FeedPost from "../FeedPost";
import { DateTime } from "luxon";
import Loader from "../Loader";
import { MobileView, BrowserView } from "react-device-detect";
const Feed = ({ ids }) => {
  const [isLoading, setIsLoading] = useState(false);
  ids.sort(function (a, b) {
    return a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
  });

  // const formattedDate = DateTime.fromISO(res.data.createdAt).toFormat("f");
  // setTime(formattedDate);
  return (
    <>
      <BrowserView>
        <div className="holder-div container-feed">
          {ids.map((singularId) => {
            return <FeedPost postId={singularId.id} />;
          })}
          <div className="bottom-space"></div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="holder-div mobile-feed-container">
          {ids.map((singularId) => {
            return <FeedPost postId={singularId.id} />;
          })}
        </div>
      </MobileView>
    </>
  );
};

export default Feed;
