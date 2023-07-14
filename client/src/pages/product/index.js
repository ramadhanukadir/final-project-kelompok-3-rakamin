import React from 'react';
import Product from '@/component/dataComponent/Product';
import { Box } from '@chakra-ui/react';

const index = () => {
  return (
    <Box maxW='7xl' mx={'auto'} px={{ base: 2, sm: 12, md: 17 }} mt={16}>
      <Product />
    </Box>
  );
};

export default index;
