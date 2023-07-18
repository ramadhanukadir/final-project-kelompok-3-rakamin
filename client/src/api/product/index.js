import { instance } from "@/modules/axios";

export const getAllItems = async (page, sort, order, q = "") => {
  try {
    const { data } = await instance.get(
      `/items?page=${page}&q=${q}&sort=${sort}&order=${order}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export const getAllWarehouses = async () => {
  try {
    const { data } = await instance.get("/warehouses");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllWarehousesStock = async () => {
  try {
    const { data } = await instance.get("/warehouses-stock");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export const getAllSuppliers = async (page, limit) => {
  try {
    const { data } = await instance.get(
      `/suppliers?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export const getWarehouseId = async (id) => {
  try {
    const { data } = await instance.get(`/warehouses/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};
