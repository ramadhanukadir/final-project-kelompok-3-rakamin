const route = require('express').Router();
const suppliersRoute = require('../routes/Suppliers.Routes');
const suppliersItemsRoute =require('./Suppliers-Items.Routes')

route.use('/', suppliersRoute);
route.use('/', suppliersItemsRoute);

module.exports = route