import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./styles.css";
import { useParams } from "react-router-dom";
const Monthly = () => {
  const { username } = useParams();
  return (
    <div>
      <Header />
      <h1>user: {username}</h1>
      <Footer />
    </div>
  );
};
export default Monthly;
