const db = require("../models");
const { Expenses, Items, Warehouses_Stock } = db;

const postExpenses = async (req, res) => {
  try {
    const {users_id, warehouses_id, items_id, stock_update } = req.body;
    

   
    const item = await Items.findOne({
      where: {
        id:items_id,
        users_id: users_id,
      
      }
    });
    // console.log('item', item);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }


    const warehousesStock = await Warehouses_Stock.findOne({
      where: { 
        users_id: users_id, 
        warehouses_id: warehouses_id, 
        items_id: items_id
      },
    });
    // console.log('warehouseStock', warehousesStock);
    if (!warehousesStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

   
    if (stock_update === null || stock_update === undefined) {
      return res.status(400).json({ message: 'Stock update value is required' });
    }

    
    
   
    warehousesStock.stock += stock_update;
    
    await warehousesStock.save();
    console.log('warehpusesStock', typeof warehousesStock.stock);
    const total_expenses = warehousesStock.stock * item.base_price;

    console.log('item base price', typeof item.base_price);
    console.log('Total Expenses:', total_expenses);

  

    const newExpense = await Expenses.create({
      users_id,
      warehouses_id,
      items_id,
      stock_update,
      total_expenses
    });
    // console.log('New Expense:', newExpense);


    res.status(201).json({
      success: true,
      message: "Created Data Expeneses Successfully",
      newExpense,
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
    // const {users_id, warehouses_id, items_id, stock_update } = req.body;
    
  const id = req.params.id

  const idExp = await Expenses.findByPk(id);

  if(!idExp) {
    return res.status(404).json({ message: 'Item not found' });
    
  }

    const item = await Items.findOne({
      where: {
        id: items_id,
        users_id: users_id,
      },
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const warehousesStock = await Warehouses_Stock.findOne({
      where: {
        users_id: users_id,
        warehouses_id: warehouses_id,
        items_id: items_id,
      },
    });

    if (!warehousesStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    if (stock_update === null || stock_update === undefined) {
      return res.status(400).json({ message: 'Stock update value is required' });
    }

    warehousesStock.stock += stock_update;

    await warehousesStock.save();

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
          users_id,
          warehouses_id,
          items_id,
          id: id
        },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Updated Expenses Successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Internal Error',
      error,
    });
  }
};





const getTotalExpenses = async (req, res) => {
  try {
    const allExpenses = await Expenses.findAll({
      attributes: {exclude: ['createdAt', 'updatedAt']}
    });
    
    if(!allExpenses) {
      res.status(404).json({
        succes: false,
        message: "Data All Expenses Not Found"
      })
    }
    
    const expenses = await Expenses.findAll();
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      totalExpenses += expense.total_expenses;
    });

    
    if(!expenses) {
      res.status(404).json({
        succes: false,
        message: "Data All Expenses Not Found"
      })
    }

    res.status(200).json({
      success: true,
      totalExpenses: totalExpenses,
      allExpenses: allExpenses
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Internal Error',
      error,
    });
  }
};


const getIdExpensesController = async(req, res) => {
  try {
    const id = req.params.id
    const findOneExpenses = await Expeneses.findByPk(id);

    if(!findOneExpenses) {
      return res.status(404).json({
        succes: false,
        message: "Data Expenses Not Found"
      })
    }

   return res.status(200).json({
      success: true,
      message: "Data Expenses Retrieved"
    })
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: "Failed Get data"
    })
  }
}



module.exports = {
  postExpenses,
  getTotalExpenses,
  updateExpenses
};
