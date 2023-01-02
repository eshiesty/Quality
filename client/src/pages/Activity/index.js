import React from "react";
import Styles from "./styles.css";
import axios from "axios";
import Notification from "../../components/Notification";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Activity = () => {
  const [noties, setNoties] = useState([]);
  const user = useSelector((state) => state.login.userId);
  useEffect(() => {
    axios.post("/api/activity/getnotifs", { user }).then((res) => {
      console.log(res.data);

      setNoties(res.data.reverse()); //newest at the top
    });
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <div className="noti-holder">
        {noties.map((noti) => {
          const stringified = JSON.stringify(noti);
          return (
            <>
              <Notification noti={stringified} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Activity;
