import { instance } from "./../../../modules/axios";

export const getCustomers = async () => {
  try {
    const response = await instance.get("/customer?page=1&limit=5");
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};

export const getCustomersById = async (id) => {
  try {
    const { data } = await instance.get(`/customer/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const editCustomersById = async (id) => {
  try {
    const { data } = await instance.put(`/customer/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const deleteCustomersById = async (id) => {
  try {
    const { data } = await instance.delete(`/customer/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
