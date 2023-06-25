const { Customers } = require("./../models");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.findAll();
    return res.status(200).json({ data: customers });
  } catch (error) {
    console.log(error);
  }
};

const getCustomersById = async (req, res) => {
  try {
    const customers = await Customers.findByPk(req.params.id);
    return res.status(200).json({ data: customers });
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

    if (!users_id || !name || !description)
      return res.status(400).json({ message: "Bad request" });

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
    getAllCustomers,
    getCustomersById,
//   createCategories,
//   updateCategories,
//   deleteCategories,
};