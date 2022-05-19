const mongoose = require("./connectDB");

const postSchema = mongoose.Schema(
  {
    title: String,
    like: Number,
    comment: Number,
    theme: String,
    posterImg: String,
    userID: { type: String, ref: "user" },
    typePost: String,
    saved: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "post", timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
