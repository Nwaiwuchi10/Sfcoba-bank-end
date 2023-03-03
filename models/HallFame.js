const mongoose = require("mongoose");

const HallFameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },

    yearofGraduation: {
      type: String,
      required: true,
      max: 500,
    },
    significantContribution: {
      type: String,
      max: 500,
      required: true,
    },
    imagePortrait: {
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

module.exports = mongoose.model("HallFame", HallFameSchema);
