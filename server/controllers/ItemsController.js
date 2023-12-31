const { Op } = require('sequelize');
const {
  Items,
  Warehouses,
  Warehouses_Stock,
  Suppliers,
  Suppliers_Items,
  Expenses,
  sequelize,
} = require('../models');
const { mappingItems, responseItemsId } = require('../utils/response');

const getAllItems = async (req, res) => {
  const { id } = req.loggedUser;
  const { page, limit } = req.query;
  try {
    const { rows, count } = await Items.findAndCountAll(query(req.query, id));

    const response = mappingItems(rows);

    res.status(200).json({
      meta: {
        page: page && limit ? parseInt(page) : 1,
        totalPages: limit ? Math.ceil(count / limit) : Math.ceil(count / 20),
        totalData: count,
      },
      data: response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemsById = async (req, res) => {
  try {
    const items = await Items.findByPk(req.params.id);

    if (!items) res.status(404).json({ message: 'Items not found' });

    const response = responseItemsId(items);

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItems = async (req, res) => {
  const { id } = req.loggedUser;
  const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;
  try {
    const {
      categories_id,
      name,
      description,
      SKU,
      size,
      weight,
      base_price,
      selling_price,
    } = req.body;

    const items = await Items.create({
      users_id: id,
      categories_id: parseInt(categories_id),
      name,
      description,
      SKU,
      size,
      weight,
      image_url: imagePath,
      base_price,
      selling_price,
    });

    res.status(201).json({ data: items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItems = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    categories_id,
    description,
    SKU,
    size,
    weight,
    base_price,
    selling_price,
  } = req.body;

  try {
    const items = await Items.findByPk(id);
    let updatedData = {
      name,
      categories_id: parseInt(categories_id),
      description,
      SKU,
      size,
      weight,
      base_price,
      selling_price,
    };

    if (req.file) {
      const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;
      updatedData = {
        ...updatedData,
        image_url: imagePath,
      };
    }

    if (!items) res.status(404).json({ message: 'Items not found' });

    await Items.update(updatedData, {
      where: {
        id: items.id,
      },
      returning: true,
    });
    res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItems = async (req, res) => {
  try {
    const items = await Items.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!items) res.status(404).json({ message: 'Items not found' });

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStockItems = async (req, res) => {
  try {
    const { warehouses_id, items_id, suppliers_id, stock } = req.body;
    const { id } = req.loggedUser;
    await sequelize.transaction(async (t) => {
      const findItems = await Items.findOne({
        where: {
          id: items_id,
          users_id: id,
        },
      });

      const findWarehouses = await Warehouses.findOne({
        where: {
          id: warehouses_id,
        },
      });

      const findSuppliers = await Suppliers.findOne({
        where: {
          id: suppliers_id,
        },
      });

      const findSuppliersItems = await Suppliers_Items.findOne({
        where: {
          items_id: items_id,
          suppliers_id: suppliers_id,
        },
      });

      if (!findItems || !findWarehouses || !findSuppliers)
        return res.status(404).json({ message: 'Not found' });

      const findStock = await Warehouses_Stock.findOne({
        where: {
          items_id: items_id,
          warehouses_id: warehouses_id,
        },
      });

      if (!findStock) {
        await Warehouses_Stock.create(
          {
            items_id,
            warehouses_id,
            stock: parseInt(stock),
          },
          { transaction: t }
        );
        await Expenses.create(
          {
            users_id: id,
            items_id,
            warehouses_id,
            stock_update: parseInt(stock),
            total_expenses: findItems.base_price * parseInt(stock),
          },
          { transaction: t }
        );

        if (!findSuppliersItems) {
          await Suppliers_Items.create(
            {
              items_id,
              suppliers_id,
            },
            { transaction: t }
          );
        }

        return res.status(201).json({ message: 'Successfully add stock' });
      } else {
        await Warehouses_Stock.update(
          {
            stock: findStock.stock + parseInt(stock),
          },
          {
            where: {
              items_id: items_id,
              warehouses_id: warehouses_id,
            },
          },
          { transaction: t }
        );
        await Expenses.create(
          {
            users_id: id,
            items_id,
            warehouses_id,
            suppliers_id,
            stock_update: parseInt(stock),
            total_expenses: findItems.base_price * parseInt(stock),
          },
          { transaction: t }
        );

        if (!findSuppliersItems) {
          await Suppliers_Items.create(
            {
              items_id,
              suppliers_id,
            },
            { transaction: t }
          );
        }

        res.status(200).json({ message: 'Successfully update stock' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const query = (query, user) => {
  const { q, limit, page, sort, order } = query;
  const offset = page && limit ? (page - 1) * limit : 0;

  const result = {
    where: { users_id: user },
    limit: limit,
    offset: offset,
    distinct: true,
    order: sort && order ? [[order, sort]] : [[order || 'name', sort || 'ASC']],
  };

  if (q) {
    result.where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { SKU: { [Op.iLike]: `%${q}%` } },
    ];
  }

  return result;
};

module.exports = {
  getAllItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
  addStockItems,
};
