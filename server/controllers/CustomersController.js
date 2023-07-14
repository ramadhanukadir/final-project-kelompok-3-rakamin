const { Customers } = require('../models');

const getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * req.query.limit;

    const customers = await Customers.findAll({
      attributes: { exclude: ['createdAt', 'updateAt'] },
      limit: req.query.limit,
      offset,
    });
    if (!customers) {
      return res.status(404).json({
        succes: false,
        message: 'Data Customers Not Found',
      });
    }
    const totalItems = await Customers.count();
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(201).json({
      succes: true,
      msg: 'Data Customers Retrieved',
      page,
      totalItems: customers.length,
      totalPages,
      dataCustomers: customers,
    });
    // } catch (error) {
    //   res.status(400).json({
    //     message: "Failed Data Customers",
    //     error,
    //   });

    // return res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomersById = async (req, res) => {
  try {
    const customers = await Customers.findByPk(req.params.id);
    if (!customers) res.status(404).json({ message: 'Customers not found' });
    return res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCustomers = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { full_name, address } = req.body;
    const customers = await Customers.create({
      users_id: id,
      full_name,
      address,
    });

    if (!users_id || !full_name || !address) res.status(400).json({ message: 'Bad request' });

    return res.status(201).json({ data: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomers = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { full_name, address } = req.body;
    await Customers.update({ users_id: id, full_name, address }, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomers = async (req, res) => {
  try {
    const customers = await Customers.destroy({ where: { id: req.params.id } });
    if (!customers) res.status(404).json({ message: 'something wrong' });

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomersById,
  createCustomers,
  updateCustomers,
  deleteCustomers,
};
