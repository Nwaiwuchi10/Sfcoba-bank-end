const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,

      max: 50,
    },
    secondName: {
      type: String,
      required: true,

      max: 50,
    },
    otherName: {
      type: String,
      // required: true,

      max: 50,
    },
    membershipId: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactAdress: {
      type: String,
      required: true,
    },
    yearOfGraduation: {
      type: String,
      required: true,

      max: 50,
    },
    profilePic: {
      type: Array,
      required: true,
      // required: true,
    },
    chapter: {
      type: String,
      max: 500,
      required: true,
    },
    soccerTeam: {
      type: String,
      max: 50,
    },

    draftToSoccerTeam: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    activateAccount: {
      type: Boolean,
      default: false,
    },
    roles: { type: String, default: "Member" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
