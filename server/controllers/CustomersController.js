const { Customers } = require('../models');

const getAllCustomers = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { page, limit, sort, order } = req.query;

    const { rows, count } = await Customers.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      offset: page && limit ? (page - 1) * limit : 0,
      limit: limit ? parseInt(limit) : null,
      order: sort && order ? [[order, sort]] : [['full_name', sort || 'ASC']],
      where: {
        users_id: id,
      },
    });
    if (!rows) {
      return res.status(404).json({
        succes: false,
        message: 'Data Customers Not Found',
      });
    }
    const totalItems = count;
    const totalPages = limit ? Math.ceil(count / limit) : 1;

    return res.status(201).json({
      succes: true,
      msg: 'Data Customers Retrieved',
      page: page ? parseInt(page) : 1,
      totalItems,
      totalPages,
      dataCustomers: rows,
    });
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

    if (!full_name || !address)
      res.status(400).json({ message: 'Bad request' });

    return res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomers = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { full_name, address } = req.body;
    await Customers.update(
      { users_id: id, full_name, address },
      { where: { id: req.params.id } }
    );
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
