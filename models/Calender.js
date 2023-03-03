const mongoose = require("mongoose");

const CalenderSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
      max: 500,
    },

    desc: {
      type: String,
      max: 500,
    },
    eventDate: {
      type: String,
      max: 500,
      required: true,
    },
    eventTime: {
      type: String,
      max: 500,
      required: true,
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

module.exports = mongoose.model("Calender", CalenderSchema);
