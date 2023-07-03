const express = require('express');
const router = express.Router();
const categoriesRoute = require('./categories');
const userRoute = require('./users');
const itemsRoute = require('./items');
const ordersRoute = require('./orders');
const customerRoute = require('./customers');
const warehousesRoute = require('./warehouses');
const warehousesStockRoute = require('./warehousesStock');

const authMiddleware = require('../middlewares/authMiddleware');

router.use('/users', userRoute);
router.use(authMiddleware);
router.use('/api/categories', categoriesRoute);
router.use('/api/items', itemsRoute);
router.use('/api/orders', ordersRoute);
router.use('/api/customer', customerRoute);
router.use('/api/warehouses', warehousesRoute);
router.use('/api/warehouses-stock', warehousesStockRoute);

module.exports = router;
