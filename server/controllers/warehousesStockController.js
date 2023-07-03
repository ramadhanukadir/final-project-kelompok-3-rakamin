const { Warehouses, Warehouses_Stock, sequelize } = require('../models');
const ownedData = require('../middlewares/dataHandler');

const moveItems = async (req, res) => {
  const t = await sequelize.transaction();
  const { id } = req.loggedUser;

  try {
    const { items_id, stock, source_warehouse_id, destination_warehouse_id } = req.body;

    // check if the source warehouse and destination are valid
    const sourceWarehouse = await ownedData(Warehouses, source_warehouse_id, id);
    const destinationWarehouse = await ownedData(Warehouses, destination_warehouse_id, id);

    // check products stock enough to be moved from the source warehouse
    const sourceStock = await Warehouses_Stock.findOne({
      where: { warehouses_id: sourceWarehouse.id, items_id: items_id },
      transaction: t,
    });

    if (!sourceStock || sourceStock.stock < stock) {
      return res.status(400).json({ message: 'Empty stock or less' });
    }

    // update source & destination quantity
    await sourceStock.decrement('stock', { by: stock, transaction: t });
    let destinationStock = await Warehouses_Stock.findOne({
      where: { warehouses_id: destinationWarehouse.id, items_id: items_id },
      transaction: t,
    });

    if (!destinationStock) {
      destinationStock = await Warehouses_Stock.create(
        {
          warehouses_id: destinationWarehouse.id,
          items_id: items_id,
          stock: stock,
        },
        { transaction: t }
      );
    } else {
      await destinationStock.increment('stock', { by: stock, transaction: t });
    }

    await t.commit();
    res.status(200).json({ message: 'Product moved successfully' });
  } catch (error) {
    await t.rollback();
    console.log(error.message);
  }
};

const getAllWarehousesStock = async (req, res) => {
  const { id } = req.loggedUser;
  try {
    // Get warehouses for the current user
    const warehouses = await Warehouses.findAll({
      where: { users_id: id },
    });

    // Get warehouseStocks for the warehouses belonging to the user
    const warehouseStocks = await Warehouses_Stock.findAll({
      where: { warehouses_id: warehouses.map((warehouses) => warehouses.id) },
      attributes: ['id', 'warehouses_id', 'items_id', 'stock'],
    });

    if (warehouseStocks) {
      res.status(200).json(warehouseStocks);
    } else {
      throw { name: 'ErrorNotFound' };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getWarehousesStockById = async (req, res) => {
  // const { idreq } = req.params.id;
  const { id } = req.loggedUser;

  try {
    const warehouseStock = await Warehouses_Stock.findOne({
      include: {
        model: Warehouses,
        where: { users_id: id },
        attributes: ['id', 'users_id', 'name', 'address', 'city', 'province', 'postal_code', 'telephone'],
      },
      where: {
        // users_id: id,
        id: req.params.id,
      },
      attributes: ['id', 'warehouses_id', 'items_id', 'stock'],
    });

    if (!warehouseStock) {
      res.status(400).json({ message: 'Not Found' });
    }

    res.status(200).json(warehouseStock);
  } catch (error) {
    console.log(error.message);
  }
};

const updateWarehousesStock = async (req, res) => {
  const { id } = req.loggedUser;
  const Userid = id;
  // console.log(Userid);
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { items_id, warehouses_id, stock } = req.body;

    const warehouseStock = await Warehouses_Stock.findOne({ where: { id: id }, transaction: t });
    console.log(warehouseStock);
    if (!warehouseStock) {
      res.status(400).json({ message: 'Warehouse Not Found' });
    }

    const warehouse = await Warehouses.findOne({ where: { id: warehouseStock.warehouses_id }, transaction: t });
    if (!warehouse || warehouse.users_id !== Userid) {
      res.status(400).json({ message: 'UnauthorizedError' });
    }
    // console.log(warehouse);

    if (warehouse.users_id === Userid) {
      await warehouseStock.update({ items_id, warehouses_id, stock }, { transaction: t });
    } else {
      res.status(400).json({ message: 'Unauthorized' });
    }

    await t.commit();
    res.status(200).json({ message: 'Warehouse stock updated successfully' });
  } catch (error) {
    await t.rollback();
    console.log(error);
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
  updateWarehousesStock,
  getWarehousesStockById,
};
