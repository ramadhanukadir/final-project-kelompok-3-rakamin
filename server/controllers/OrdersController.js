const {
  Customers,
  Orders,
  Warehouses,
  Warehouses_Stock,
  Orders_Items,
  Items,
  sequelize,
} = require('../models');
const {
  mappingOrders,
  responseOrdersId,
  mappingOrderDetail,
  convertDate,
} = require('./../utils/response');

const getAllOrders = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const { page, limit, order, sort } = req.query;
    const { rows, count } = await Orders.findAndCountAll({
      offset: page && limit ? (page - 1) * limit : 0,
      limit: limit ? parseInt(limit) : 20,
      order: sort && order ? [[order, sort]] : [['createdAt', sort || 'DESC']],
      where: {
        users_id: id,
      },
    });
    const warehouse = await Warehouses.findAll();
    const customer = await Customers.findAll();
    const response = mappingOrders(rows, warehouse, customer);

    return res.status(200).json({
      meta: {
        page: page ? parseInt(page) : 1,
        totalPages: limit ? Math.ceil(count / limit) : Math.ceil(count / 20),
        totalData: count,
      },
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);

    if (!order) return res.status(404).json({ message: 'Orders not found' });

    const customer = await Customers.findOne({
      where: { id: order.customers_id },
    });
    const warehouse = await Warehouses.findOne({
      where: { id: order.warehouses_id },
    });

    const items = await order.getItems();
    const orderDetail = mappingOrderDetail(items);

    const totalRevenue = orderDetail.map((item) => {
      return item.totalPrice;
    });

    const response = responseOrdersId(
      customer,
      warehouse,
      totalRevenue,
      order.createdAt.toLocaleString('id-ID', convertDate),
      orderDetail
    );

    if (!order) return res.status(404).json({ message: 'Orders not found' });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const postOrders = async (req, res) => {
  const { id } = req.loggedUser;

  const t = await sequelize.transaction();
  try {
    const { customers_id, warehouses_id, orders_items } = req.body;

    const createOrders = await Orders.create(
      {
        customers_id: parseInt(customers_id),
        warehouses_id: parseInt(warehouses_id),
        users_id: id,
        total_revenue: 0,
      },
      {
        transaction: t,
      }
    );

    for (let i = 0; i < orders_items.length; i++) {
      const items = orders_items[i];

      const foundStock = await Warehouses_Stock.findOne({
        where: {
          warehouses_id,
          items_id: items.items_id,
        },
      });

      const foundItems = await Items.findOne({
        where: {
          id: items.items_id,
        },
      });

      if (!foundStock) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      if (foundStock.stock < items.quantity) {
        return res.status(400).json({ message: 'Stock Insufficient' });
      }

      const createItems = await Orders_Items.create(
        {
          orders_id: createOrders.id,
          items_id: parseInt(items.items_id),
          quantity: parseInt(items.quantity),
          total_price: foundItems.selling_price * parseInt(items.quantity),
        },
        { transaction: t }
      );

      await foundStock.decrement('stock', {
        by: parseInt(items.quantity),
        transaction: t,
      });

      await createOrders.increment('total_revenue', {
        by: createItems.total_price,
        transaction: t,
      });
    }

    await t.commit();
    res.status(201).json(createOrders);
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrdersById,
  postOrders,
};
