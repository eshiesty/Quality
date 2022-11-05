const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions");

//@route Post /api/activity/test
//@desc Test the activity route
//@acess Public
router.post("/test", (req, res) => {
  //once get to /test endpoint, make reqeust and get response
  res.send("activity route working");
});

//@route PUT /api/activity/reset
//@desc Add/activity a follower field and list to existin gusers
//@acess Private
router.put("/reset", requiresAuth, async (req, res) => {
  try {
    const updatedUsers = await activity.updateMany(
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
//@route POST /api/activity/getnotifs
//@desc get a specific users activity
//@acess Private
router.post("/getnotifs", requiresAuth, async (req, res) => {
  try {
    if (!req.body.user) {
      return res.status(400).send("Bad request no user");
    }
    const activity = await Activity.find({ reciever: req.body.user });

    return res.json(activity);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});
//@route POST /api/activity/addnotif
//@desc Add/activity a follower field and list to existin gusers
//@acess Public
router.post("/addnotif", requiresAuth, async (req, res) => {
  try {
    if (!req.body.senderId) {
      return res.status(400).send("Bad Request. No user sender");
    }
    if (!req.body.type) {
      return res.status(400).send("Bad Request. No type");
    }
    if (!req.body.recieverId) {
      return res.status(400).send("Bad Request. No target");
    }

    const newNotif = new Activity({
      sender: req.body.senderId,
      reciever: req.body.recieverId,
      type: req.body.type,
      content: req.body.content,
      post: req.body.post,
      seen: false,
    });
    await newNotif.save();
    return res.json(newNotif);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

//@route POST /api/auth/activity/REMOVEnotif
//@desc remove a notification
//@acess Public
router.post("/removenotif", requiresAuth, async (req, res) => {
  try {
    const deleteNotif = await Activity.deleteOne({
      sender: req.body.senderId,
      reciever: req.body.recieverId,
      type: req.body.type,
      content: req.body.content,
      post: req.body.post,
    });

    return res.json(deleteNotif);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

//@route PUT /api/auth/activity/seen
//@desc mark a notif as seen
//@acess Public
router.put("/seen", requiresAuth, async (req, res) => {
  try {
    const seenNotif = await Activity.updateOne(
      {
        _id: req.body.activityId,
      },
      { $set: { seen: true } }
    );
    return res.json(seenNotif);
  } catch {
    (err) => {
      console.log(err);
      return res.status(500).send(err.message);
    };
  }
});

module.exports = router;
