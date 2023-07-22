import { instance } from '@/modules/axios';

export const handleLogin = async (payload) => {
  try {
    const { data } = await instance.post('/users/login', payload);
    sessionStorage.setItem('token', data.accessToken);
    sessionStorage.setItem('userData', JSON.stringify(data.dataUser));
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const handleRegister = async (payload) => {
  try {
    const { data } = await instance.post('/users/register', payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const fetchUser = async () => {
  try {
    const { data } = await instance.get(`/user/me`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const updateUserLogin = async (payload) => {
  try {
    const { data } = await instance.put(`/user/me`, payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};
