const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validateToDoInput = require("./toDoValidation");

const validatePost = (data) => {
  let errors = {};

  if (isEmpty(data.content)) {
    errors.content = "Content field can not be empty";
  } else if (!Validator.isLength(data.content, { min: 1, max: 400 })) {
    errors.content = "Post must be under 400 characters in length";
  } else if (isEmpty(data.interval)) {
    errors.content = "Interval must be specified";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validatePost;
