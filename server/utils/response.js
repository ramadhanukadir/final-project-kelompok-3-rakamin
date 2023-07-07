const mappingItems = (items) => {
  return items.map((item) => ({
    id: item.id,
    categoriesId: item.categories_id,
    name: item.name,
    description: item.description,
    SKU: item.SKU,
    size: item.size,
    weight: item.weight,
    imageUrl: item.image_url,
    basePrice: item.base_price,
    sellingPrice: item.selling_price,
  }));
};

const responseItemsId = (items) => {
  return {
    id: items.id,
    name: items.name,
    description: items.description,
    SKU: items.SKU,
    size: items.size,
    weight: items.weight,
    imageUrl: items.image_url,
    basePrice: items.base_price,
    sellingPrice: items.selling_price,
  };
};

const mappingCategory = (categories) => {
  return categories.map((category) => ({
    id: category.id,
    usersId: category.users_id,
    name: category.name,
    description: category.description,
  }));
};

const responseCategoriesId = (categories, include) => {
  return {
    id: categories.id,
    name: categories.name,
    description: categories.description,
    totalItems: include.length,
    items: include,
  };
};

const convertDate = (param) => {
  let date = new Date(param);
  let formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  return formattedDate;
};

const mappingOrders = (orders, warehouse, customer) => {
  return orders.map((order) => {
    const Warehouse = warehouse.find((item) => item.id === order.warehouses_id);
    const Customer = customer.find((item) => item.id === order.customers_id);
    const date = convertDate(order.createdAt);
    return {
      id: order.id,
      warehouse: Warehouse.name,
      customer: Customer.full_name,
      totalRevenue: order.total_revenue,
      date: date,
    };
  });
};

const mappingWarehouses = (warehouses) => {
  return warehouses.map((warehouse) => ({
    id: warehouse.id,
    name: warehouse.name,
    address: warehouse.address,
    city: warehouse.city,
    province: warehouse.province,
    postalCode: warehouse.postal_code,
    telephone: warehouse.telephone,
  }));
};

const responseWarehouseId = (warehouse) => {
  return {
    id: warehouse.id,
    name: warehouse.name,
    address: warehouse.address,
    city: warehouse.city,
    province: warehouse.province,
    postalCode: warehouse.postal_code,
    telephone: warehouse.telephone,
  };
};

const mappingOrderDetail = (items) => {
  return items.map((item) => {
    return {
      name: item.name,
      quantity: item.Orders_Items.quantity,
      price: item.selling_price,
      totalPrice: item.Orders_Items.total_price,
    };
  });
};

const responseOrdersId = (
  customer,
  warehouse,
  totalRevenue,
  date,
  orderDetail
) => {
  return {
    customer: customer.full_name,
    warehouse: warehouse.name,
    totalRevenue: totalRevenue.reduce((a, b) => a + b, 0),
    date,
    items: orderDetail,
  };
};

module.exports = {
  mappingItems,
  mappingOrders,
  responseItemsId,
  mappingCategory,
  responseCategoriesId,
  mappingWarehouses,
  responseWarehouseId,
  mappingOrderDetail,
  responseOrdersId,
  convertDate,
};
