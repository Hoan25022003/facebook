const router = require("express").Router();
const path = require("path");
const checkLogin = require("../checkForm");

// router.get("/download", (req, res) => {
//   res.download(path.join("../public/img/ảnh đẹp thiên nhiên.jpg"));
// });

router.get("/Home", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});

router.get("/Register", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
