const route = require('express').Router();
const authJwt = require('../middlewares/authMiddleware')
const suppliersRoute = require('./suppliers');
const suppliersItemsRoute =require('./suppliersItems')
const expensesRoute =require('./expensese');

route.use(authJwt);
route.use('/', suppliersRoute);
route.use('/', suppliersItemsRoute);
route.use('/', expensesRoute);



module.exports = route