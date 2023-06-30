const {
  Items,
  Warehouses,
  Warehouses_Stock,
  Suppliers,
  Suppliers_Items,
  Expenses,
  sequelize,
} = require("../models");
const { mappingItems, responseItemsId } = require("../utils/response");

const getAllItems = async (req, res) => {
  const { page, limit, sort } = req.query;
  try {
    const { rows, count } = await Items.findAndCountAll({
      offset:
        page && limit ? (parseInt(page) - 1) * limit : (parseInt(page) - 1) * 5,
      limit: limit ? parseInt(limit) : 5,
      order: sort ? [["name", sort]] : null,
    });

    const response = mappingItems(rows);

    return res.status(200).json({
      meta: {
        page: page ? parseInt(page) : page,
        totalPages:
          page && limit ? Math.ceil(count / limit) : Math.ceil(count / 5),
        totalData: count,
      },
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getItemsById = async (req, res) => {
  try {
    const items = await Items.findByPk(req.params.id);

    if (!items) return res.status(404).json({ message: "Items not found" });

    const response = responseItemsId(items);

    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createItems = async (req, res) => {
  const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;
  try {
    const {
      users_id,
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
      users_id,
      categories_id,
      name,
      description,
      SKU,
      size,
      weight,
      image_url: imagePath,
      base_price,
      selling_price,
    });

    return res.status(201).json({ data: items });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateItems = async (req, res) => {
  const { id } = req.params;
  const { name, description, SKU, size, weight, base_price, selling_price } =
    req.body;

  try {
    const items = await Items.findByPk(id);
    let updatedData = {
      name,
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

    await Items.update(updatedData, {
      where: {
        id: items.id,
      },
      returning: true,
    });
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteItems = async (req, res) => {
  try {
    await Items.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addStockItems = async (req, res) => {
  try {
    const { users_id, warehouses_id, items_id, suppliers_id, stock } = req.body;
    await sequelize.transaction(async (t) => {
      const findItems = await Items.findOne({
        where: {
          id: items_id,
          users_id: users_id,
        },
        transaction: t,
      });

      const findWarehouses = await Warehouses.findOne({
        where: {
          id: warehouses_id,
        },
        transaction: t,
      });

      const findSuppliers = await Suppliers.findOne({
        where: {
          id: suppliers_id,
        },
        transaction: t,
      });

      const findSuppliersItems = await Suppliers_Items.findOne({
        where: {
          items_id: items_id,
          suppliers_id: suppliers_id,
        },
        transaction: t,
      });

      if (!findItems || !findWarehouses || !findSuppliers)
        return res.status(404).json({ message: "Not found" });

      const findStock = await Warehouses_Stock.findOne({
        where: {
          users_id: users_id,
          items_id: items_id,
          warehouses_id: warehouses_id,
        },
        transaction: t,
      });

      if (!findStock) {
        await Warehouses_Stock.create({
          users_id,
          items_id,
          warehouses_id,
          stock,
        });
        await Expenses.create({
          users_id,
          items_id,
          warehouses_id,
          stock_update: stock,
          total_expenses: findItems.base_price * stock,
        });

        if (!findSuppliersItems) {
          await Suppliers_Items.create({
            items_id,
            suppliers_id,
          });
        }

        return res.status(201).json({ message: "Successfully add stock" });
      } else {
        await Warehouses_Stock.update(
          {
            stock: findStock.stock + stock,
          },
          {
            where: {
              users_id: users_id,
              items_id: items_id,
              warehouses_id: warehouses_id,
            },
          },
          { transaction: t }
        );
        await Expenses.create({
          users_id,
          items_id,
          warehouses_id,
          suppliers_id,
          stock_update: stock,
          total_expenses: findItems.base_price * stock,
        });

        if (!findSuppliersItems) {
          await Suppliers_Items.create({
            items_id,
            suppliers_id,
          });
        }

        return res.status(200).json({ message: "Successfully update stock" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  getItemsById,
  createItems,
  updateItems,
  deleteItems,
  addStockItems,
};
