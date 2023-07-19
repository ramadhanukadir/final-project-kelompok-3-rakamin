import { createContext, useEffect, useState } from 'react';
import { getAllCustomer, getAllItems, getAllOrders, getAllWarehouses, getWarehousesById } from '@/api/fetch/orders';
import { fetchUser } from '@/api/fetch/auth';
import { getAllExpenses, getAllOrdersItems, getAllRevenue } from '@/api/fetch/chart';
import { getAllCategories } from '@/api/fetch/category';
import { getAllWarehousesStock } from '@/api/fetch/warehouses';

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
  const [detailOrder, setDetailOrder] = useState({});
  const [itemsId, setItemsId] = useState(0);
  const [userLogin, setUserLogin] = useState({});
  const [warehouseStock, setWarehouseStock] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeItem, setActiveItem] = useState('dashboard');

  let access = '';

  if (typeof window !== 'undefined') {
    access = sessionStorage.getItem('token');
  }

  const fetchUserLogin = async () => {
    const data = await fetchUser();
    setUserLogin(data);
  };

  const fetchWarehouse = async () => {
    const data = await getAllWarehouses(1, 'ASC', 'name');
    setWarehouses(data);
  };

  const fetchItems = async () => {
    const { data } = await getAllItems(1, 'ASC', 'name');
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
    const revenueSum = data.reduce((sum, revenue) => sum + revenue.totalRevenue, 0);
    setTotalRevenue(revenueSum);
  };

  useEffect(() => {
    if (access !== null) {
      fetchCustomers(), fetchItems(), fetchWarehouse(), fetchOrders(), fetchUserLogin(), fetchCategories(), fetchWarehousesStock();
      fetchOrderItems();
      fetchExpenses();
      fetchRevenue();
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
        warehouseId,
        setWarehouseId,
        warehouseItems,
        warehouseStock,
        products,
        categories,
        customers,
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
      }}
    >
      {children}
    </AllDataContext.Provider>
  );
};

export const DataContext = AllDataContext;
export default AllDataContextProvider;
