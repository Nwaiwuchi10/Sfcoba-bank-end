const router = require("express").Router();

const bcrypt = require("bcrypt");
const User = require("../models/User");
// const generateToken = require("../Utils/generateToken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // user exists
    const userExits = await User.findOne({ email: req.body.email });
    if (userExits) {
      res.status(400).json("User Exists");
    }
    //create new user

    const newUser = new User({
      occupation: req.body.occupation,
      firstName: req.body.firstName,
      email: req.body.email,
      secondName: req.body.secondName,
      otherName: req.body.otherName,
      soccerTeam: req.body.soccerTeam,
      isAdmin: req.body.isAdmin,
      profilePic: req.body.profilePic,
      membershipId: req.body.membershipId,
      yearOfGraduation: req.body.yearOfGraduation,
      activateAccount: req.body.activateAccount,
      draftToSoccerTeam: req.body.draftToSoccerTeam,
      roles: req.body.roles,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      chapter: req.body.chapter,
      contactAdress: req.body.contactAdress,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).send({
      _id: user._id,
      firstName: user.firstName,
      chapter: user.chapter,
      secondName: user.secondName,
      occupation: user.occupation,
      otherName: user.otherName,
      soccerTeam: user.soccerTeam,
      profilePic: user.profilePic,
      yearOfGraduation: user.yearOfGraduation,
      activateAccount: user.activateAccount,
      draftToSoccerTeam: user.draftToSoccerTeam,
      membershipId: user.membershipId,
      phoneNumber: user.phoneNumber,
      email: user.email,
      roles: user.roles,
      isAdmin: user.isAdmin,
      contactAdress: user.contactAdress,
      // token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
/////
//  user: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
//   ref: "User",
// },

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.send(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.send(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
