const asyncHandler = require("express-async-handler");
const Announcement = require("../models/Announcement");
const EventPost = require("../models/EventPost");
const Projects = require("../models/Projects");

const updateProject = asyncHandler(async (req, res) => {
  const project = await Projects.findById(req.params.id);
  if (project) {
    project.projectTitle = req.body.projectTitle || project.projectTitle;
    project.content = req.body.content || project.content;
    project.classOf = req.body.classOf || project.classOf;
    project.image = req.body.image || project.image;
    const updatedUser = await project.save();
    res.json({
      id: updatedUser.id,
      caption: updatedUser.caption,
      content: updatedUser.content,
      classOf: updatedUser.classOf,
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
  updateProject,
};
