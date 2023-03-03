const asyncHandler = require("express-async-handler");
const Announcement = require("../models/Announcement");
const EventPost = require("../models/EventPost");

const updateAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (announcement) {
    announcement.caption = req.body.caption || announcement.caption;
    announcement.content = req.body.content || announcement.content;

    const updatedUser = await announcement.save();
    res.json({
      id: updatedUser.id,
      caption: updatedUser.caption,
      content: updatedUser.content,
    });
  } else {
    res.status(404);
    throw new Error("Failed to update");
  }
});
//////

//////

module.exports = {
  updateAnnouncement,
};
