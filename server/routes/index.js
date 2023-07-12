const express = require('express');
const router = express.Router();
const categoriesRoute = require('./categories');
const userRoute = require('./users');
const itemsRoute = require('./items');
const ordersRoute = require('./orders');
const customerRoute = require('./customers');
const warehousesRoute = require('./warehouses');
const warehousesStockRoute = require('./warehousesStock');
const suppliersRoute = require('./suppliers');

const suppliersItemsRoute =require('./suppliersItems')
const expensesRoute =require('./expense');
const authMiddleware = require("../middlewares/authMiddleware");


router.use('/users', userRoute);
router.use(authMiddleware);
router.use('/user/me', userRoute);
router.use('/warehouses', warehousesRoute);
router.use('/warehouses-stock', warehousesStockRoute);
router.use('/categories', categoriesRoute);
router.use('/items', itemsRoute);
router.use('/orders', ordersRoute);
router.use('/customer', customerRoute);
router.use('/suppliers', suppliersRoute);
router.use('/suppliers-items', suppliersItemsRoute);
router.use('/expense', expensesRoute);



module.exports = router;
