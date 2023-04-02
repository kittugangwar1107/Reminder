const mongoose = require("mongoose");
const user = new mongoose.Schema({
  desc: String,
  email: String,
  contact:String,
  Sms:String,
  recur:String,
  subject:String,
  reminder:String,
  date:String

});

module.exports = mongoose.model("demo", user);