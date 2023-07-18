import { instance } from '@/modules/axios';

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
    const { data } = await instance.post('/orders', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
