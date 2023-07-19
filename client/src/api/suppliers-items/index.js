import { instance } from "@/modules/axios";

export const getAllSuppliersItems = async () => {
  try {
    const { data } = await instance.get("/suppliers-items");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
