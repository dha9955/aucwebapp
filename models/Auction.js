const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bidPrice: {
    type: Number,
  },
  bidTime: {
    type: Date,
  },
},
{ collection: "Auction" });

const Auction = mongoose.model("Auction", AuctionSchema);
module.exports = Auction;
