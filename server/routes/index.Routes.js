const route = require('express').Router();
const authJwt = require('../middlewares/authMiddleware')
const suppliersRoute = require('../routes/Suppliers.Routes');
const suppliersItemsRoute =require('./Suppliers-Items.Routes')
const expensesRoute =require('./Expenses.Route');



route.use(authJwt);
route.use('/', suppliersRoute);
route.use('/', suppliersItemsRoute);
route.use('/', expensesRoute);



module.exports = route