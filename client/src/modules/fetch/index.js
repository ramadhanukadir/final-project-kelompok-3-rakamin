import { instance } from "../axios";
import axios from "axios";

async function getAllCategories() {
  try {
    const response = await instance.get("/items?page=1&q&sort=ASC&order=name");
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
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

export {
  getAllCategories,
  getAllWarehouses,
  getAllWarehouseStock,
  getAllSuppliers,
  getWarehouseId,
  deleteItems,
  updateItems,
};
