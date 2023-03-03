const { updateProject } = require("../controllers/projectController");
const Projects = require("../models/Projects");

const router = require("express").Router();

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newPost = new Projects({
        projectTitle: req.body.projectTitle,
        image: req.body.image,

        content: req.body.content,
        classOf: req.body.classOf,
      });

      //save post and respond
      const project = await newPost.save();
      //   res.status(200).send("File Uploaded Successfully");
      res.status(200).json({
        _id: project._id,
        projectTitle: project.projectTitle,
        image: project.image,
        content: project.content,
        classOf: project.classOf,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get a post

router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});
///
router.delete("/delete/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (project) {
      await project.remove();
      res.json({ message: "Post has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
////to get post by latest
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.find({}).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});
///////
router.put("/update/:id", updateProject);
///////
module.exports = router;
