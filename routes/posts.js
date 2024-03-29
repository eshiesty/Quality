const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const requiresAuth = require("../middleware/permissions");
const validatePost = require("../validation/postValidation");

//@route GET /api/posts/tests
//@desc Test the post route
//@acess Public
router.post("/test", (req, res) => {
  const d = new Date();
  console.log(d);
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  console.log(startOfDay);
  // const currentInterval = await Post.find({})
  // return res.json(currentInterval)
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
    // //if the post is valid, check the interval validitity
    const date = new Date();
    if (req.body.interval === "day") {
      const startOfDay = new Date();
      startOfDay.setUTCHours(0, 0, 0, 0);
      //get beginning of day
      const currentInterval = await Post.find({
        interval: "day",
        createdAt: { $gt: startOfDay },
      });

      if (!currentInterval.length) {
        console.log("you're good to go");
      } else {
        errors.currentInterval =
          'You have already posted to "day" for this interval.';
        console.log(errors);
        return res.status(400).json(errors);
      }
    } else if (req.body.interval === "week") {
      //
      //
      // get beginning of week
      const startOfWeek = new Date();
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      startOfWeek.setUTCHours(0, 0, 0, 0);

      const currentInterval = await Post.find({
        interval: "week",
        createdAt: { $gt: startOfWeek },
      });

      if (!currentInterval.length) {
        console.log("you're good to go");
      } else {
        errors.currentInterval =
          'You have already posted to "week" for this interval.';

        return res.status(400).json(errors);
      }
      //
      //
    } else if (req.body.interval === "month") {
      // get beginning of month
      const startOfMonth = new Date();
      console.log(startOfMonth.getDay());
      startOfMonth.setUTCDate(1);
      startOfMonth.setUTCHours(0, 0, 0, 0);
      console.log(startOfMonth);
      const currentInterval = await Post.find({
        interval: "month",
        createdAt: { $gt: startOfMonth },
      });

      if (!currentInterval.length) {
        console.log("you're good to go");
      } else {
        errors.currentInterval =
          'You have already posted to "month" for this interval.';
        console.log(errors);
        return res.status(400).json(errors);
      }
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

// @route POST /api/posts/view/profilepostids
// @desc View the posts from your profile version 2.0
// @acess Public

router.post("/view/profilepostids", requiresAuth, async (req, res) => {
  try {
    const profilePosts = await Post.find(
      {
        user: req.body._id,
        // posts: req.user.posts,
      },
      { _id: 1, createdAt: 1 }
    ).sort({ createdAt: -1 });

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
      _id: req.body.postId,
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
      _id: req.body.postId,
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
      _id: req.body.postId,
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

// @route POST /api/posts/getFollowingDaily
// @desc Retrieve your daily timeline
// @acess Public

router.post("/getFollowingDaily", requiresAuth, async (req, res) => {
  try {
    //get get a list of your following
    const user = await User.findOne({ _id: req.body.id });

    //retrieve posts from your following
    let dailyFeedIds = [];

    for (i = 0; i < user.followingList.length; i++) {
      //for each following user

      //find all the day posts
      const dailyFeed = await Post.find({
        interval: "day",
        user: user.followingList[i].user,
      });
      for (g = 0; g < dailyFeed.length; g++) {
        //for each post there is, add it to the array
        if (dailyFeed[g]) {
          console.log(dailyFeed[g]);
          dailyFeedIds.push({
            id: dailyFeed[g]._id,
            createdAt: dailyFeed[g].createdAt,
          });
        }
      }
    }
    //returns array of the id's for your daily feed`
    return res.json(dailyFeedIds);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// @route POST /api/posts/getFollowingWeekly
// @desc Retrieve your weekly timeline
// @acess Public

router.post("/getFollowingWeekly", requiresAuth, async (req, res) => {
  try {
    //get get a list of your following
    const user = await User.findOne({ _id: req.body.id });

    //retrieve posts from your following
    let weeklyFeedIds = [];

    for (i = 0; i < user.followingList.length; i++) {
      //for each following user

      //find all the week posts
      const weeklyFeed = await Post.find({
        interval: "week",
        user: user.followingList[i].user,
      });
      for (g = 0; g < weeklyFeed.length; g++) {
        //for each post there is, add it to the array
        if (weeklyFeed[g]) {
          weeklyFeedIds.push({
            id: weeklyFeed[g]._id,
            createdAt: weeklyFeed[g].createdAt,
          });
        }
      }
    }
    //returns array of the id's for your weekly feed`
    return res.json(weeklyFeedIds);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// @route POST /api/posts/getFollowingMonthly
// @desc Retrieve your Monthly timeline
// @acess Public

router.post("/getFollowingMonthly", requiresAuth, async (req, res) => {
  try {
    //get get a list of your following
    const user = await User.findOne({ _id: req.body.id });

    //retrieve posts from your following
    let monthlyFeedIds = [];

    for (i = 0; i < user.followingList.length; i++) {
      //for each following user

      //find all the week posts
      const monthlyFeed = await Post.find({
        interval: "month",
        user: user.followingList[i].user,
      });
      for (g = 0; g < monthlyFeed.length; g++) {
        //for each post there is, add it to the array
        if (monthlyFeed[g]) {
          monthlyFeedIds.push({
            id: monthlyFeed[g]._id,
            createdAt: monthlyFeed[g].createdAt,
          });
        }
      }
    }
    //returns array of the id's for your monthly feed`
    return res.json(monthlyFeedIds);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// @route POST /api/posts/view/post
// @desc Retrieve a singular post
// @acess Public

router.post("/view/post", requiresAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.body.postId,
    });
    if (!post) {
      return res.status(404).send("Post doesn't exist");
    }

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
