import { instance } from "@/modules/axios";

export const getAllCategories = async () => {
  try {
    const { data } = await instance.get("/categories");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

export const getCategoriesId = async (id) => {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};
export const postCategories = async () => {
  try {
    const response = await instance.post("/categories");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
};

async function updateCategories(id) {
  try {
    const response = await instance.put(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}

async function deleteCategories(id) {
  try {
    const response = await instance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went Wrong");
  }
}
