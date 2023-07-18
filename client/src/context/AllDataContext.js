import { createContext, useEffect, useState } from "react";
import {
  getAllCustomer,
  getAllSuppliers,
  getAllItems,
  getAllOrders,
  getAllWarehouses,
  getWarehousesById,
} from "@/api/fetch/orders";
import { fetchUser } from "@/api/fetch/auth";
//import { getAllCategories, getAllWarehousesStock } from "@/api/fetch";
import { getAllCategories } from "@/api/fetch/category";
import { getAllWarehousesStock } from "@/api/fetch/warehouses";
const AllDataContext = createContext();

const AllDataContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [warehouseId, setWarehouseId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [detailOrder, setDetailOrder] = useState({});
  const [itemsId, setItemsId] = useState(0);
  const [userLogin, setUserLogin] = useState({});
  const [warehouseStock, setWarehouseStock] = useState([]);

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

  const fetchCategories = async () => {
    const { data } = await getAllCategories();
    setCategories(data);
  };

  const fetchCustomers = async () => {
    const { data } = await getAllCustomer();
    setCustomers(data);
  };

  const fetchSuppliers = async () => {
    const { data } = await getAllSuppliers();
    setSuppliers(data);
  };

  const fetchWarehouseById = async (warehouseId) => {
    const { stockItems } = await getWarehousesById(warehouseId);
    setWarehouseItems(stockItems);
  };

  const fetchOrders = async () => {
    const { data } = await getAllOrders();
    setOrders(data);
  };

  const fetchWarehousesStock = async () => {
    const data = await getAllWarehousesStock();
    setWarehouseStock(data);
  };

  useEffect(() => {
    if (access !== null) {
      fetchCustomers(),
        fetchSuppliers(),
        fetchItems(),
        fetchWarehouse(),
        fetchOrders(),
        fetchUserLogin(),
        fetchCategories(),
        fetchWarehousesStock();
    }

    if (warehouseId > 0) {
      fetchWarehouseById(warehouseId);
    }
  }, [warehouseId, itemsId]);

  return (
    <AllDataContext.Provider
      value={{
        isLogin,
        setIsLogin,
        warehouses,
        warehouseId,
        setWarehouseId,
        warehouseItems,
        warehouseStock,
        products,
        categories,
        customers,
        suppliers,
        orders,
        detailOrder,
        setDetailOrder,
        fetchOrders,
        itemsId,
        setItemsId,
        userLogin,
        access,
      }}>
      {children}
    </AllDataContext.Provider>
  );
};

export const DataContext = AllDataContext;
export default AllDataContextProvider;
