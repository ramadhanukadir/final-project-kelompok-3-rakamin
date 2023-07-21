import React, { useContext, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import MyChart from '@/component/dataComponent/chart/LineChart';
import ExpensesChart from '@/component/dataComponent/chart/expenses';
import AllDataDashboard from '@/component/dataComponent/chart/AllData';
import { DataContext } from '@/context/AllDataContext';

export default function Dashboard() {
  const [display, changeDisplay] = useState('hide');
  const { userLogin } = useContext(DataContext);

  const { orderData } = useContext(DataContext);

  return (
    <Flex flexDir="column" w="100%" marginTop={55}>
      <Heading fontWeight="normal" my={4} letterSpacing="tight" textAlign={'center'}>
        Welcome back,{' '}
        <Flex display="inline-flex" fontWeight="bold">
          {userLogin.first_name}
        </Flex>
      </Heading>
      <AllDataDashboard />

      <Flex justifyContent={'center'} flexDir={['row', 'row', 'row']} overflow="hidden" w={'100%'} columnGap={4}>
        <Flex p="3%" flexDir="column" overflow="auto">
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Revenue History
          </Heading>
          <MyChart />
        </Flex>
        <Flex p="2%" flexDir="column" minW={[null, null, '100px', '100px', '100px']}>
          <ExpensesChart />
        </Flex>
      </Flex>
    </Flex>
  );
}
