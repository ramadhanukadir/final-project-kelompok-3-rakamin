const { Warehouses } = require('../models');

const getAllWarehouses = async (req, res) => {
  try {
    const response = await Warehouses.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const getWarehousesById = async (req, res) => {
  try {
    const response = await Warehouses.findByPk(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: 'Warehouse Not Found!',
      });
    }

    return res.status(200).json({ data: response });
  } catch (error) {
    console.log(error.message);
  }
};

const createWarehouses = async (req, res) => {
  try {
    await Warehouses.create(req.body);
    return res.status(201).json({ message: 'Warehouse Created' });
  } catch (error) {
    console.log(error);
  }
};

const updateWarehouses = async (req, res) => {
  try {
    await Warehouses.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Warehouse Updated' });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteWarehouses = async (req, res) => {
  try {
    await Warehouses.destroy({ where: { id: req.params.id } });

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
