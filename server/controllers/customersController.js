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

const createCustomers = async (req, res) => {
  try {
    const { users_id, full_name, address } = req.body;
    const customers = await Customers.create({
      users_id,
      full_name,
      address,
    });

    if (!users_id || !full_name || !address)
      return res.status(400).json({ message: "Bad request" });

    return res.status(201).json({ data: customers });
  } catch (error) {
    console.log(error);
  }
};

const updateCustomers = async (req, res) => {
  try {
    const { users_id, full_name, address } = req.body;
    await Customers.update(
      { users_id, full_name, address },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomers = async (req, res) => {
  try {
    await Customers.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getAllCustomers,
    getCustomersById,
    createCustomers,
    updateCustomers,
    deleteCustomers,
};