const mongoose = require("./connectDB");

const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
    date: String,
    gender: String,
    avatar: String,
    token: String,
    coverImg: {
      type: String,
      default: "/public/img/cover-image-default.jpg",
    },
    profile: {
      address: String,
      position: String,
      education: String,
      working: String,
    },
  },
  { collection: "user" }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
