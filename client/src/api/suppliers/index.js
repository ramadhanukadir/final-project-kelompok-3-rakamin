import { instance } from "@/modules/axios";

export const getAllSuppliers = async (page, sort, order, q, limit) => {
  try {
    const { data } = await instance.get(
      `/suppliers?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export const getSuppliersById = async (id) => {
  try {
    const { data } = await instance.get(`/suppliers/${id}`);
    return data.dataSuppliers;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
};
