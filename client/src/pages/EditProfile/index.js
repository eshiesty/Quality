import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
const EditProfile = () => {
  const current = useSelector((state) => state.login);
  const [available, setAvailable] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = current.userId;
    const username = event.target.username.value;
    axios.post("/api/auth/changeUsername", { username, id }).then((res) => {
      console.log(res);
    });
  };

  const isAvailable = (username) => {
    // const id = current.userId;
    axios.post("/api/auth/usernameExists", { username }).then((res) => {
      if (res.data.error) {
        setAvailable(false);
        console.log("This username is unavailable");
      } else {
        setAvailable(true);
        console.log(`${username} is available`);
      }
    });
  };

  const RenderAvailability = () => {
    console.log(available);
    if (available === "") {
      return;
    } else if (available === true) {
      return <div className="inline available">this username is available</div>;
    } else if (available === false) {
      return (
        <div className="inline available un">this username is unavailable</div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="edit-profile-title">edit profile</div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-subtitle">username</div>
            <input
              placeholder={`@${current.username}`}
              className="edit-input"
              type="text"
              name="username"
              onChange={(e) => {
                isAvailable(e.target.value);
              }}
            />
            <RenderAvailability />
          </div>
          <div>
            <div className="input-subtitle">display name</div>
            <input
              placeholder={`${current.name}`}
              className="edit-input"
              type="text"
            />
          </div>
          <div>
            <div className="input-subtitle">bio</div>
            <input placeholder="bio" className="edit-input" type="text" />
          </div>
          <div>
            {/* <input placeholder="pfp (lol)" className="edit-input" type="text" /> */}
            <input className="edit-submit" type="submit" value="Save" />
          </div>
        </form>
      </div>
    </>
  );
};
export default EditProfile;
