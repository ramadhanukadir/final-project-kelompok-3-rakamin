import { getAllOrders, getOrderById } from '@/api/fetch/orders';
import { DataContext } from '@/context/AllDataContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Page({ orderId }) {
  const router = useRouter();
  // const { id } = router.query;
  const [order, setOrder] = useState({});
  const { orderDetail, setOrderDetail } = useContext(DataContext);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(orderId);
      setOrder(data);
    };
    fetchOrder();
  }, []);

  console.log(order);
  return (
    <>
      <p style={{ marginLeft: '550px' }}>Cutomer: {order.customer}</p>
      <p style={{ marginLeft: '550px' }}>Warehouse: {order.warehouse}</p>
      {/* <p style={{ marginLeft: '550px' }}>
        Total Revenue:{' '}
        {order.totalRevenue.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
        })}
      </p> */}
      <button onClick={() => router.back()}>Back</button>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return { props: { orderId: id } };
};
// export const getStaticPaths = async () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data } = await getOrderById(id);

//   const paths = data.map((order) => ({
//     params: { id: order.id.toString() },
//   }));
//   return {
//     paths: paths,
//     fallback: 'true',
//   };
// };

// export const getStaticProps = async (context) => {
//   try {
//     const { id } = context.params;
//     const { data } = await getOrderById(id);
//     return {
//       props: {
//         order: data,
//       },
//       revalidate: 10,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export async function getStaticProps() {
//   return {
//     props: {
//       name: 'John Doe',
//     },
//   };
// }
