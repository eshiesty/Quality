const express = require("express");
const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validateToDoInput = require("./toDoValidation");
const router = express.Router();
const Post = require("../models/Post");
const validatePost = (data) => {
  let errors = {};

  if (isEmpty(data.content)) {
    errors.content = "Content field can not be empty";
  } else if (!Validator.isLength(data.content, { min: 1, max: 400 })) {
    errors.length = "Post must be under 400 characters in length";
  }
  if (isEmpty(data.interval)) {
    errors.interval = "Interval must be specified";
  }
  // if (currentIntervalValid(data) === false) {
  //   console.log("this is being ran");
  //   errors.currentInterval = "You have already posted during this interval";
  //   return {
  //     errors,
  //     isValid: false,
  //   };
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// const currentIntervalValid = async (data) => {
//   console.log("running..");
//   //if the post is valid, check the interval validitity
//   const date = new Date();
//   console.log(data.interval);
//   if (data.interval === "day") {
//     const startOfDay = new Date();
//     startOfDay.setUTCHours(0, 0, 0, 0);
//     //get beginning of day
//     const currentInterval = await Post.find({
//       interval: "day",
//       createdAt: { $gt: startOfDay },
//     });

//     if (!currentInterval.length) {
//       // console.log("you're good to go");
//       console.log("valid");
//       return true;
//     } else {
//       console.log("invalid");
//       return false;
//       // return 'You have already posted to "day" for this interva.';
//       // errors.currentInterval =
//       //   'You have already posted to "day" for this interval.';
//       // console.log(errors);
//       // return res.status(400).json(errors);
//     }
//   } else if (data.interval === "week") {
//   } else if (data.interval === "month") {
//   }
// };

module.exports = validatePost;
