const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validateToDoInput = require("./toDoValidation");

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
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validatePost;
