const Projects = require("../models/Projects");
const Tribute = require("../models/Tribute");

const router = require("express").Router();

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newTribute = new Tribute({
        nameofDeadperson: req.body.nameofDeadperson,
        image: req.body.image,
        tributeLetter: req.body.tributeLetter,
        user: req.body.user,
        classOf: req.body.classOf,
      });

      //save post and respond
      const tribute = await newTribute.save();
      //   res.status(200).send("File Uploaded Successfully");
      res.status(200).send({
        _id: tribute._id,
        nameofDeadperson: tribute.nameofDeadperson,
        image: tribute.image,
        tributeLetter: tribute.tributeLetter,
        classOf: tribute.classOf,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get a post

router.get("/:id", async (req, res) => {
  try {
    const tribute = await Tribute.findById(req.params.id);

    res.status(200).json(tribute);
  } catch (err) {
    res.status(500).json(err);
  }
});

////to get post by latest
router.get("/", async (req, res) => {
  try {
    const tributes = await Tribute.find({}).sort({ createdAt: -1 });

    res.json(tributes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
