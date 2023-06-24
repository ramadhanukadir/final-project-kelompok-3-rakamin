// const express = require("express");
// const router = express.Router();
const db = require("./../models");
const Categories = db.Categories;

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();

    if (!categories)
      return res.status(404).json({ message: "Something went wrong" });

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
  }
};

const getCategoriesById = async (req, res) => {
  try {
    const categories = await Categories.findByPk(req.params.id);

    if (!categories)
      return res.status(404).json({ message: "Categories not found" });

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
  }
};

const createCategories = async (req, res) => {
  try {
    const { users_id, name, description } = req.body;
    const categories = await Categories.create({
      users_id,
      name,
      description,
    });
    return res.status(201).json({ data: categories });
  } catch (error) {
    console.log(error);
  }
};

const updateCategories = async (req, res) => {
  try {
    const { users_id, name, description } = req.body;
    await Categories.update(
      { users_id, name, description },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategories = async (req, res) => {
  try {
    await Categories.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoriesById,
  createCategories,
  updateCategories,
  deleteCategories,
};
