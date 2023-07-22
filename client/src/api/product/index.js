import { instance } from '@/modules/axios';

export const getAllItems = async (filters = {}) => {
  try {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    const params = new URLSearchParams(nonEmptyFilters).toString();
    const { data } = await instance.get(`/items?${params}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const getItemsById = async (id) => {
  try {
    const { data } = await instance.get(`/items/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const updateItems = async (id, payload) => {
  try {
    const { data } = await instance.put(`/items/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const deleteItems = async (id) => {
  try {
    const { data } = await instance.delete(`/items/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const postItems = async (payload) => {
  try {
    const { data } = await instance.post('/items', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const addStock = async (payload) => {
  try {
    const { data } = await instance.post('/items/stock', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};
