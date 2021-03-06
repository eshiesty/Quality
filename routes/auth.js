const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions");
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

    const userToReturn = { ...savedUser._doc };
    delete userToReturn.password;
    // return the new used from the db
    return res.json(userToReturn);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message); //show error
  }
  res.send("Auth route working");
});

//@route POST /api/auth/login
//@desc Login user and return an access token
//@acess Public
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });
    if (!user) {
      return res.status(400).json({
        error: "Either your email or password (or both) was incorrect",
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        error: "Either your email or password (or both) was incorrect",
      });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      //verify payload with the env.jwtsecret
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //a week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //if in prodction, secure will be true
    });

    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    return res.json({ token: token, user: userToReturn });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

//@route GET /api/auth/current
//@desc Return currently authed user
//@acess Private
router.get("/current", requiresAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  return res.json(req.user);
});

module.exports = router;
