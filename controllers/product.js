const Product = require("../models/Product");
const User = require("../models/User");
const express = require("express");
const { paginationData } = require("./pagination");
const moment = require("moment");

// C
// Create Product
const createProduct = async (req, res, next) => {
  const userID = req.body.userID;
  const timeRange = req.body.timeRange;
  // create new product
  const newProduct = new Product({
    owner: userID,
    name: req.body.name,
    image: req.body.image,
    category: req.body.categoy,
    condition: req.body.condition,
    brand: req.body.brand,
    description: req.body.description,
    startPrice: req.body.startPrice,
    buyNowPrice: req.body.buyNowPrice,
    stepUp: req.body.stepUp,
    currentPrice: req.body.startPrice,
    startTime: moment().toString(),
    endTime: moment().add(timeRange, "d"),
    status: "posted",
  });
  await newProduct.save();
  return res.status(201).json({ product: newProduct });
};

// D
// Delete Product
const deleteProduct = async (req, res, next) => {
  const productID  = req.body.productID;
  //get product
  const product = await Product.findOneAndDelete({ _id: productID });
  return res.status(200).json({ success: true });
};
// G
// Get All Product
const getAllProduct = async (req, res, next) => {
  const product = await Product.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = paginationData(product, page, limit);
  return res.status(200).json({ results });
};
// Get Product by ID
const getProductbyID = async (req, res, next) => {
  const productID  = req.body.productID;
  const product = await Product.findById({ _id: productID });
  return res.status(200).json(product);
};
// Get Product by User
const getProductbyUser = async (req, res, next) => {
  const userID  = req.body.userID;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const product = await Product.find({ owner: userID });
  const results = paginationData(product, page, limit);
  return res.status(200).json({ results });
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductbyID,
  getProductbyUser,
};
