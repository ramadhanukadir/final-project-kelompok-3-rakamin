import { createContext, useEffect, useState } from 'react';
import {
  getAllCustomer,
  getAllItems,
  getAllWarehouses,
  getWarehousesById,
} from '@/api/fetch/orders';

const AllDataContext = createContext();
// const token = sessionStorage.getItem('token');
// console.log(token);

const AllDataContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [warehouseId, setWarehouseId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const { data } = await getAllCustomer();
    setCustomers(data);
  };

  const fetchItems = async () => {
    const { data } = await getAllItems(1, 'ASC', 'name');
    setProducts(data);
  };

  const fetchWarehouse = async () => {
    const data = await getAllWarehouses();
    setWarehouses(data);
  };

  const fetchWarehouseById = async (warehouseId) => {
    const data = await getWarehousesById(warehouseId);
    setWarehouseItems(data.stockItems);
  };

  useEffect(() => {
    if (isLogin) {
      fetchCustomers(), fetchItems(), fetchWarehouse();
    }

    if (warehouseId > 0) {
      fetchWarehouseById(warehouseId);
    }
  }, [isLogin, warehouseId]);

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
      }}
    >
      {children}
    </AllDataContext.Provider>
  );
};

export const DataContext = AllDataContext;
export default AllDataContextProvider;
