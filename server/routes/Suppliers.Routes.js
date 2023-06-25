const route = require('express').Router();
const controller = require('../controllers/Supplier.Controller');

route.post('/suppliers', controller.postSupplier);
route.get('/suppliers', controller.getAllSupplier);
route.get('/suppliers/:id', controller.getIdSuppliers);
route.put('/suppliers/:id', controller.updateSupplier);
route.delete('/suppliers/:id', controller.deleteSuppliers);


module.exports = route;