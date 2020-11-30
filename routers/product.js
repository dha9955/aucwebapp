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
//
router.route("/:productID").get(productController.getProductbyID);


// S
router.route("/sortDesPrice").get(productController.sortDesPrice);
router.route("/sortAscPrice").get(productController.sortAscPrice);
router.route("/sortNewestProduct").get(productController.sortNewestProduct);
router.route("/sortEndingSoonProduct").get(productController.sortEndingSoonProduct)

module.exports = router;
