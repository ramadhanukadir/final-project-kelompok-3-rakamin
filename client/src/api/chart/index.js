import { instance } from "@/modules/axios";
export const getAllOrdersItems = async () => {
    try {
      const response = await instance.get('expense/itemsOrders');
      const data = response.data.data;
      return data;
    } catch (error) {
      console.error("Response erorr expenses:", error);
      
    }
}

export const getAllExpenses = async () => {
  try {
    const expenseResponse = await instance.get("expense");
    return expenseResponse;
  } catch (error) {
    console.error("Terjadi kesalahan dalam mengambil data expense:", error);
  }
}

export const getAllRevenue = async () => {
  try {
    const ordersResponse = await instance.get("orders");
    const data = ordersResponse.data.data;
    return data;
  } catch (error) {
    console.log("Error Revenue", error);
  }
}