import { getWarehouseById } from '@/api/fetch/warehouses';
import { DataContext } from '@/context/AllDataContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Page({ warehouseId }) {
  const router = useRouter();
  const { detailWarehouse, setDetailWarehouse } = useContext(DataContext);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const data = await getWarehouseById(warehouseId);
      setDetailWarehouse(data);
    };
    fetchWarehouse();
  }, []);

  console.log(detailWarehouse);

  return (
    <Flex w={'100%'} marginTop={20} flexDirection={'column'} justifyContent={'flex-start'} zIndex={1}>
      <HStack>
        <Button size={'sm'} w={'3'} onClick={() => router.back()} title="Back">
          <ArrowBackIcon w={4} h={4} />
        </Button>
      </HStack>
      <Flex direction={'column'} mt={4}>
        <Text fontSize="xl" fontWeight="bold">
          Warehouse Detail
        </Text>
        {/* <Flex direction={'row'} columnGap={'20px'}>
          <Flex direction={'column'}>
            <Text>Cutomer </Text>
            <Text>Warehouse </Text>
            <Text>Total Revenue </Text>
            <Text>Date </Text>
          </Flex>
          <Flex direction={'column'}>
            <Text>: {detailWarehouse.name}</Text>
            <Text>: {detailWarehouse.address}</Text>
            <Text>: {detailWarehouse.date}</Text>
          </Flex>
        </Flex> */}
        {/* <VStack mt={6}>
          <Text fontSize="md" fontWeight="bold">
            Detail Product
          </Text>
          <Flex alignSelf={'flex-start'} w={'100%'}>
            <Flex flexDirection={'column'} w={'100%'} gap={3}>
              {detailWarehouse?.items?.map((item) => (
                <HStack display={'flex'} justifyContent={'space-between'} w={'100%'} key={item.id} py={{ base: 2, md: 3 }} px={{ base: 4, md: 6 }} border={'1px'} borderColor={'gray.300'} borderRadius={'lg'}>
                  <Flex flexDirection={'row'} gap={4}>
                    <Image
                      src={item.image}
                      aspectRatio={'1/1'}
                      w={12}
                      h={12}
                      objectFit={'contain'}
                      borderRadius={'xl'}
                      // bg={'black'}
                    />
                    <Box>
                      <Text fontSize={'sm'} fontWeight={'semibold'}>
                        {item.name}
                      </Text>
                      <HStack>
                        <Text fontSize={'sm'} fontWeight={'light'}>
                          {item.quantity}
                        </Text>
                        <Text fontSize={'sm'} fontWeight={'light'}>
                          x
                        </Text>
                        <Text fontSize={'sm'} fontWeight={'light'}>
                          {item.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })}
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                  <Flex flexDirection={'column'} w={'13%'} alignItems={'flex-start'} pl={3}>
                    <Text fontSize={'xs'} fontWeight={'normal'}>
                      Total Price
                    </Text>
                    <Text fontSize={'sm'} fontWeight={'bold'}>
                      {item.totalPrice.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </Text>
                  </Flex>
                </HStack>
              ))}
            </Flex>
          </Flex>
        </VStack> */}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return { props: { warehouseId: id } };
};
