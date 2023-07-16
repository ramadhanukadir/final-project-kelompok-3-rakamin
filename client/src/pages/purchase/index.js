import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Flex, VStack } from '@chakra-ui/react';
import { DataContext } from '@/context/AllDataContext';
import OrderForm from '@/component/OrderForm/OrderForm';
import { useRouter } from 'next/router';
import OrderList from '@/component/OrderList/OrderList';
import { ArrowBackIcon } from '@chakra-ui/icons';

const index = () => {
  const { orders } = useContext(DataContext);

  return (
    <VStack pt={20} zIndex={1}>
      <Flex
        w={'100%'}
        justifyContent={'space-between'}
        alignSelf={'flex-end'}
        zIndex={1}
      >
        <Button size={'sm'} zIndex={1}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
        <OrderForm />
      </Flex>
      <Box w={'100%'} mt={8}>
        <OrderList orders={orders} />
      </Box>
    </VStack>
  );
};

export default index;
