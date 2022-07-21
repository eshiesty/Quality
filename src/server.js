//import mongoose, { connect, connection } from "mongoose";
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://ecodowd:<CA7nSJnX0XYCZKiR>@mynttestservers.ue1r3.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    deafult: Date.now(),
  },
});

const post = mongoose.model("Post", postSchema);

const data = {
  title: "first post",
  body: "this is the first post in the desting of the database",
};

const newPost = new post(data);
newPost.save((error) => {
  if (error) {
    console.log("something went wrong");
  } else {
    console.log("it worked");
  }
});
