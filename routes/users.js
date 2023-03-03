const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  updateUserProfile,
  getUserById,
  getRoles,
  postRoles,
  getUserByRoles,
  updateUser,
  updateUserToAdmin,
  getChapter,
  postChapter,
} = require("../controllers/userController");

// //// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/roles", getRoles);

////// post a category
router.post("/roles", postRoles);
//////get all post that falls on a category
router.get("/roles/:rol", getUserByRoles);
/////update user
router.put("/profile/:id", updateUser);
router.put("/adminUpdate/:id", updateUserToAdmin);
////
router.get("/chapter", getChapter);

////// post a category
router.post("/chapter", postChapter);
////find user by id
router.get("/:id", getUserById);
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User Removed" });
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
