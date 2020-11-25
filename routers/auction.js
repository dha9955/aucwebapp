const express = require("express");
const router = require("express-promise-router")();

//
const auctionController = require("../controllers/auction");

//
router
  .route("/")
  .get(auctionController.getAllAuction)
  .post(auctionController.createAuction)

// G
router.route("/getAuctionbyProduct").get(auctionController.getAuctionbyProduct);

module.exports = router;
