const { toBeChecked } = require("@testing-library/jest-dom/dist/matchers");
const { Schema, model } = require("mongoose");

const ActivitySchema = new Schema(
  {
    reciever: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      reqiured: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    post: {
      type: String,
      required: false,
    },
    seen: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

//export the model
const Activity = model("Activity", ActivitySchema);
module.exports = Activity;
