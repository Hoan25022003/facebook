const mongoose = require("../connectDB");

const postSchema = mongoose.Schema(
  {
    title: String,
    listImg: String,
    theme : String,
    like: Number,
    comment: Number,
    groupID : {type : String, ref : 'group'},
    memberID: { type: String, ref: "member" },
  },
  { collection: "post-private" }
);

const postPrivate = mongoose.model("post-private", postSchema);

module.exports = postPrivate;
