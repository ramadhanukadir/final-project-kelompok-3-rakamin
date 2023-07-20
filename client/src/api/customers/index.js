import { instance } from '@/modules/axios';

export const getAllCustomer = async (filters = {}) => {
  try {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    const params = new URLSearchParams(nonEmptyFilters).toString();
    const { data } = await instance.get(`/customer?${params}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCustomersById = async (id) => {
  try {
    const { data } = await instance.get(`/customer/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went Wrong');
  }
};

export const postCustomers = async (payload) => {
  try {
    const { data } = await instance.post('/customer', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went Wrong');
  }
};

export const editCustomersById = async (id, payload) => {
  try {
    const { data } = await instance.put(`/customer/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went Wrong');
  }
};

export const deleteCustomersById = async (id) => {
  try {
    const { data } = await instance.delete(`/customer/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went Wrong');
  }
};
