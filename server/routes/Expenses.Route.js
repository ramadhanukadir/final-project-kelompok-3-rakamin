const route = require('express').Router();
const controller = require('../controllers/Expenses.Controller');


route.post('/expense', controller.postExpenses);
route.get('/expense', controller.getTotalExpenses);
route.get('/expense/:id', controller.getIdExpenses);
route.delete('/expense/:id', controller.deleteExpenses);


route.put('/expense/:id', controller.updateExpenses);


module.exports = route;