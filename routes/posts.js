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
      likes: 0,
      likeList: [],
      comments: 0,
      commentList: [],
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

// @route GET /api/posts/view/profileposts
// @desc View the posts from your profile
// @acess Public

router.get("/view/profileposts", requiresAuth, async (req, res) => {
  try {
    const profilePosts = await Post.find({
      user: req.user._id,
      // posts: req.user.posts,
    }).sort({ completedAt: -1 });

    return res.json(profilePosts);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route POST /api/posts/view/userposts
// @desc View the posts from another profile
// @acess Public

router.post("/view/userposts", requiresAuth, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(413).send("No user searched");
    }
    const profilePosts = await Post.find({
      user: req.body.userId,
    }).sort({ completedAt: -1 });
    if (!profilePosts) {
      return res.status(404).send("This user has no posts");
    }
    return res.json(profilePosts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});
// @route PUT /api/posts/delete
// @desc Delete a post
// @acess Public

router.put("/delete", requiresAuth, async (req, res) => {
  try {
    const deleteMessage = await Post.deleteOne({
      _id: req.body.postId,
    });
    if (!deleteMessage) {
      return res.status(404).send("This post doesn't exist");
    }
    return res.json(deleteMessage);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// @route PUT /api/posts/like
// @desc Like a post
// @acess Public

router.put("/like", requiresAuth, async (req, res) => {
  try {
    const isLiked = await Post.findOne({
      postId: req.body.postId,
      likeList: { $all: [{ user: req.body.userId }] },
    });
    if (isLiked) {
      return res.status(400).send("You have already liked this post");
    }

    const likeCount = await Post.updateOne(
      {
        _id: req.body.postId,
      },
      { $inc: { likes: 1 }, $push: { likeList: { user: req.body.userId } } }
    );
    if (!req.body.userId) {
      return res.status(400).send("No current user");
    }
    return res.json(likeCount);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});
// @route POST /api/posts/isLikedBy
// @desc Like a post
// @acess Public

router.post("/isLikedBy", requiresAuth, async (req, res) => {
  try {
    const isLiked = await Post.findOne({
      postId: req.body.postId,
      likeList: { $all: [{ user: req.body.userId }] },
    });
    if (isLiked) {
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
// @route PUT /api/posts/unlike
// @desc Unlike a post
// @acess Public

router.put("/unlike", requiresAuth, async (req, res) => {
  try {
    const isLiked = await Post.findOne({
      postId: req.body.postId,
      likeList: { $all: [{ user: req.body.userId }] },
    });
    if (!isLiked) {
      return res.status(400).send("You haven't liked this post yet");
    }
    const likeCount = await Post.updateOne(
      {
        _id: req.body.postId,
      },
      { $inc: { likes: -1 }, $pull: { likeList: { user: req.body.userId } } }
    );
    if (!req.body.userId) {
      return res.status(400).send("No current user");
    }
    // const likeList = await Post.updateOne(
    //   {
    //     _id: req.body.postId,
    //   },
    //   { $pull: { likeList: { user: req.body.userId } } }
    // );
    return res.json(likeCount);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// @route POST /api/posts/getPost
// @desc Retrieve a specific post
// @acess Public

router.post("/getPost", requiresAuth, async (req, res) => {
  try {
    const foundPost = await Post.findOne({
      _id: req.body.postId,
    });
    if (!foundPost) {
      return res.status(404).send("Post not found");
    }
    return res.json(foundPost);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});
module.exports = router;
