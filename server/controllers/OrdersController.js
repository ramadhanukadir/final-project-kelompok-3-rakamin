const { Customers, Orders, Warehouses, sequelize } = require("../models");
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

const postOrders = async (req, res, next) => {
  const { users_id, customer_id, warehouse_id, order_id } = req.body;

  const t = await sequelize.transaction();

  try {
    const createdOrder = await Order.create(
      { users_id, customer_id, warehouse_id, user_id: req.user.id },
      { transaction: t }
    );

    let orderProductArray = [];
    let totalPrice = 0;

    for (let i = 0; i < order_products.length; i++) {
      const currentProduct = order_products[i];

      const product = await Product.findByPk(currentProduct.product_id, {
        transaction: t,
      });

      const warehouseStock = await WarehouseStock.findOne({
        where: {
          product_id: currentProduct.product_id,
          warehouse_id,
        },
        transaction: t,
      });

      if (!warehouseStock) {
        throw { name: "emptyStock" };
      }

      if (warehouseStock.quantity < currentProduct.quantity) {
        throw { name: "insufficient" };
      }

      const updatedQuantity = warehouseStock.quantity - currentProduct.quantity;
      await warehouseStock.update(
        { quantity: updatedQuantity },
        { transaction: t }
      );

      const createdOP = await OrderProduct.create(
        {
          product_id: currentProduct.product_id,
          order_id: createdOrder.id,
          price: currentProduct.price,
          quantity: currentProduct.quantity,
        },
        { transaction: t }
      );

      totalPrice += currentProduct.price * currentProduct.quantity;
      orderProductArray.push(createdOP);
    }

    await createdOrder.update({ total_price: totalPrice }, { transaction: t });

    await Revenue.create(
      {
        user_id: req.user.id,
        revenue: totalPrice,
        detail: `revenue from order detail ${createdOrder.id}`,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      ...createdOrder.dataValues,
      order_products: orderProductArray,
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const updateOrders = async (req, res) => {};

const deleteOrders = async (req, res) => {
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

module.exports = {
  getAllOrders,
  getOrdersById,
};
