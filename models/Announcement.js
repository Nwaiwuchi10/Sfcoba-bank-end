const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      max: 50,
    },

    content: {
      type: String,
      required: true,
      max: 500,
    },
    activate: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Announcement", AnnouncementSchema);
