const express = require("express");
const router = express.Router();
const categoriesRoute = require("./categories");
const itemsRoute = require("./items");
const ordersRoute = require("./orders");

router.use("/categories", categoriesRoute);
router.use("/items", itemsRoute);
router.use("/orders", ordersRoute);

module.exports = router;
