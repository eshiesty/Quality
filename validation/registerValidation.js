const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validateRegisterInput = (data) => {
  let errors = {};

  //check email feild

  if (isEmpty(data.email)) {
    errors.email = "Email field must be filled";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }

  //check name field
  if (isEmpty(data.name)) {
    errors.name = "Name field can not be empty";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters in length";
  }
  //check password field
  if (isEmpty(data.password)) {
    errors.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 150 })) {
    errors.password = "Password must be between 6 and 150 characters in length";
  }

  //check confirm password field
  if (isEmpty(data.confirmpassword)) {
    errors.confirmpassword = "Confirm password field can not be empty";
  } else if (!Validator.equals(data.password, data.confirmpassword)) {
    errors.confirmpassword = "Password and Confirm Password fields must mach";
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisterInput;
