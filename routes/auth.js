const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValidation");
//@route GET /api/auth/test
//@desc Test the auth route
//@acess Public
router.get("/test", (req, res) => {
  //once get to /test endpoint, make reqeust and get response
  res.send("Auth route working");
});

//@route POST /api/auth/register
//@desc Create a new user
//@acess Public
router.post("/register", async (req, res) => {
  //adding new users
  // async functions use trycatch
  try {
    //run the input through the registerValidation file, fill the variables errors and boolean isValid
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //check if user already exists
    const existingEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"), //validate email for lower and upper case
    });

    if (existingEmail) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    //hash the password
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    //create new user
    const newUser = new User({
      email: req.body.email,
      password: hashPassword, //encrypted
      name: req.body.name,
    });

    //save user to db
    const savedUser = await newUser.save();

    // return the new used from the db
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message); //show error
  }
  res.send("Auth route working");
});

module.exports = router;
