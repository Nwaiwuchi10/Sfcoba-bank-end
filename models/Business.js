const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      default: [],
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

module.exports = mongoose.model("Business", BusinessSchema);
