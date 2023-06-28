const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/categoriesController");

router.get("/categories", CategoriesController.getAllCategories);

router.get("/categories/:id", CategoriesController.getCategoriesById);

router.post("/categories", CategoriesController.createCategories);

router.put("/categories/:id", CategoriesController.updateCategories);

router.delete("/categories/:id", CategoriesController.deleteCategories);

module.exports = router;
