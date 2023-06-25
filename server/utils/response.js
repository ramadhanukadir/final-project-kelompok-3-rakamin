const mappingItems = (models) => {
  return models.map((item) => ({
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

const responseItems = (items) => {
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

module.exports = {
  mappingItems,
  responseItems,
};
