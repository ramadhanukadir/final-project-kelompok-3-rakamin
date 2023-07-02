const express = require('express');
const router = express.Router();
const warehousesStockController = require('../controllers/warehousesStockController');

router.get('/warehousesStock', warehousesStockController.getAllWarehousesStock);
router.post('/warehousesStock/move', warehousesStockController.moveItems);
router.delete('/warehousesStock/:id', warehousesStockController.deleteWarehousesStock);

module.exports = router;
