// import { createContext, useEffect, useState } from 'react';
// import { getAllCustomer, getAllItems } from '@/api/fetch/orders';

// const AllDataContext = createContext();

// const AllDataContextProvider = ({ children }) => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [warehouses, setWarehouses] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);

//   const fetchCustomers = async () => {
//     const { data } = await getAllCustomer();
//     setCustomers(data);
//   };

//   const fetchItems = async () => {
//     const { data } = await getAllItems(1, 'ASC', 'name');
//     setProducts(data);
//   };

//   // console.log(customers, '<<<<<<');
//   useEffect(() => {
//     isLogin && fetchCustomers(), fetchItems();
//   }, [isLogin]);

//   return (
//     <AllDataContext.Provider
//       value={{
//         isLogin,
//         setIsLogin,
//         warehouses,
//         setWarehouses,
//         products,
//         setProducts,
//         categories,
//         setCategories,
//         customers,
//         setCustomers,
//       }}
//     >
//       {children}
//     </AllDataContext.Provider>
//   );
// };

// export const DataContext = AllDataContext;
// export default AllDataContextProvider;
