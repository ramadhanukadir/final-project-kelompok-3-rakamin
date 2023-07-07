const express = require('express');
const router = express.Router();
const warehousesStockController = require('./../controllers/WarehousesStockController');

router.get('/', warehousesStockController.getAllWarehousesStock);
router.get('/:id', warehousesStockController.getWarehousesStockById);
router.post('/move-items', warehousesStockController.moveItems);
router.put('/:id', warehousesStockController.updateWarehousesStock);
router.delete('/:id', warehousesStockController.deleteWarehousesStock);

module.exports = router;
