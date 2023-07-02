const express = require("express");
const router = express.Router();
const categoriesRoute = require("./categories");
const itemsRoute = require("./items");
const ordersRoute = require("./orders");
const customerRoute = require("./customersRoute");

router.use("/categories", categoriesRoute);
router.use("/items", itemsRoute);
router.use("/orders", ordersRoute);
router.use("/customer", customerRoute);

module.exports = router;
