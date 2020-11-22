const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  condition: {
    type: String,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
  startPrice: {
    type: Number,
  },
  buyNowPrice: {
    type: Number,
  },
  stepUp: {
    type: Number,
  },
  currentPrice:{
    type: Number
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  status: {
    type: String,
  },
},
{ collection: "Product" });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
