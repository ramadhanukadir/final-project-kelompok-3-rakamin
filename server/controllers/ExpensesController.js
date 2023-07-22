const db = require("../models");
const { Expenses, Items, Warehouses_Stock, Orders } = db;

const postExpenses = async (req, res) => {
  try {
    const { users_id, warehouses_id, items_id, stock_update } = req.body;
    const { id } = req.loggedUser;

    const item = await Items.findOne({
      where: {
        id: items_id,
        users_id: id,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Item Not Found" });
    }

    const warehousesStock = await Warehouses_Stock.findOne({
      where: {
        // users_id: id,
        warehouses_id: warehouses_id,
        items_id: items_id,
      },
    });

    if (!warehousesStock) {
      return res.status(404).json({ message: "Stock Not Found" });
    }

    warehousesStock.stock += stock_update;

    if (stock_update === null || stock_update === undefined) {
      return res
        .status(400)
        .json({ message: "Stock Update Value Is Required" });
    }

    await warehousesStock.save();
    const total_expenses = warehousesStock.stock * item.base_price;

    const newExpenses = await Expenses.create({
      users_id: id,
      warehouses_id,
      items_id,
      stock_update,
      total_expenses,
    });

    res.status(201).json({
      success: true,
      message: "Created Data Expeneses Successfully",
      dataExpenses: newExpenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error",
      error,
    });
  }
};

const updateExpenses = async (req, res) => {
  try {
    const { users_id, warehouses_id, items_id, stock_update } = req.body;

    const updateExpenses = await Expenses.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!updateExpenses) {
      return res.status(404).json({ message: "Id Expenses not found" });
    }

    const item = await Items.findOne({
      where: {
        id: items_id,
        users_id: users_id,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const warehousesStock = await Warehouses_Stock.findOne({
      where: {
        users_id: users_id,
        warehouses_id: warehouses_id,
        items_id: items_id,
      },
    });

    if (!warehousesStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    warehousesStock.stock += stock_update;

    if (stock_update === null || stock_update === undefined) {
      return res
        .status(400)
        .json({ message: "Stock update value is required" });
    }

    await warehousesStock.save();
    console.log(warehousesStock.stock);

    const total_expenses = warehousesStock.stock * item.base_price;

    await Expenses.update(
      {
        users_id,
        warehouses_id,
        items_id,
        stock_update,
        total_expenses,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Updated Expenses Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Server Internal Error",
      error,
  });
  }
};

const getTotalExpenses = async (req, res) => {
  try {
    const {id} = req.loggedUser;
    const allExpenses = await Expenses.findAll({
      where: {
        users_id: id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!allExpenses) {
      res.status(404).json({
        succes: false,
        message: "Data Expenses Not Found",
      });
    }

    const expenses = await Expenses.findAll({
      where: {
        users_id: id,
      },
    });
    let totalExpenses = 0;
    expenses.forEach((expenses) => {
      totalExpenses += expenses.total_expenses;
    });

    if (!expenses) {
      res.status(404).json({
        succes: false,
        message: "Data Expenses Not Found",
      });
    }

    res.status(200).json({
      success: true,
      totalExpenses: totalExpenses,
      dataExpenses: allExpenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error",
      error,
    });
  }
};

const getIdExpenses = async (req, res) => {
  try {
    const id = req.params.id;
    const findOneExpenses = await Expenses.findByPk(id, {
      attributes: { exclude: ["createdAt", "updateAt"] },
    });

    if (!findOneExpenses) {
      return res.status(404).json({
        succes: false,
        message: "Data Id Expenses Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data Id Expenses Retrieved",
      dataExpenses: findOneExpenses,
    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: "",
    });
  }
};

const deleteExpenses = async (req, res) => {
  try {
    const id = req.params.id;
    const destroyExpenses = await Expenses.findByPk(id);

    if (!destroyExpenses) {
      return res.status(404).json({
        succes: false,
        message: "Data Expenses Not Found",
      });
    }

    await Expenses.destroy({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Deleted Data Expenses Sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: "Delete Data Expenses failed",
    });
  }
};

const getAllitemsOrders = async (req, res) => {
  try {
    const {id} = req.loggedUser
    const findAllItems = await Orders.findAll( { 
  
     where: {
      users_id: id
     }
    });

    if (!findAllItems) {
      return res.status(404).json({ message: "Items Not Found" });
    }

    res.status(200).json({
      success: true,
      msg: "Data Item retrieved",
      data: findAllItems,
    });
  } catch (error) {
    return res.send(400).json({
      error,
      msg: "Items Bad Request",
    });
  }
};

module.exports = {
  postExpenses,
  getTotalExpenses,
  updateExpenses,
  getIdExpenses,
  deleteExpenses,
  getAllitemsOrders,
};
