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

const mappingOrders = (orders) => {
  return orders.map((order) => {
    return {
      id: order.id,
      warehousesId: order.warehouses_id,
      customersId: order.customers_id,
    };
  });
};

module.exports = {
  mappingItems,
  mappingOrders,
  responseItemsId,
  mappingCategory,
  responseCategoriesId,
};
