const Product = require("../models/Product");
const Auction = require("../models/Auction");
const express = require("express");
const { paginationData } = require("./pagination");
const moment = require("moment");

// C
// Create Auction
const createAuction = async (req, res, next) => {
  const productID = req.body.productID;
  const product = await Product.findOne({ _id: productID });
  const newAuction = new Auction({
    productID: productID,
    userID: req.body.userID,
    bidPrice: product.currentPrice + product.stepUp,
    bidTime: moment().local().format(),
  });
  product.currentPrice = newAuction.bidPrice;
  await newAuction.save();
  await product.save();
  return res.status(201).json({ auction: newAuction });
};

// G
const getAllAuction = async (req, res, next) => {
  const auction = await Auction.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = paginationData(auction, page, limit);
  return res.status(200).json({ results });
};
// Get Product's Auction
const getAuctionbyProduct = async (req, res, next) => {
  const productID = req.body.productID;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const auction = await Auction.find({ productID: productID });
  const results = paginationData(auction, page, limit);
  return res.status(200).json(results);
};
// Get Auction by User
const getAuctionbyUser = async (req, res, next) => {
  const userID = req.body.userID;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const auction = await Auction.find({ userID: userID });
  const results = paginationData(auction, page, limit);
  return res.status(200).json(results);
};
module.exports = {
  createAuction,
  getAllAuction,
  getAuctionbyProduct,
  getAuctionbyUser,
};
