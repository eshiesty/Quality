import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router";
import axios from "axios";
//import { MongoClient, ServerApiVersion } from "mongodb";
//mongodb stuff just to have here
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://ecodowd:<CA7nSJnX0XYCZKiR>@mynttestservers.ue1r3.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const Home = () => {
  // const client = axios.create({
  //   baseURL: "https://data.mongodb-api.com/app/data-jgvux/endpoint/data/v1",
  //   "X-API-Key":
  //     "AGauFiFWvgrK7ejOkhgdrXOX8PXcuWAqaPeNgD6plMrhVfn0KfINxeE8xP5xrhR8",
  // });

  // const [res, setRes] = useState("");
  // useEffect(() => {
  //   client.get().then((response) => {
  //     setRes(response.data);
  //   });
  //   console.log(res);
  // });

  // axios.create({
  //   baseURL: "https://data.mongodb-api.com/app/data-dfkrt/endpoint/data/v1",
  // });
  // const url = "https://data.mongodb-api.com/app/data-dfkrt/endpoint/data/v1";
  // const url =
  //   "mongodb+srv://ecodowd:<CA7nSJnX0XYCZKiR>@mynttestservers.ue1r3.mongodb.net/?retryWrites=true&w=majority";
  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setRes(response.data);
  //       console.log(res);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <h1>It's time to get mynti! Landing page!</h1>
    </div>
  );
};

export default Home;
