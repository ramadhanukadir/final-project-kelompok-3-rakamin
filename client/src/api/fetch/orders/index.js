import { instance } from "@/modules/axios";

export const getAllCustomer = async () => {
  try {
    const { data } = await instance.get("/customer");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllItems = async (page, sort, order, q = "") => {
  try {
    const { data } = await instance.get(
      `/items?page=${page}&q=${q}&sort=${sort}&order=${order}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
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

export const getWarehousesById = async (id) => {
  try {
    const { data } = await instance.get(`/warehouses/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await instance.get('/orders');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getOrderById = async (id) => {
  try {
    const { data } = await instance.get(`/orders/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const postOrders = async (payload) => {
  try {
    const { data } = await instance.post("/orders", payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
