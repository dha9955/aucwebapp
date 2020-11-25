const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
  {
    time: {
      type: Date,
    },
    pMethods: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    auctionID: {
      type: Schema.Types.ObjectId,
      ref: "Auction",
    },
  },
  { collection: "Invoice" }
);

const Auction = mongoose.model("Invoice", InvoiceSchema);
module.exports = Auction;
