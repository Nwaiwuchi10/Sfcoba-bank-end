const Calender = require("../models/Calender");
const Projects = require("../models/Projects");

const router = require("express").Router();

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newCalender = new Calender({
        eventTitle: req.body.eventTitle,

        desc: req.body.desc,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
      });

      //save post and respond
      const calender = await newCalender.save();
      //   res.status(200).send("File Uploaded Successfully");
      res.status(200).json({
        _id: calender._id,
        eventTitle: calender.eventTitle,
        eventDate: calender.eventDate,
        desc: calender.desc,
        eventTime: calender.eventTime,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get a post

router.get("/:id", async (req, res) => {
  try {
    const calender = await Calender.findById(req.params.id);

    res.status(200).json(calender);
  } catch (err) {
    res.status(500).json(err);
  }
});

////to get post by latest
router.get("/", async (req, res) => {
  try {
    const calenders = await Calender.find({}).sort({ createdAt: -1 });

    res.json(calenders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
