import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Link,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { DataContext } from '@/context/AllDataContext';
import OrderForm from '@/component/OrderForm/OrderForm';

const index = () => {
  const { orders } = useContext(DataContext);

  return (
    <Container>
      <Box p={14} ml={10}>
        <OrderForm />
      </Box>
      <TableContainer>
        <Table variant='simple'>
          <Thead bg={'#DFF6FE'}>
            <Tr>
              <Th>Warehouse</Th>
              <Th>Customer</Th>
              <Th>Total Revenue</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr
                key={order.id}
                w={'full'}
                cursor={'pointer'}
                onClick={() => router.push(`/purchase/${order.id}`)}
                _hover={{ bg: 'gray.100' }}
              >
                <Td>{order.warehouse}</Td>
                <Td>{order.customer}</Td>
                <Td>
                  {order.totalRevenue.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default index;
