const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id:String,
  name: String,
  brand: String,
  modal: String,
  price: String,
  category: String,
});

module.exports = mongoose.model("products", productSchema);
