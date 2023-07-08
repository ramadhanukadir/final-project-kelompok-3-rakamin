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
  return (
    <p style={{ marginLeft: '550px' }}>
      Post: {order.customer}
      <button onClick={() => router.back()}>Back</button>
    </p>
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
