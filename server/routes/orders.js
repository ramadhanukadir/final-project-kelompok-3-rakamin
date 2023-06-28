const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/OrdersController");

router.get("/orders", OrdersController.getAllOrders);
router.get("/orders/:id", OrdersController.getOrdersById);

module.exports = router;
