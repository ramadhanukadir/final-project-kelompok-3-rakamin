const express = require("express");
const upload = require("./../middlewares/uploadPhoto");
const router = express.Router();
const ItemsController = require("../controllers/ItemsController");

router.get("/", ItemsController.getAllItems);

router.get("/:id", ItemsController.getItemsById);

router.post("/", upload.single("image_url"), ItemsController.createItems);

router.put("/:id", upload.single("image_url"), ItemsController.updateItems);

router.delete("/:id", ItemsController.deleteItems);

router.post("/stock", ItemsController.addStockItems);

module.exports = router;
