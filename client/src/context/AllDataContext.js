import { createContext, useEffect, useState } from "react";
import {
  getAllCustomer,
  getAllItems,
  getAllOrders,
  getAllWarehouses,
  getWarehousesById,
} from "@/api/fetch/orders";
import { fetchUser } from "@/api/fetch/auth";

const AllDataContext = createContext();

const AllDataContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [warehouseId, setWarehouseId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [itemsId, setItemsId] = useState(0);
  const [userLogin, setUserLogin] = useState({});

  let access = "";

  if (typeof window !== "undefined") {
    access = sessionStorage.getItem("token");
  }

  const fetchUserLogin = async () => {
    const data = await fetchUser();
    setUserLogin(data);
  };

  const fetchWarehouse = async () => {
    const data = await getAllWarehouses();
    setWarehouses(data);
  };

  const fetchItems = async () => {
    const { data } = await getAllItems(1, "ASC", "name");
    setProducts(data);
  };

  const fetchCustomers = async () => {
    const { data } = await getAllCustomer();
    setCustomers(data);
  };

  const fetchWarehouseById = async (warehouseId) => {
    const data = await getWarehousesById(warehouseId);
    setWarehouseItems(data.stockItems);
  };

  const fetchOrders = async () => {
    const { data } = await getAllOrders();
    setOrders(data);
  };

  useEffect(() => {
    if (access !== null) {
      fetchCustomers(),
        fetchItems(),
        fetchWarehouse(),
        fetchOrders(),
        fetchUserLogin();
    }

    if (warehouseId > 0) {
      fetchWarehouseById(warehouseId);
    }
  }, [access, warehouseId, itemsId]);

  return (
    <AllDataContext.Provider
      value={{
        isLogin,
        setIsLogin,
        warehouses,
        setWarehouses,
        warehouseId,
        setWarehouseId,
        warehouseItems,
        setWarehouseItems,
        products,
        setProducts,
        categories,
        setCategories,
        customers,
        setCustomers,
        orders,
        setOrders,
        fetchOrders,
        itemsId,
        setItemsId,
        userLogin,
        setUserLogin,
        fetchUserLogin,
        access,
      }}>
      {children}
    </AllDataContext.Provider>
  );
};

export const DataContext = AllDataContext;
export default AllDataContextProvider;
