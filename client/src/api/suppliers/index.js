import { instance } from '@/modules/axios';

export const getAllSuppliers = async (filters = {}) => {
  try {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    const params = new URLSearchParams(nonEmptyFilters).toString();
    const { data } = await instance.get(`/suppliers?${params}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
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

export const postSupplier = async (data) => {
  try {
    const { data: response } = await instance.post('/suppliers', data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const putSupplier = async (id, data) => {
  try {
    const { data: response } = await instance.put(`/suppliers/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const deleteSupplier = async (id) => {
  try {
    const { data: response } = await instance.delete(`/suppliers/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};
