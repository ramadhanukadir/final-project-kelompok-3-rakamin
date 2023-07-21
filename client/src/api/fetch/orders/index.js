import { instance } from '@/modules/axios';

export const getAllCustomer = async () => {
  try {
    const { data } = await instance.get('/customer?page=1&limit=5');
    return data.dataCustomers;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllItems = async (page, sort, order, q = '') => {
  try {
    const { data } = await instance.get(`/items?page=${page}&q=${q}&sort=${sort}&order=${order}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllWarehouses = async () => {
  try {
    const { data } = await instance.get('/warehouses');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllWarehousesStock = async () => {
  try {
    const { data } = await instance.get('/warehouses-stock');
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

export const getAllCategories = async () => {
  try {
    const { data } = await instance.get('/categories');
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
    const { data } = await instance.post('/orders', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
