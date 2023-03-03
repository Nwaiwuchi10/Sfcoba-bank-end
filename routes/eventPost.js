const router = require("express").Router();

const { updateEventPost } = require("../controllers/eventPostController");
const EventPost = require("../models/EventPost");

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newPost = new EventPost({
        title: req.body.title,
        image: req.body.image,

        content: req.body.content,
        videos: req.body.videos,
      });

      //save post and respond
      const post = await newPost.save();
      //   res.status(200).send("File Uploaded Successfully");
      res.status(200).json({
        _id: post._id,
        title: post.title,
        image: post.image,
        content: post.content,
        videos: post.videos,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get a post

router.get("/:id", async (req, res) => {
  try {
    const eventPost = await EventPost.findById(req.params.id);

    res.status(200).json(eventPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
/////
router.delete("/delete/:id", async (req, res) => {
  try {
    const eventPost = await EventPost.findById(req.params.id);

    if (eventPost) {
      await eventPost.remove();
      res.json({ message: "Post has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
///////
router.put("/update/:id", updateEventPost);
///////
////to get post by latest
router.get("/", async (req, res) => {
  try {
    const eventPosts = await EventPost.find({}).sort({ createdAt: -1 });

    res.json(eventPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
