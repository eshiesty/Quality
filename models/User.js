const { Schema, model } = require("mongoose");

//the model for our users

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      reqiured: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    followers: {
      type: Number,
    },
    followerList: {
      type: Array,
    },
    following: {
      type: Number,
    },
    followingList: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);
module.exports = User;
