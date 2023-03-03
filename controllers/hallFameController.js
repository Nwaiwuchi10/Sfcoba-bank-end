const asyncHandler = require("express-async-handler");
const EventPost = require("../models/EventPost");
const HallFame = require("../models/HallFame");

const updateHallFame = asyncHandler(async (req, res) => {
  const hallFame = await HallFame.findById(req.params.id);
  if (hallFame) {
    hallFame.name = req.body.name || hallFame.name;
    hallFame.yearofGraduation =
      req.body.yearofGraduation || hallFame.yearofGraduation;
    hallFame.significantContribution =
      req.body.significantContribution || hallFame.significantContribution;
    hallFame.imagePortrait = req.body.imagePortrait || hallFame.imagePortrait;

    const updatedUser = await hallFame.save();
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      significantContribution: updatedUser.significantContribution,
      yearofGraduation: updatedUser.yearofGraduation,
      imagePortrait: updatedUser.imagePortrait,
    });
  } else {
    res.status(404);
    throw new Error("Failed to update");
  }
});
//////

//////

module.exports = {
  updateHallFame,
};
