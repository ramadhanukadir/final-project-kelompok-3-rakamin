import { instance } from '@/modules/axios';

export const getAllCategories = async () => {
  try {
    const { data } = await instance.get('/categories');
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

export const getSuppliersById = async (id) => {
  try {
    const { data } = await instance.get(`/suppliers/${id}`);
    return data.dataSuppliers;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
};
