const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/CategoriesController");

router.get("/", CategoriesController.getAllCategories);
router.get("/:id", CategoriesController.getCategoriesById);
router.post("/", CategoriesController.createCategories);
router.put("/:id", CategoriesController.updateCategories);
router.delete("/:id", CategoriesController.deleteCategories);

module.exports = router;
