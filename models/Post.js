const { toBeChecked } = require("@testing-library/jest-dom/dist/matchers");
const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    interval: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//export the model
const Post = model("Post", PostSchema);
module.exports = Post;
