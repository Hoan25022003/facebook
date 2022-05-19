const mongoose = require("../connectDB");

const groupSchema = mongoose.Schema(
  {
    name: String,
    avatar: String,
    coverImg: String,
  },
  { collection: "group" }
);

const groupModel = mongoose.model("group", groupSchema);

module.exports = groupModel;
