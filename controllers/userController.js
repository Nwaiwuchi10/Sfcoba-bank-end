const asyncHandler = require("express-async-handler");
const Chapter = require("../models/Chapter");

const Roles = require("../models/Roles");
const User = require("../models/User");

///////
//@desc Fetch all products
//@route Get/api/products
//@acess Fetch Public

const getMyUsers = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await User.countDocuments({ ...keyword });

  const users = await User.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});
///////

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      username: user.username,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
      followers: user.followers,
      followings: user.followings,
      desc: user.desc,
      from: user.from,
      city: user.city,
      relationship: user.relationship,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc Update user profile
//@route PUT/api/users/profile
//@acess Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.desc = req.body.desc || user.desc;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      isAdmin: updatedUser.isAdmin,
      phoneNumber: updatedUser.phoneNumber,
      desc: updatedUser.desc,
      city: updatedUser.city,
      country: updatedUser.country,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc Get user by ID
//@route GET/api/users/:id
//@acess Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

///////roles
const postRoles = asyncHandler(async (req, res) => {
  const roles = new Roles({
    roles: req.body.roles,
  });

  const createdRoles = await roles.save();
  if (createdRoles) {
    res.json({
      message: "User roles created successfully",
      createdRoles,
    });
  } else {
    res.json({
      message: "Error try again",
    });
  }
});
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Roles.find({});

  res.json({
    roles: roles,
  });
});
const getUserByRoles = asyncHandler(async (req, res) => {
  let users;
  if (req.params.rol == "Top") {
    users = await User.find({}).sort({ rating: -1 }).limit(50);
  } else if (req.params.rol == "Latest") {
    users = await User.find({}).sort({ createdAt: -1 }).limit(50);
  } else {
    users = await User.find({ roles: req.params.rol });
  }

  res.json({
    users,
    message: "Users found",
  });
});
//////chapter
///////roles
const postChapter = asyncHandler(async (req, res) => {
  const chapter = new Chapter({
    chapter: req.body.chapter,
  });

  const createdChapter = await chapter.save();
  if (createdChapter) {
    res.json({
      message: "User Chapter created successfully",
      createdChapter,
    });
  } else {
    res.json({
      message: "Error try again",
    });
  }
});
const getChapter = asyncHandler(async (req, res) => {
  const chapter = await Chapter.find({});

  res.json({
    chapter: chapter,
  });
});

//////admin setting a user roles and isAdmin
//@desc Update user
//@route PUT/api/users/:id
//@acess Private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.secondName = req.body.secondName || user.secondName;
    user.occupation = req.body.occupation || user.occupation;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.otherName = req.body.otherName || user.otherName;
    user.chapter = req.body.chapter || user.chapter;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.contactAdress = req.body.contactAdress || user.contactAdress;
    user.yearOfGraduation = req.body.yearOfGraduation || user.yearOfGraduation;
    user.membershipId = req.body.membershipId || user.membershipId;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.roles = req.body.roles || user.roles;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      roles: updatedUser.roles,
      otherName: updatedUser.otherName,
      secondName: updatedUser.secondName,
      phoneNumber: updatedUser.phoneNumber,
      contactAdress: updatedUser.contactAdress,
      membershipId: updatedUser.membershipId,
      occupation: updatedUser.occupation,
      chapter: updatedUser.chapter,
      profilePic: updatedUser.profilePic,
      yearOfGraduation: updatedUser.yearOfGraduation,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUserToAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Failed to update");
  }
});
module.exports = {
  updateUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getRoles,
  postRoles,
  postChapter,
  getChapter,
  getUserByRoles,
  updateUserToAdmin,
};
