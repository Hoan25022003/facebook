const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const { checkLogin, checkUser } = require("../middleWare/checkForm");
let listTheme = [
  "/public/themes/theme1.jpg",
  "/public/themes/theme2.jpg",
  "/public/themes/theme3.jpg",
  "/public/themes/theme4.jpg",
  "/public/themes/theme5.jpg",
  "/public/themes/theme6.jpg",
  "/public/themes/theme7.jpg",
];
// router.get("/download", (req, res) => {
//   res.download(path.join("../public/img/ảnh đẹp thiên nhiên.jpg"));
// });

router.get("/Home", checkLogin, async (req, res) => {
  try {
    const listUser = await userModel.find();
    const listPost = await postModel.find().populate("userID");
    res.render("home/home", {
      user: req.user,
      listUser,
      listPost,
      listTheme,
    });
  } catch (error) {
    res.status(400).json({ message: "That bai" });
  }
});

router.get("/Register", checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/form/register.html"));
});

router.get("/Login", checkUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/form/login.html"));
});

module.exports = router;
