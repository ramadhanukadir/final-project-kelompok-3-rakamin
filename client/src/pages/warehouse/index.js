import React from 'react';
import Warehouse from '@/component/dataComponent/Warehouse';
import { Box } from '@chakra-ui/react';

const index = () => {
  return (
    <Box maxW="7xl" mx={'auto'} px={{ base: 2, sm: 12, md: 17 }}>
      <Warehouse />
    </Box>
  );
};

export default index;
