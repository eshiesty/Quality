const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

const requiresAuth = require("../middleware/permissions");
const validatePost = require("../validation/postValidation");

//@route GET /api/posts/tests
//@desc Test the post route
//@acess Public
router.post("/test", (req, res) => {
  //once get to /test endpoint, make reqeust and get response
  res.send("Auth route working");
});

// @route       POST /api/posts/create
// @desc Create a post
// @acess Public
router.post("/create", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //create a new post
    const newPost = new Post({
      user: req.user._id,
      content: req.body.content,
      interval: req.body.interval,
      complete: false,
    });

    //save post to db
    await newPost.save();
    return res.json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
  res.send("post route working");
});

// @route GET /api/posts/profile
// @desc View the posts from your profile
// @acess Public

router.get("/view/profileposts", requiresAuth, async (req, res) => {
  try {
    const profilePosts = await Post.find({
      user: req.user._id,
      posts: req.user.posts,
    });
    // .sort({ completedAt: -1 });

    return res.json(profilePosts);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});
module.exports = router;
