const mongoose = require("./connectDB");

const commentSchema = mongoose.Schema(
  {
    content: String,
    userID: { type: String, ref: "userModel" },
    postID: { type: String, ref: "postModel" },
  },
  { collection: "comment" }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
