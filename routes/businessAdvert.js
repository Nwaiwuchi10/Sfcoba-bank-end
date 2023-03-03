const router = require("express").Router();

const Business = require("../models/Business");

/////multer storage

/////create new post
router.post(
  "/",

  async (req, res) => {
    try {
      //create new user
      const newPost = new Business({
        image: req.body.image,
      });

      //save post and respond
      const business = await newPost.save();
      //   res.status(200).send("File Uploaded Successfully");
      res.status(200).json({
        _id: business._id,

        image: business.image,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

////to get post by latest
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find({}).sort({ createdAt: -1 });

    res.json(businesses);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
