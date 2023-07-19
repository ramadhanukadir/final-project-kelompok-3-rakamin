import { instance } from '@/modules/axios';

export const getAllWarehousesStock = async () => {
  try {
    const { data } = await instance.get('/warehouses-stock');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllWarehouses = async (page, sort, order, q = '') => {
  try {
    const { data } = await instance.get(`/warehouses?page=${page}&q=${q}&sort=${sort}&order=${order}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
