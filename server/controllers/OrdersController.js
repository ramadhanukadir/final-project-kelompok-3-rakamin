const { Customers, Orders, Warehouses } = require("../models");
const { mappingOrders } = require("./../utils/response");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();

    const response = mappingOrders(orders);

    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    // const customer = await order.getCustomers();
    // const orderDetail = await order.getOrders_Items();
    const Customer = await Customers.findOne({
      where: { id: order.customers_id },
    });

    const Warehouse = await Warehouses.findOne({
      where: { id: order.warehouses_id },
    });
    const Items = await order.getItems();
    // const warehouses = await order.getWarehouses();
    // console.log(orderDetail);
    // console.log(items);

    // const total = totalPrice.reduce((a, b) => a + b, 0);

    const orderDetail = Items.map((item) => {
      return {
        name: item.name,
        quantity: item.Orders_Items.quantity,
        totalPrice: item.Orders_Items.total_price,
        revenue: item.Orders_Items.revenue,
      };
    });

    const totalProfit = orderDetail.map((item) => {
      return item.revenue;
    });

    const totalRevenue = orderDetail.map((item) => {
      return item.totalPrice;
    });

    console.log(orderDetail);

    // const x = items.map((item) => {
    //   return {
    //     quantity: item.Orders_Items.quantity,
    //   };
    // });

    // const orderItems = orderDetail.map((item) => {
    //   return {
    //     qty: item.quantity,
    //     total: item.total_price,
    //     netProfit: item.revenue,
    //   };
    // });

    const response = {
      // order,
      customer: Customer.full_name,
      warehouse: Warehouse.name,
      // order: orderDetail.length,
      // orderItems,
      // x,
      // items,
      // warehouse: warehouses,
      totalNetProfit: totalProfit.reduce((a, b) => a + b, 0),
      totalRevenue: totalRevenue.reduce((a, b) => a + b, 0),
      items: orderDetail,
    };
    //   {
    //   include: [
    //     {
    //       model: OrdersItems,
    //       where: {
    //         orders_id: req.params.id,
    //       },
    //       required: false,
    //       include: [
    //         {
    //           model: Items,
    //           required: false,
    //           attibutes: ["name"],
    //         },
    //       ],
    //     },
    //   ],
    // });

    // const orderDetail = order.Orders_Items.map((item) => {
    //   return {
    //     qty: item.quantity,
    //     total: item.total_price,
    //     netProfit: item.revenue,
    //     items: item.Item.name,
    //   };
    // });
    // const items = order.Orders_Items.map((item) => {
    //   return item.Item.name;
    // });

    // const totalPrice = order.Orders_Items.map((item) => {
    //   return item.total_price;
    // });

    // const totalRevenue = order.Orders_Items.map((item) => {
    //   return item.revenue;
    // });

    // const total = totalPrice.reduce((a, b) => a + b, 0);
    // const profit = totalRevenue.reduce((a, b) => a + b, 0);

    // const response = {
    //   customerId: order.customers_id,
    //   warehouseId: order.warehouses_id,
    //   total: total,
    //   profit: profit,
    //   orderItems: orderDetail,
    // };

    if (!order) return res.status(404).json({ message: "Orders not found" });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createOrders = async (req, res) => {};

module.exports = {
  getAllOrders,
  getOrdersById,
};
