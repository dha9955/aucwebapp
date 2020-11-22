const Product = require("../models/Product");
const express = require("express");
const { paginationData } = require("./pagination");

// G
// Get All Product
const getAllProduct = async (req, res, next) =>{
  const product = await Product.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = paginationData(product, page, limit);
  return res.status(200).json({ results });
}
// Get Product by ID
const getProductbyID = async (req, res, next) => {
  const { productID } = req.params;
  const product = await Product.findById({ _id: productID });
  return res.status(200).json(product);
};

module.exports = {
  getAllProduct,
  getProductbyID,
};
