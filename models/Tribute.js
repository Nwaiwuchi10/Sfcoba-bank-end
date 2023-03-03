const mongoose = require("mongoose");

const TributeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tributeLetter: {
      type: String,
      required: true,
      max: 500,
    },

    nameofDeadperson: {
      type: String,
      required: true,
      max: 500,
    },
    classOf: {
      type: String,
      max: 500,
      required: true,
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

module.exports = mongoose.model("Tribute", TributeSchema);
