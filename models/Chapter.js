const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ChapterSchema = new mongoose.Schema(
  {
    chapter: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", ChapterSchema);
