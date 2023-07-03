const { Warehouses, Items } = require('../models');
const { mappingWarehouses } = require('../utils/response');

const getAllWarehouses = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const warehouses = await Warehouses.findAll({
      where: {
        users_id: id,
      },
      attributes: ['id', 'users_id', 'name', 'address', 'city', 'province', 'postal_code', 'telephone'],
    });

    const response = mappingWarehouses(warehouses);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWarehousesById = async (req, res) => {
  const { id } = req.loggedUser;

  try {
    const data = await Warehouses.findOne({
      where: {
        users_id: id,
        id: req.params.id,
      },
      attributes: ['id', 'users_id', 'name', 'address', 'city', 'province', 'postal_code', 'telephone'],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWarehouses = async (req, res) => {
  const { id } = req.loggedUser;
  const { name, address, city, province, postal_code, telephone } = req.body;
  try {
    const data = await Warehouses.create({
      users_id: id,
      name,
      address,
      city,
      province,
      postal_code,
      telephone,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWarehouses = async (req, res) => {
  const { id } = req.loggedUser;
  try {
    await Warehouses.update(req.body, {
      where: {
        users_id: id,
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Warehouse Updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWarehouses = async (req, res) => {
  const { id } = req.loggedUser;

  try {
    await Warehouses.destroy({
      where: {
        users_id: id,
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: 'Warehouse deleted' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllWarehouses,
  getWarehousesById,
  createWarehouses,
  deleteWarehouses,
  updateWarehouses,
};
