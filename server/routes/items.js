const express = require("express");
const upload = require("./../middlewares/uploadPhoto");
const router = express.Router();
const ItemsController = require("../controllers/ItemsController");

router.get("/items", ItemsController.getAllItems);

router.get("/items/:id", ItemsController.getItemsById);

router.post("/items", upload.single("image_url"), ItemsController.createItems);

router.put(
  "/items/:id",
  upload.single("image_url"),
  ItemsController.updateItems
);

router.delete("/items/:id", ItemsController.deleteItems);

router.post("/stocks", ItemsController.addStockItems);

module.exports = router;
