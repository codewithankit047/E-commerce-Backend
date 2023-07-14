const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  subscribe: Boolean,
});

module.exports= mongoose.model("users",userSchema)