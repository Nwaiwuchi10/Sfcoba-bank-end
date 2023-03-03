const { updateHallFame } = require("../controllers/hallFameController");
const HallFame = require("../models/HallFame");
const Projects = require("../models/Projects");

const router = require("express").Router();

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newFame = new HallFame({
        name: req.body.name,
        imagePortrait: req.body.imagePortrait,

        yearofGraduation: req.body.yearofGraduation,
        significantContribution: req.body.significantContribution,
      });

      //save post and respond
      const hallFame = await newFame.save();
      //   res.status(200).send("File Uploaded Successfully");
      res.status(200).send({
        _id: hallFame._id,
        name: hallFame.name,
        imagePortrait: hallFame.imagePortrait,
        yearofGraduation: hallFame.yearofGraduation,
        significantContribution: hallFame.significantContribution,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
///////
router.put("/update/:id", updateHallFame);
///////
///delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const hallFame = await HallFame.findById(req.params.id);
    if (hallFame) {
      await hallFame.remove();
      res.json({ message: "Post has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//////
//get a post

router.get("/:id", async (req, res) => {
  try {
    const hallFame = await HallFame.findById(req.params.id);

    res.status(200).json(hallFame);
  } catch (err) {
    res.status(500).json(err);
  }
});

////to get post by latest
router.get("/", async (req, res) => {
  try {
    const hallFames = await HallFame.find({}).sort({ createdAt: -1 });

    res.json(hallFames);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
