const { Categories, Items } = require('../models');
const {
  mappingItems,
  mappingCategory,
  responseCategoriesId,
} = require('../utils/response');

const getAllCategories = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const categories = await Categories.findAll({
      where: {
        users_id: id,
      },
    });

    const response = mappingCategory(categories);

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    if (!categories) res.status(404).json({ message: 'Categories not found' });

    const dataItems = mappingItems(categories.Items);

    const response = responseCategoriesId(categories, dataItems);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategories = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { name, description } = req.body;
    const categories = await Categories.create({
      users_id: id,
      name,
      description,
    });

    if (!name || !description) res.status(400).json({ message: 'Bad request' });

    res.status(201).json({ data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategories = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { name, description } = req.body;
    await Categories.update(
      { users_id: id, name, description },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategories = async (req, res) => {
  try {
    await Categories.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesById,
  createCategories,
  updateCategories,
  deleteCategories,
};
