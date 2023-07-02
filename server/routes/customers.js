const express = require("express");
const router = express.Router();
const customersController = require("../controllers/CustomersController");

router.get("/", customersController.getAllCustomers);

router.get("/:id", customersController.getCustomersById);

router.post("/", customersController.createCustomers);

router.put("/:id", customersController.updateCustomers);

router.delete("/:id", customersController.deleteCustomers);

module.exports = router;
