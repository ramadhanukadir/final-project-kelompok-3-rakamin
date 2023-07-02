const route = require('express').Router();
const suppliersRoute = require('../routes/Suppliers.Routes');
const suppliersItemsRoute =require('./Suppliers-Items.Routes')
const expensesRoute =require('./Expenses.Route');




route.use('/', suppliersRoute);
route.use('/', suppliersItemsRoute);
route.use('/', expensesRoute);



module.exports = route