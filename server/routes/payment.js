const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payments");

router.post("/", paymentController.postPayment);
module.exports = router;
