const route = require('express').Router();
const controller = require('../controllers/Supplier-Items.Controller');


route.post('/suppliers-items', controller.postSupplierItems);
route.put('/suppliers-items/:id', controller.updateSupplierItems);
route.get('/suppliers-items', controller.getAllSupplierItems);
route.get('/suppliers-items/:id', controller.getIdSuppliersItems);
route.delete('/suppliers-items/:id', controller.deleteSuppliersItems);




module.exports = route