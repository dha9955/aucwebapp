const express = require("express");
const router = require("express-promise-router")();

//
const productController = require("../controllers/product");

//
router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createProduct)
  .delete(productController.deleteProduct);

// G
router.route("/getProductbyUser").get(productController.getProductbyUser);

router.route("getProductbyID").get(productController.getProductbyID);

module.exports = router;
