const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions");

//@route POST /api/comment/test
//@desc Test the comment route
//@acess Public
router.post("/test", (req, res) => {
  res.send("Comment route working");
});

// @route POST /api/posts/create
// @desc Create a comment
// @acess Public
router.post("/create", requiresAuth, async (req, res) => {
  try {
    // const { isValid, errors } = validatePost(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    //create a new comment
    const newComment = new Comment({
      sender: req.body.senderId,
      comment: req.body.comment,
      post: req.body.postId,
      likes: 0,
      likeList: [],
      replies: 0,
      replyList: [],
    });
    const commentCount = await Post.updateOne(
      {
        _id: req.body.postId,
      },
      { $inc: { comments: 1 } }
    );

    //save post to db
    await newComment.save();
    return res.json(newComment);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route POST /api/comments/view/postcomments
// @desc View the the comments on a post
// @acess Public

router.post("/view/postcomments", requiresAuth, async (req, res) => {
  try {
    const postComments = await Comment.find({
      post: req.body.postId,
      // posts: req.user.posts,
    }).sort({ completedAt: -1 });

    return res.json(postComments);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});
// @route POST /api/comments/view/comment
// @desc View a specific comment
// @acess Public

router.post("/view/comment", requiresAuth, async (req, res) => {
  try {
    const comment = await Comment.find({
      _id: req.body.commentId,
      // posts: req.user.posts,
    });

    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
