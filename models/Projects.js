const mongoose = require("mongoose");

const ProjectsPostSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,

      max: 50,
    },

    content: {
      type: String,
      max: 500,
    },
    classOf: {
      type: String,
      max: 500,
    },
    image: {
      type: Array,
      required: true,
      default: [],
      max: 10,
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

module.exports = mongoose.model("Projects", ProjectsPostSchema);
