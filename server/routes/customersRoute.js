const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customersController");
const auth = require("../middlewares/authMiddleware");

router.get("/customers",auth, customersController.getAllCustomers);

router.get("/customers/:id",auth, customersController.getCustomersById);

router.post("/customers",auth, customersController.createCustomers);

router.put("/customers/:id",auth, customersController.updateCustomers);

router.delete("/customers/:id",auth, customersController.deleteCustomers);

module.exports = router;