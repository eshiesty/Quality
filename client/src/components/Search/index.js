import React from "react";
import styles from "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.searchInput.value;
    // const body = { username: username };

    axios
      .post("/api/auth/retrieve/username", { username })
      // .get("/api/auth/retrieve/username", {
      //   body: {
      //     username: `${username}`,
      //   },
      // })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate(`/profile/${username}`);
  };

  return (
    <div className="inline">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="searchInput"
          placeholder="search🔍"
        />
      </form>
    </div>
  );
};

export default Search;
