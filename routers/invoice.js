const express = require("express");
const router = require("express-promise-router")();

//
const invoiceController = require("../controllers/invoice");

//
router
  .route("/")
  .get(invoiceController.getAllInvoice)
  .post(invoiceController.createInvoice)
// G
router.route("/getInvoicebyUser").get(invoiceController.getInvoicebyUser);

module.exports = router;
