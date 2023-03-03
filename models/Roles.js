const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const RolesSchema = new mongoose.Schema(
  {
    roles: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roles", RolesSchema);
