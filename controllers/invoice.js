const Invoice = require("../models/Invoice");
const Auction = require("../models/Auction");
const express = require("express");
const { paginationData } = require("./pagination");
const moment = require("moment");

// C
// Create Auction
const createInvoice = async (req, res, next) => {
  const newInvoice = new Invoice({
    time: moment().local().format(),
    pMethods: req.body.pMethods,
    description: req.body.description,
    status: req.body.status,
    auctionID: req.body.auctionID,
  });
  await newInvoice.save();
  return res.status(201).json({ invoice: newInvoice });
};

// G
const getAllInvoice = async (req, res, next) => {
  const invoice = await Invoice.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = paginationData(invoice, page, limit);
  return res.status(200).json({ results });
};
// Get Invoice by User
const getInvoicebyUser = async (req, res, next) => {
  const userID = req.body.userID;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const auction = await Auction.find({ userID: userID });
  const invoice = await Invoice.find({ auctionID: auction._id });
  const results = paginationData(invoice, page, limit);
  return res.status(200).json(results);
};

module.exports = {
  createInvoice,
  getAllInvoice,
  getInvoicebyUser,
};
