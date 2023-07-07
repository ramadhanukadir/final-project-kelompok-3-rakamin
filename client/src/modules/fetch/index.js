import { instance } from "../axios";
import axios from "axios";

async function getAllCategories() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4MzkyMjM1fQ.dykfC99ggIgbUONO-E4MCfgzH0C3P0XGB7Wtt1M7EAM"; // Replace with your actual token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/items?page=1&q&sort=ASC&order=name",
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllWarehouse() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4MzkyMjM1fQ.dykfC99ggIgbUONO-E4MCfgzH0C3P0XGB7Wtt1M7EAM"; // Replace with your actual token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`http://localhost:3000/api/warehouses`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllWarehouseStock() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4MzkyMjM1fQ.dykfC99ggIgbUONO-E4MCfgzH0C3P0XGB7Wtt1M7EAM"; // Replace with your actual token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/warehouses-stock",
      { headers }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllSuppliers() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4MzkyMjM1fQ.dykfC99ggIgbUONO-E4MCfgzH0C3P0XGB7Wtt1M7EAM"; // Replace with your actual token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/suppliers?page=1&limit=1",
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  getAllCategories,
  getAllWarehouse,
  getAllWarehouseStock,
  getAllSuppliers,
};
