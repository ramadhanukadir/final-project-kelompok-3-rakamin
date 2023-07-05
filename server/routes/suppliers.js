const router = require("express").Router();
const controller = require("../controllers/Supplier.Controller");

router.post("/", controller.postSupplier);
router.get("/", controller.getAllSupplier);
router.get("/:id", controller.getIdSuppliers);
router.put("/:id", controller.updateSupplier);
router.delete("/:id", controller.deleteSuppliers);

module.exports = router;
