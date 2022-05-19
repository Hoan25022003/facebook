const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Facebook");

module.exports = mongoose;
