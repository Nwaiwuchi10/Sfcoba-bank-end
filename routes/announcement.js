const { updateAnnouncement } = require("../controllers/announcementController");
const Announcement = require("../models/Announcement");

const router = require("express").Router();

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newAnnouncement = new Announcement({
        caption: req.body.caption,

        content: req.body.content,
        activate: req.body.activate,
      });

      //save post and respond
      const announcement = await newAnnouncement.save();

      res.status(200).send({
        _id: announcement._id,
        caption: announcement.caption,

        content: announcement.content,
        activate: announcement.activate,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
///delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await announcement.remove();
      res.json({ message: "Post has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
///
//get a post

router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json(err);
  }
});

////to get post by latest
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });

    res.json(announcements);
  } catch (err) {
    res.status(500).json(err);
  }
});
///////
router.put("/update/:id", updateAnnouncement);
///////

module.exports = router;
