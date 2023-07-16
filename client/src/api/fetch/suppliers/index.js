import { instance } from "@/modules/axios";

export const getAllSuppliers = async () => {
  try {
    const { data } = await instance.get("/suppliers");
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
    console.error("Gagal mengambil data:", error);
  }
};
