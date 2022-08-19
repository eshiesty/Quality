import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

import darkmonthly from "../icons/darkmonthly.png";
import lightmonthly from "../icons/lightmonthly.png";
import darkdaily from "../icons/darkdaily.png";
import lightdaily from "../icons/lightdaily.png";
import darkweekly2 from "../icons/darkweekly2.png";
import lightweekly2 from "../icons/lightweekly2.png";
import cameraiconellis from "../icons/cameraiconellis.png";
import styles from "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState(cameraiconellis);
  const [isSelected, setSelected] = useState("");
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = URL.createObjectURL(event.target.files[0]);
      setDisplayImage(image);
    }
  };
  const changeSelection = (button) => {
    if (isSelected === button) {
      setSelected("");
    } else {
      setSelected(button);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    const interval = isSelected;
    let data = { content, interval };
    axios
      .post("/api/posts/create", data)
      .then(() => {
        navigate("/profile/ellis");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <div className="container ">
        <form onSubmit={handleSubmit} className="input-post-parent">
          <div className="left">
            <textarea
              className="input input-post resize"
              type="text"
              name="content"
              placeholder="write something here"
            />
            <div className="vertical-spacing">
              {/* TODO: create transition that makes the selection smooth */}
              <img
                src={isSelected === "day" ? darkdaily : lightdaily}
                className=" pointer daily-icon "
                onClick={() => changeSelection("day")}
                alt="day icon"
              />
              <img
                src={isSelected === "week" ? darkweekly2 : lightweekly2}
                className=" pointer weekly-icon horizontal-spacing"
                onClick={() => changeSelection("week")}
                alt="week icon"
              />
              <img
                src={isSelected === "month" ? darkmonthly : lightmonthly}
                className=" pointer monthly-icon horizontal-spacing"
                onClick={() => changeSelection("month")}
                alt="month icon"
              />
            </div>
          </div>

          <div className="right input-post-parent">
            <label className="button-1 centered-div">
              <img
                className="camera-icon"
                src={displayImage}
                alt="camera icon"
              />
              <h1>Select image</h1>
              <input
                onChange={onImageChange}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                className="file-upload"
              />
            </label>
            <button className="button-log centered-div vertical-spacing">
              Mynt it!
              <input type="submit" className="file-upload" />
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default Create;
