import { getWarehouseById } from '@/api/fetch/warehouses';
import { DataContext } from '@/context/AllDataContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Page({ warehouseId }) {
  const router = useRouter();
  const { detailWarehouse, setDetailWarehouse, categories } =
    useContext(DataContext);
  const [sortedStockItems, setSortedStockItems] = useState([]);

  const categoriesName = (id) => {
    const categoryName = categories.find((item) => item.id === id);
    return categoryName?.name;
  };

  useEffect(() => {
    if (detailWarehouse?.stockItems) {
      const sortedItems = [...detailWarehouse.stockItems].sort(
        (a, b) => a.stock - b.stock
      );
      setSortedStockItems(sortedItems);
    }
  }, [detailWarehouse?.stockItems]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const data = await getWarehouseById(warehouseId);
      setDetailWarehouse(data);
    };
    fetchWarehouse();
  }, []);

  return (
    <Flex
      w={'100%'}
      marginTop={20}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      zIndex={1}
    >
      <HStack display={'flex'} justifyContent={'space-between'}>
        <Button size={'sm'} w={'3'} onClick={() => router.back()} title='Back'>
          <ArrowBackIcon w={4} h={4} />
        </Button>
        <Text fontSize='xl' fontWeight='bold'>
          Warehouse Detail
        </Text>
      </HStack>
      <Flex direction={'column'} mt={4}>
        <Flex direction={'row'} columnGap={'20px'}>
          <Flex direction={'column'}>
            <Text>Warehouse Name </Text>
            <Text>Address </Text>
            <Text>Province </Text>
            <Text>City </Text>
            <Text>Postal Code </Text>
            <Text>Telephone </Text>
          </Flex>
          <Flex direction={'column'}>
            <Text>: {detailWarehouse?.warehouse?.name}</Text>
            <Text>: {detailWarehouse?.warehouse?.address}</Text>
            <Text>: {detailWarehouse?.warehouse?.province}</Text>
            <Text>: {detailWarehouse?.warehouse?.city}</Text>
            <Text>: {detailWarehouse?.warehouse?.postalCode}</Text>
            <Text>: {detailWarehouse?.warehouse?.telephone}</Text>
          </Flex>
        </Flex>
        <VStack mt={6}>
          <Text fontSize='md' fontWeight='bold'>
            Detail Product
          </Text>
          <Flex alignSelf={'flex-start'} w={'100%'}>
            <Flex flexDirection={'column'} w={'100%'} gap={3}>
              {sortedStockItems?.map((item) => (
                <HStack
                  display={'flex'}
                  justifyContent={'space-between'}
                  w={'100%'}
                  key={item.id}
                  py={{ base: 2, md: 3 }}
                  px={{ base: 4, md: 6 }}
                  border={'1px'}
                  borderColor={'gray.300'}
                  borderRadius={'lg'}
                >
                  <Flex flexDirection={'row'} gap={4}>
                    <Image
                      src={item.items.imageUrl}
                      aspectRatio={'1/1'}
                      w={12}
                      h={12}
                      mr={7}
                      objectFit={'contain'}
                      borderRadius={'xl'}
                    />
                    <Box>
                      <Text fontSize={'lg'} fontWeight={'semibold'}>
                        {item.items.name} -{' '}
                        {categoriesName(item.items.categoriesId)}
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'semibold'}></Text>

                      <HStack>
                        <Text fontSize={'sm'} fontWeight={'light'}>
                          {item.items.SKU}
                        </Text>
                      </HStack>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Size: {item.items.size}
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        Weight: {item.items.weight}
                      </Text>
                      <Text fontSize={'sm'} fontWeight={'light'}>
                        {item.items.description}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex
                    flexDirection={'column'}
                    w={'13%'}
                    alignItems={'flex-start'}
                    pl={3}
                  >
                    <Text fontSize={'sm'} fontWeight={'bold'}>
                      Stock
                    </Text>
                    <Text
                      fontSize={'lg'}
                      fontWeight={'bold'}
                      style={{
                        color:
                          item.stock === 0
                            ? 'red'
                            : item.stock > 0 && item.stock < 10
                            ? 'orange'
                            : 'green',
                      }}
                    >
                      {item.stock}
                    </Text>
                  </Flex>
                </HStack>
              ))}
            </Flex>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return { props: { warehouseId: id } };
};
