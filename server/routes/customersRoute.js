const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customersController");

router.get("/customers", customersController.getAllCustomers);

router.get("/customers/:id", customersController.getCustomersById);

module.exports = router;