const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Facebook");

const userSchema = mongoose.Schema(
  {
    username: String,
    age: Number,
    sex: String,
    password: String,
  },
  { collection: "user" }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
