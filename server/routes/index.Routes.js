const route = require('express').Router();
const suppliersRoute = require('../routes/Suppliers.Routes');

route.use('/', suppliersRoute);



module.exports = route