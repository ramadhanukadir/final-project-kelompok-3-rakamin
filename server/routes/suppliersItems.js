const router = require('express').Router();
const controller = require('./../controllers/SupplierItemsController');

router.post('/', controller.postSupplierItems);
router.put('/:id', controller.updateSupplierItems);
router.get('/', controller.getAllSupplierItems);
router.get('/:id', controller.getIdSuppliersItems);
router.delete('/:id', controller.deleteSuppliersItems);

module.exports = router;
