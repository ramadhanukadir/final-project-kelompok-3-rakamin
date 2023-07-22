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
    categoriesId: items.categories_id,
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

const convertDate = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const mappingOrders = (orders, warehouse, customer) => {
  return orders.map((order) => {
    const Warehouse = warehouse.find((item) => item.id === order.warehouses_id);
    const Customer = customer.find((item) => item.id === order.customers_id);
    const date = order.createdAt.toLocaleString('id-ID', convertDate);
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

const mappingWarehouseStock = (warehouseStock, warehouse, items) => {
  return warehouseStock.map((ws) => {
    const findWarehouse = warehouse.find(
      (item) => item.id === ws.warehouses_id
    );
    const findItem = items.find((item) => item.id === ws.items_id);
    return {
      id: ws.id,
      warehouseId: ws.warehouses_id,
      warehouseName: findWarehouse?.name,
      itemsId: ws.items_id,
      itemsName: findItem?.name,
      stock: ws.stock,
    };
  });
};

const mappingOrderDetail = (items) => {
  return items.map((item) => {
    return {
      name: item.name,
      quantity: item.Orders_Items.quantity,
      price: item.selling_price,
      totalPrice: item.Orders_Items.total_price,
      image: item.image_url,
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

const responseWarehouseStockId = (warehouseStock, warehouse, items) => {
  return {
    id: warehouseStock.id,
    warehouse: warehouse.name,
    items: items.name,
    stock: warehouseStock.stock,
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
  mappingWarehouseStock,
  responseWarehouseStockId,
};
