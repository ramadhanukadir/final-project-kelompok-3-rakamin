const { Warehouses, Warehouses_Stock } = require('../models');

const moveItems = async (req, res) => {
  try {
    const { items_id, stock, source_warehouse_id, destination_warehouse_id } = req.body;

    const sourceWarehouse = await Warehouses.findOne({
      where: {
        id: source_warehouse_id,
      },
    });

    const destinationWarehouse = await Warehouses.findOne({
      where: {
        id: destination_warehouse_id,
      },
    });

    const sourceStock = await Warehouses_Stock.findOne({
      where: { warehouses_id: sourceWarehouse.id, items_id: items_id },
    });

    if (!sourceStock || sourceStock.stock < stock) {
      // throw new Error('empty stock or less.');
      return res.status(400).json({ message: 'Empty stock or less' });
    }

    await sourceStock.decrement('stock', { by: stock });

    let destinationStock = await Warehouses_Stock.findOne({
      where: { warehouses_id: destinationWarehouse.id, items_id: items_id },
    });

    if (!destinationStock) {
      destinationStock = await Warehouses_Stock.create({
        warehouses_id: destinationWarehouse.id,
        items_id: items_id,
        stock: stock,
      });
    } else {
      await destinationStock.increment('stock', { by: stock });
    }
    res.status(200).json({ message: 'Item moved successfully' });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllWarehousesStock = async (req, res) => {
  try {
    const response = await Warehouses_Stock.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteWarehousesStock = async (req, res) => {
  try {
    await Warehouses_Stock.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: `stocks deleted` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllWarehousesStock,
  moveItems,
  deleteWarehousesStock,
};
