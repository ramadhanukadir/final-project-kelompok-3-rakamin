import { instance } from "@/modules/axios";

export const getAllSuppliers = async (filters = {}) => {
  try {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    const params = new URLSearchParams(nonEmptyFilters).toString();
    const { data } = await instance.get(`/suppliers?${params}`);
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
