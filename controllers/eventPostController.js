const asyncHandler = require("express-async-handler");
const EventPost = require("../models/EventPost");

const updateEventPost = asyncHandler(async (req, res) => {
  const eventPost = await EventPost.findById(req.params.id);
  if (eventPost) {
    eventPost.title = req.body.title || eventPost.title;
    eventPost.content = req.body.content || eventPost.content;
    eventPost.image = req.body.image || eventPost.image;

    const updatedUser = await eventPost.save();
    res.json({
      id: updatedUser.id,
      title: updatedUser.title,
      content: updatedUser.content,
      image: updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("Failed to update");
  }
});
//////

//////

module.exports = {
  updateEventPost,
};
