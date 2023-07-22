import { instance } from '@/modules/axios';

export const getAllWarehouses = async () => {
  try {
    const { data } = await instance.get('/warehouses');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
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

export const moveStock = async (payload) => {
  try {
    const { data } = await instance.post('/warehouses-stock/move-items', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
