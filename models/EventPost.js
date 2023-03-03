const mongoose = require("mongoose");

const EventPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      max: 50,
    },

    content: {
      type: String,

      max: 500,
    },

    image: {
      type: Array,

      default: [],
      max: 10,
    },
    videos: {
      type: Array,
      default: [],
      max: 5,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

module.exports = mongoose.model("EventPost", EventPostSchema);
