const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/OrdersController");

router.get("/", OrdersController.getAllOrders);
router.get("/:id", OrdersController.getOrdersById);

module.exports = router;
