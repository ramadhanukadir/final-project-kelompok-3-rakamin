import { instance } from "../axios";

async function getAllItems() {
  try {
    const response = await instance.get("/items?page=1&q&sort=ASC&order=name");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllItemsById(id) {
  try {
    const response = await instance.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteItems(id) {
  try {
    const response = await instance.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function updateItems(id) {
  try {
    const response = await instance.put(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function updateWarehouses(id) {
  try {
    const response = await instance.put(`/warehouses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllWarehouses() {
  try {
    const response = await instance.get("/warehouses");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllWarehouseStock() {
  try {
    const response = await instance.get("/warehouses-stock");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllSuppliers() {
  try {
    const response = await instance.get("/suppliers?page=1&limit=1");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getWarehouseId(id) {
  try {
    const response = await instance.get(`/warehouses/${id}`);
    return response.data.warehouse;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

async function getAllCategories() {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

async function getCategoriesId(id) {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

async function postCategories() {
  try {
    const response = await instance.post("/categories");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

async function updateCategories(id) {
  try {
    const response = await instance.put(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

async function deleteCategories(id) {
  try {
    const response = await instance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

export {
  getAllItems,
  getAllItemsById,
  getAllWarehouses,
  getAllWarehouseStock,
  getAllSuppliers,
  getWarehouseId,
  deleteItems,
  updateItems,
  getAllCategories,
  getCategoriesId,
  updateCategories,
  postCategories,
  deleteCategories,
  updateWarehouses,
};
