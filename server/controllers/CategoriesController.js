const { Categories, Items } = require("../models");
const { mappingItems } = require("../utils/response");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    const response = categories.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));

    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategoriesById = async (req, res) => {
  try {
    const categories = await Categories.findByPk(req.params.id, {
      include: [
        {
          model: Items,
          where: {
            categories_id: req.params.id,
          },
          required: false,
        },
      ],
    });

    if (!categories)
      return res.status(404).json({ message: "Categories not found" });

    const dataItems = mappingItems(categories.Items);

    const response = {
      id: categories.id,
      name: categories.name,
      description: categories.description,
      items: dataItems,
    };

    return res.status(200).json({ category: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

    if (!users_id || !name || !description)
      return res.status(400).json({ message: "Bad request" });

    return res.status(201).json({ data: categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
};

const deleteCategories = async (req, res) => {
  try {
    await Categories.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesById,
  createCategories,
  updateCategories,
  deleteCategories,
};
