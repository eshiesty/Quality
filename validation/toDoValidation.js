const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateToDoInput = (data) => {
  let errors = {};

  if (isEmpty(data.content)) {
    errors.content = "Content field can not be empty";
  } else if (!Validator.isLength(data.content, { min: 1, max: 300 })) {
    errors.content = "Content field must be between 1 and 300 characters";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateToDoInput;
