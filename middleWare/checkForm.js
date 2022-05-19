const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  if (req.cookies.user) {
    userModel
      .findOne({
        token: req.cookies.user,
      })
      .then((data) => {
        if (data) {
          req.id = data._id;
          req.user = data;
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

const checkUser = (req, res, next) => {
  if (req.cookies.user) {
    userModel
      .findOne({
        token: req.cookies.user,
      })
      .then((data) => {
        if (data) {
          res.redirect("/Home");
        } else {
          next();
        }
      })
      .catch((err) => res.status(500).json(err));
  } else {
    next();
  }
};

module.exports = { checkLogin, checkUser };
