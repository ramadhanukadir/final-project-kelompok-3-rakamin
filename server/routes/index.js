const express = require("express");
const router = express.Router();
const categoriesRoute = require("./categories");
const userRoute = require("./users");
const itemsRoute = require("./items");
const ordersRoute = require("./orders");
const customerRoute = require("./customers");
const suppliersRoute = require('./suppliers');
const suppliersItemsRoute =require('./suppliersItems')
const expensesRoute =require('./expense');
const authMiddleware = require("../middlewares/authMiddleware");

router.use("/users", userRoute);
router.use(authMiddleware);
router.use("/api/categories", categoriesRoute);
router.use("/api/items", itemsRoute);
router.use("/api/orders", ordersRoute);
router.use("/api/customer", customerRoute);
router.use('/suppliers', suppliersRoute);
router.use('/suppliers-items', suppliersItemsRoute);
router.use('/expense', expensesRoute);

module.exports = router;

