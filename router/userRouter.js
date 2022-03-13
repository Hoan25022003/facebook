const router = require("express").Router();
const userModel = require("../models/userModel");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

router.get("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });
    if (user) {
      const compare = await bcrypt.compare(req.body.password, user.password);
      if (compare) {
        const token = jwt.sign({ id: user._id }, "1234");
        await userModel.updateOne(
          { _id: user._id },
          {
            token: token,
          }
        );
        res.cookie("user", token, {
          expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        });
        res.status(200).json({ message: "Successful" });
      } else {
        res.status(400).json({ message: "Mật khẩu không chính xác" });
      }
    } else {
      res.status(400).json({ message: "Username không tồn tại" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  userModel
    .create(
      {
        username: "Hoan",
        age: 19,
        sex: "Male",
        password: "1234",
      },
      {
        username: "Chien",
        age: 22,
        sex: "Male",
        password: "123456",
      }
    )
    .then((data) => res.json("ok"))
    .catch((err) => res.json(err));
});

module.exports = router;
