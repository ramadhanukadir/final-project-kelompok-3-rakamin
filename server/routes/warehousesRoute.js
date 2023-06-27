const express = require('express');
const router = express.Router();
const warehousesController = require('../controllers/warehousescontrollers');

router.get('/warehouses', warehousesController.getAllWarehouses);
router.get('/warehouses/:id', warehousesController.getWarehousesById);
router.post('/warehouses', warehousesController.createWarehouses);
router.delete('/warehouses/:id', warehousesController.deleteWarehouses);
router.put('/warehouses/:id', warehousesController.updateWarehouses);

module.exports = router;
