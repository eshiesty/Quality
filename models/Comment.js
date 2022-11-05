const { toBeChecked } = require("@testing-library/jest-dom/dist/matchers");
const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    sender: {
      type: String,
      reqiured: true,
    },
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
    likeList: {
      type: Array,
      required: false,
    },
    replies: {
      type: Number,
      required: false,
    },
    replyList: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//export the model
const Comment = model("Comment", CommentSchema);
module.exports = Comment;
