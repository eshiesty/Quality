require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//import routes
const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Mynt express server");
});

// app.post("/name", (req, res) => { //just a test!!
//   if (req.body.name) {
//     return res.json({ name: req.body.name });
//   } else {
//     return res.status(400).json({ error: "No name provided" });
//   }
// });

app.use("/api/auth", authRoute); //after get request to api/auth, go to authRoute

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mynt database");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
