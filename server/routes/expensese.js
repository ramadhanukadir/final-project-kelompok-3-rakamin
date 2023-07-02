const router = require('express').Router();
const controller = require('../controllers/ExpensesController');


router.post('/', controller.postExpenses);
router.get('/', controller.getTotalExpenses);
router.get('/:id', controller.getIdExpenses);
router.delete('/:id', controller.deleteExpenses);


router.put('/:id', controller.updateExpenses);


module.exports = route;