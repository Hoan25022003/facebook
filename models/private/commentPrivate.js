const mongoose = require("../connectDB");

const commentSchema = mongoose.Schema(
  {
    content: String,
    memberID: { type: String, ref: "member" },
    postID: { type: String, ref: "post-private" },
  },
  { collection: "comment-private" }
);

const commentPrivate = mongoose.model("comment-private", commentSchema);

module.exports = commentPrivate;
