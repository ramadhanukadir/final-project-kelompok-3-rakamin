import { instance } from "@/modules/axios";

export const getAllWarehousesStock = async () => {
  try {
    const { data } = await instance.get("/warehouses-stock");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
