import { instance } from '@/modules/axios';

export const getAllWarehousesStock = async () => {
  try {
    const { data } = await instance.get('/warehouses-stock');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getWarehouseById = async (id) => {
  try {
    const { data } = await instance.get(`/warehouses/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
