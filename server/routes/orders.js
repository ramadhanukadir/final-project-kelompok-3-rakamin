const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/OrdersController");

router.get("/", OrdersController.getAllOrders);
router.get("/:id", OrdersController.getOrdersById);
router.post("/", OrdersController.postOrders);

module.exports = router;
