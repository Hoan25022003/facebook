const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/text", async (req, res) => {
  try {
    let token = req.cookies.user;
    if (token) {
      const user = await userModel.findOne({
        token: token,
      });
      postModel.create({
        theme: req.body.theme,
        title: req.body.title,
        userID: user._id,
        typePost: "text",
      });
      res.status(200).json({ message: "Successfull" });
    } else {
      res.status(400).json({ message: "Failed Post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Failed" });
  }
});

router.post('/picture' ,upload.single("picture") , async (req,res) => {
  try {
    let token = req.cookies.user;
    if (token) {
      const user = await userModel.findOne({
        token: token,
      });
      if (req.file) {
        postModel.create({
          posterImg : '/' + req.file.path,
          title: req.body.title,
          userID: user._id,
          typePost: "picture",
        })
        res.status(200).json({ message: "Successfull" });
      } else {
        postModel.create({
          title: req.body.title,
          userID: user._id,
          typePost: "text",
        })
        res.status(200).json({ message: "Successfull" });
      }
    } else {
      res.status(400).json({ message: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Failed" });
  }
})

module.exports = router;
