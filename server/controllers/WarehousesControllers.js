const { Warehouses, Items, Warehouses_Stock } = require('../models');
const { mappingWarehouses, mappingItems, responseItemsId, responseWarehouseId } = require('../utils/response');

const getAllWarehouses = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const warehouses = await Warehouses.findAll({
      where: {
        users_id: id,
      },
    });

    const response = mappingWarehouses(warehouses);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchWarehousesByName = async (req, res) => {
  const { id } = req.loggedUser;
  const { searchValue } = req.query;

  try {
    const warehouses = await Warehouses.findAll({
      where: {
        users_id: id,
        name: {
          [Op.iLike]: `%${searchValue}%`, // Menggunakan Op.iLike untuk pencarian case-insensitive
        },
      },
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
    const findWarehouse = await Warehouses.findOne({
      where: {
        users_id: id,
        id: req.params.id,
      },
    });

    if (!findWarehouse) res.status(404).json({ message: 'Warehouses not found' });

    const warehouse = responseWarehouseId(findWarehouse);

    const warehouseStock = await Warehouses_Stock.findAll({
      where: {
        warehouses_id: warehouse.id,
      },
      include: [
        {
          model: Items,
          required: false,
        },
      ],
    });

    const stockItems = warehouseStock.map((item) => {
      return { stock: item.stock, items: responseItemsId(item.Item) };
    });
    res.status(200).json({ warehouse, stockItems });
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
  searchWarehousesByName,
};
