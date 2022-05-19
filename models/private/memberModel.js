const mongoose = require("../connectDB");

const memberSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: "member",
    },
    groupID : {type : String, ref : 'group'},
    userID: { type: String, ref: "user" },
  },
  { collection: "member" }
);

const memberModel = mongoose.model("member", memberSchema);

module.exports = memberModel;
