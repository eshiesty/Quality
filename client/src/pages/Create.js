import React, { useState } from "react";
import Header from "../components/Header";
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
import { useSelector } from "react-redux";
const Create = () => {
  const username = useSelector((state) => state.login.username);
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState(cameraiconellis);
  const [isSelected, setSelected] = useState("");
  const [errs, setErrs] = useState("");
  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const image = URL.createObjectURL(event.target.files[0]);
  //     setDisplayImage(image);
  //   }
  // };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setDisplayImage(img);
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
        navigate(`/profile/${username}`);
      })
      .catch((err) => {
        if (err?.response?.data) {
          setErrs([
            err.response.data.content,
            "\n",
            err.response.data.interval,
          ]);
        }
      });
    console.log(displayImage);
    //post the image to google cloud storage
    let formData = new FormData();
    formData.append("file", displayImage.data);
    console.log(formData);
    axios
      .post("http://localhost:5001/upload-file-to-cloud-storage", {
        formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // "Authorization": "Bearer " + token,
        //   "Access-Control-Allow-Methods": "GET",
        //   "Access-Control-Allow-Origin": "POST",
        // },
      })
      .then((res) => console.log(res));
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
                src={displayImage.preview}
                alt="camera icon"
              />
              <h1>Select image</h1>
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/png, image/jpg, image/gif, image/jpeg"
                className="file-upload"
              />
            </label>
            <button className="button-log centered-div vertical-spacing">
              Mynt it!
              <input type="submit" className="file-upload" />
            </button>
            <div>
              <label className="error-text">{errs ? errs : ""}</label>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default Create;
