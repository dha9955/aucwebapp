const express = require("express");
const router = require("express-promise-router")();

//
const productController = require("../controllers/product");


//
router.route("/").get(productController.getAllProduct)

// G
router.route("/:productID").get(productController.getProductbyID);


module.exports = router;