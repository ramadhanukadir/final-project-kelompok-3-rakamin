const { Op } = require('sequelize');
const { Warehouses, Items, Warehouses_Stock } = require('../models');
const { mappingWarehouses, mappingItems, responseItemsId, responseWarehouseId } = require('../utils/response');

const getAllWarehouses = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const warehouses = await Warehouses.findAll({
      where: {
        users_id: id,
      },
      order: [['createdAt', 'DESC']],
    });

    const response = mappingWarehouses(warehouses);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllWarehousesWithFilter = async (req, res) => {
  const { id } = req.loggedUser;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || '';
  const offset = limit * page;
  const totalRows = await Warehouses.count({
    where: {
      users_id: id,
      [Op.or]: [
        {
          name: {
            [Op.iLike]: '%' + search + '%',
          },
        },
        {
          city: {
            [Op.iLike]: '%' + search + '%',
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Warehouses.findAll({
    where: {
      users_id: id,
      [Op.or]: [
        {
          name: {
            [Op.iLike]: '%' + search + '%',
          },
        },
        {
          city: {
            [Op.iLike]: '%' + search + '%',
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPages: totalPage,
  });
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
  getAllWarehousesWithFilter,
  getWarehousesById,
  createWarehouses,
  deleteWarehouses,
  updateWarehouses,
};
