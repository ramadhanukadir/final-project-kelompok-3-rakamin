import { instance } from './../../../modules/axios';


export const fetchData = async () => {
    try {
      const response = await instance.get("customer");
      const { data } = response.data;
      return data;
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };