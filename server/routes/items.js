const express = require("express");
const router = express.Router();
const ItemsController = require("../controllers/ItemsController");

router.get("/items", ItemsController.getAllItems);

router.get("/items/:id", ItemsController.getItemsById);

router.post("/items", ItemsController.createItems);

router.put("/items/:id", ItemsController.updateItems);

router.delete("/items/:id", ItemsController.deleteItems);

router.post("/stocks", ItemsController.addStockItems);

module.exports = router;
