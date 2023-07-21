import { createContext, useEffect, useState } from "react";
import { getAllOrders } from "@/api/orders";
import { getAllItems } from "@/api/product";
import { getAllCustomer } from "@/api/customers";
import {
  getAllWarehouses,
  getAllWarehousesStock,
  getWarehousesById,
} from "@/api/warehouses";
import { fetchUser } from "@/api/auth";
import { getAllExpenses, getAllOrdersItems, getAllRevenue } from "@/api/chart";
import { getAllCategories } from "@/api/category";
import { getAllSuppliers } from "@/api/suppliers";

const AllDataContext = createContext();

const AllDataContextProvider = ({ children }) => {
  const [warehouseId, setWarehouseId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState({});
  const [allCustomers, setAllCustomers] = useState({});
  const [suppliers, setSuppliers] = useState({});
  const [allSuppliers, setAllSuppliers] = useState({});
  const [orders, setOrders] = useState([]);
  const [detailOrder, setDetailOrder] = useState({});
  const [itemsId, setItemsId] = useState(0);
  const [userLogin, setUserLogin] = useState({});
  const [warehouseStock, setWarehouseStock] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [filterOrder, setFilterOrder] = useState({
    warehouses_id: "",
    customers_id: "",
    page: 1,
    limit: 5,
    sort: "",
    order: "",
  });
  const [filterProducts, setFilterProducts] = useState({
    q: "",
    page: 1,
    limit: 5,
    sort: "",
    order: "",
  });
  const [filterCustomer, setFilterCustomer] = useState({
    page: 1,
    limit: 5,
    sort: "",
    order: "",
  });
  const [filterSupplier, setFilterSupplier] = useState({
    page: 1,
    limit: 5,
    sort: "",
    order: "",
  });

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
    const data = await getAllItems(filterProducts);
    setProducts(data);
  };
  const fetchAllItems = async () => {
    const data = await getAllItems();
    setAllProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await getAllCategories();
    setCategories(data);
  };

  const fetchCustomers = async () => {
    const data = await getAllCustomer(filterCustomer);
    setCustomers(data);
  };

  const fetchAllCustomers = async () => {
    const data = await getAllCustomer();
    setAllCustomers(data);
  };

  const fetchSuppliers = async () => {
    const data = await getAllSuppliers(filterSupplier);
    setSuppliers(data);
  };
  const fetchAllSuppliers = async () => {
    const data = await getAllSuppliers();
    setAllSuppliers(data);
  };

  const fetchWarehouseById = async (warehouseId) => {
    const { stockItems } = await getWarehousesById(warehouseId);
    setWarehouseItems(stockItems);
  };

  const fetchOrders = async () => {
    const data = await getAllOrders(filterOrder);
    setOrders(data);
  };

  const fetchWarehousesStock = async () => {
    const data = await getAllWarehousesStock();
    setWarehouseStock(data);
  };

  const fetchOrderItems = async () => {
    const data = await getAllOrdersItems();
    setOrderData(data);
  };

  const fetchExpenses = async () => {
    const data = await getAllExpenses();
    setTotalExpenses(data.data.totalExpenses);
  };

  const fetchRevenue = async () => {
    const data = await getAllRevenue();
    const revenueSum = data.reduce(
      (sum, revenue) => sum + revenue.totalRevenue,
      0
    );
    setTotalRevenue(revenueSum);
  };

  useEffect(() => {
    if (access !== null) {
      fetchCustomers();
      fetchAllCustomers();
      fetchItems();
      fetchWarehouse();
      fetchSuppliers();
      fetchOrders();
      fetchUserLogin();
      fetchCategories();
      fetchWarehousesStock();
      fetchOrderItems();
      fetchExpenses();
      fetchRevenue();
      fetchSuppliers();
      fetchAllSuppliers();
      fetchAllItems();
    }

    if (warehouseId > 0) {
      fetchWarehouseById(warehouseId);
    }
  }, [
    access,
    warehouseId,
    itemsId,
    filterOrder,
    filterProducts,
    filterCustomer,
  ]);

  return (
    <AllDataContext.Provider
      value={{
        warehouses,
        warehouseId,
        setWarehouseId,
        warehouseItems,
        warehouseStock,
        fetchWarehousesStock,
        products,
        categories,
        customers,
        allCustomers,
        fetchCustomers,
        suppliers,
        allSuppliers,
        orders,
        detailOrder,
        setDetailOrder,
        fetchOrders,
        itemsId,
        setItemsId,
        userLogin,
        access,
        orderData,
        totalExpenses,
        totalRevenue,
        activeItem,
        setActiveItem,
        fetchUserLogin,
        fetchItems,
        filterOrder,
        setFilterOrder,
        filterProducts,
        setFilterProducts,
        filterCustomer,
        setFilterCustomer,
        filterSupplier,
        setFilterSupplier,
        fetchAllSuppliers,
        allProducts,
        fetchAllItems,
        fetchCategories,
      }}>
      {children}
    </AllDataContext.Provider>
  );
};

export const DataContext = AllDataContext;
export default AllDataContextProvider;
