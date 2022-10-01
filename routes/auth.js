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

    //check if username already exists
    const existingUserName = await User.findOne({
      username: new RegExp("^" + req.body.username + "$", "i"), //validate username for lower and upper case
    });

    if (existingUserName) {
      return res
        .status(400)
        .json({ error: "This username is already in use." });
    }

    //hash the password
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const hashConfirmPassword = await bcrypt.hash(req.body.confirmpassword, 12);
    //create new user

    const newUser = new User({
      email: req.body.email,
      password: hashPassword, //encrypted
      confirmpassword: hashConfirmPassword,
      username: req.body.username,
      name: req.body.name,
      dob: req.body.dob,
    });

    //save user to db
    const savedUser = await newUser.save();

    const payload = { userId: savedUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      //verify payload with the env.jwtsecret
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //a week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //if in prodction, secure will be true
    });

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
        error: "Your email or password (or both) was incorrect",
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

//@route GET /api/auth/retrieve/username
//@desc Return the profile information by username
//@acess Public
router.post("/retrieve/username", requiresAuth, async (req, res) => {
  try {
    if (req.body.username === null) {
      return res.status(412).send("no user searched");
    }

    const user = await User.findOne({
      username: req.body.username,
    });

    const userToReturn = { ...user._doc };
    delete userToReturn.password;
    // return the new user from the db
    return res.json(userToReturn);
  } catch (err) {
    console.log(err);
    return res.status(404).send("user not found");
  }
});

//@route GET /api/auth/retrieve/id
//@desc Return the profile information for a user by id
//@acess Public
router.post("/retrieve/id", requiresAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body._id,
    });
    const userToReturn = { ...user._doc };
    delete userToReturn.password;
    // return the new used from the db
    return res.json(userToReturn);
  } catch (err) {
    console.log(err);
    return res.status(404).send("user not found");
  }

  return res.json(req.user);
});

//@route PUT /api/auth/logout
//@desc Logout user and clear the cookie
//@acess Private
router.put("/logout", requiresAuth, async (req, res) => {
  try {
    res.clearCookie("access-token");
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});
//@route PUT /api/auth/reset/followers
//@desc Add/reset a follower field and list to existin gusers
//@acess Private
router.put("/reset/followers", requiresAuth, async (req, res) => {
  try {
    const updatedUsers = await User.updateMany(
      {},
      {
        $set: {
          followers: 0,
          followerList: [],
          following: 0,
          followingList: [],
        },
      },
      { upsert: true }
    );
    return res.json(updatedUsers);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

//@route PUT /api/auth/follow
//@desc Follow somebody
//@acess Public
router.put("/follow", requiresAuth, async (req, res) => {
  try {
    const isFollowing = await User.findOne({
      _id: req.body.targetId,
      followerList: { $all: [{ user: req.body.followerId }] },
    });
    if (isFollowing) {
      return res.status(500).send("User already followed");
    }
    const followUser = await User.updateOne(
      { _id: req.body.targetId },
      {
        $inc: { followers: 1 },
        $push: { followerList: { user: req.body.followerId } },
      }
    );
    const addFollowing = await User.updateOne(
      { _id: req.body.followerId },
      {
        $inc: { following: 1 },
        $push: { followingList: { user: req.body.targetId } },
      }
    );
    return res.json(followUser);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

//@route PUT /api/auth/unfollow
//@desc Unfollow somebody
//@acess Public
router.put("/unfollow", requiresAuth, async (req, res) => {
  try {
    const isFollowing = await User.findOne({
      _id: req.body.targetId,
      followerList: { $all: [{ user: req.body.followerId }] },
    });
    if (!isFollowing) {
      return res.status(500).send("User is not already followed");
    }
    const unfollowUser = await User.updateOne(
      { _id: req.body.targetId },
      {
        $inc: { followers: -1 },
        $pull: { followerList: { user: req.body.followerId } },
      }
    );
    const removeFollowing = await User.updateOne(
      { _id: req.body.followerId },
      {
        $inc: { following: -1 },
        $pull: { followingList: { user: req.body.targetId } },
      }
    );
    return res.json(unfollowUser);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

//@route Post /api/auth/isFollowing
//@desc See if one user is already following another
//@acess Public
router.post("/isFollowing", requiresAuth, async (req, res) => {
  try {
    const isFollowing = await User.findOne({
      _id: req.body.targetId,
      followerList: { $all: [{ user: req.body.followerId }] },
    });
    if (isFollowing) {
      return res.send("true");
    } else {
      return res.send("false");
      // return res.status(300).send("not liked");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

//@route Post /api/auth/usernameExists
//@desc See if one a username is taken
//@acess Public
router.post("/usernameExists", requiresAuth, async (req, res) => {
  //check if username already exists
  try {
    const existingUserName = await User.findOne({
      username: new RegExp("^" + req.body.username + "$", "i"), //validate username for lower and upper case
    });

    if (existingUserName) {
      return res.json({ error: "This username is already in use." });
    }
    return res.status(200).send("Username available");
  } catch (err) {
    return res.status(400).send(err);
  }
});
//@route Post /api/auth/changeUsername
//@desc See if one a username is taken
//@acess Public
router.post("/changeUsername", requiresAuth, async (req, res) => {
  try {
    const existingUserName = await User.findOne({
      username: new RegExp("^" + req.body.username + "$", "i"), //validate username for lower and upper case
    });

    if (existingUserName) {
      return res
        .status(400)
        .json({ error: "This username is already in use." });
    } else {
      const changeUsername = await User.updateOne(
        { _id: req.body.id },
        {
          $set: {
            username: req.body.username,
          },
        }
      );
      return res.json(changeUsername);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

//@route PUT /api/auth/activity/reset
//@desc Add/activity a follower field and list to existin gusers
//@acess Private
router.put("/activity/reset", requiresAuth, async (req, res) => {
  try {
    const updatedUsers = await User.updateMany(
      {},
      {
        $set: {
          activity: [],
        },
      },
      { upsert: true }
    );
    return res.json(updatedUsers);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});
//@route POST /api/auth/activity/get
//@desc Add/activity a follower field and list to existin gusers
//@acess Private
router.post("/activity/get", requiresAuth, async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(404).send("User doesn't exist");
    }
    const activity = await User.findOne(
      { _id: req.body.userId },
      { activity: 1 }
    );

    return res.json(activity);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});
//@route POST /api/auth/activity/addnotif
//@desc Add/activity a follower field and list to existin gusers
//@acess Private
router.post("/activity/addnotif", requiresAuth, async (req, res) => {
  try {
    if (!req.body.senderId) {
      return res.status(400).send("Bad Request. No user sender");
    }
    if (!req.body.type) {
      return res.status(400).send("Bad Request. No type");
    }
    if (!req.body.targetId) {
      return res.status(400).send("Bad Request. No target");
    }
    const newId = new ObjectId();
    // const currentTime = new Timestamp();
    const AddNotif = await User.updateOne(
      { _id: req.body.targetId },
      {
        $push: {
          activity: {
            sender: req.body.senderId,
            type: req.body.type,
            content: req.body.content,
            post: req.body.post,
            seen: false,
            // time: ISODate(),
          },
        },
      }
    );

    return res.json(AddNotif);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

module.exports = router;
