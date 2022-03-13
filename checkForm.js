const userModel = require("./models/userModel");
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  if (req.cookies.user) {
    const id = jwt.verify(req.cookies.user, "1234").id;
    userModel
      .findOne({
        _id: id,
      })
      .then((data) => {
        if (data) {
          next();
        } else {
          res.redirect("/Login");
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.redirect("/Login");
  }
};

module.exports = checkLogin;
