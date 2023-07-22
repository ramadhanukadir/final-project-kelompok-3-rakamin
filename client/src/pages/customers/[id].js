import React, { useState, useEffect, useContext } from 'react';
import { getCustomersById } from '@/api/customers';
import { getAllOrders, getOrderById } from '@/api/orders';
import { instance } from '@/modules/axios';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Stack,
  VStack,
  Heading,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Page({ customersId }) {
  const router = useRouter();
  const [customers, setCustomers] = useState({});
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await getCustomersById(customersId);
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await getAllOrders();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  const filteredOrders = order.filter(
    (order) => order.customer === customers.full_name
  );

  return (
    <Flex
      w={'100%'}
      marginTop={'5em'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      zIndex={1}
    >
      <HStack display={'flex'} justifyContent={'space-between'} mb={6}>
        <Button size={'sm'} w={'3'} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Detail Customer
        </Text>
      </HStack>
      <Flex direction={'column'} mt={2}>
        <Flex direction={'row'} columnGap={'10px'}>
          <Flex direction={'column'}>
            <Text fontSize={'lg'} fontWeight={'normal'}>
              Name
            </Text>
            <Text fontSize={'lg'} fontWeight={'normal'}>
              Address
            </Text>
            <Text fontSize={'lg'} fontWeight={'normal'}>
              Total Order
            </Text>
          </Flex>
          <Flex direction={'column'}>
            <Text fontSize={'lg'} fontWeight={'normal'}>
              {`: ${customers.full_name}`}
            </Text>
            <Text fontSize={'lg'} fontWeight={'normal'}>
              {`: ${customers.address}`}
            </Text>
            <Text fontSize={'lg'} fontWeight={'normal'}>
              {`: ${filteredOrders.length}`}
            </Text>
          </Flex>
        </Flex>
        <VStack mt={6}>
          <Text fontSize='lg' fontWeight='bold'>
            History Order
          </Text>
          <Flex
            alignSelf={'flex-start'}
            w={'100%'}
            py={{ base: 2, md: 4 }}
            px={{ base: 4, md: 8 }}
            border={'1px'}
            borderColor={'gray.300'}
            borderRadius={'lg'}
          >
            <HStack w={'100%'}>
              <HStack
                display={'flex'}
                justifyContent={'space-between'}
                w={'100%'}
              >
                <Flex flexDirection={'row'} gap={4}>
                  <Box>
                    <Grid templateColumns='repeat(4, 1fr)' gap={4} w={'100%'}>
                      {filteredOrders?.map((item) => (
                        <Box
                          role={'group'}
                          p={6}
                          maxW={'330px'}
                          w={'full'}
                          bg={useColorModeValue('white', 'gray.900')}
                          boxShadow={'2xl'}
                          rounded={'lg'}
                          pos={'relative'}
                          zIndex={1}
                          key={item.id}
                        >
                          <Stack
                            pt={10}
                            justifyContent={'center'}
                            align={'center'}
                          >
                            <Heading
                              color={'black'}
                              fontSize={'md'}
                              fontWeight={'bold'}
                              textTransform={'uppercase'}
                            >
                              {item.customer}
                            </Heading>
                            <Text
                              color={'black'}
                              fontSize={'sm'}
                              textTransform={'uppercase'}
                            >
                              {item.date}
                            </Text>
                            <Text fontSize={'sm'} fontFamily={'normal'}>
                              {item.warehouse}
                            </Text>
                            <Text fontSize={'sm'}>
                              {item.totalRevenue?.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </Text>
                          </Stack>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </Flex>
              </HStack>
            </HStack>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { customersId: id } };
}

function Card({ id, userId, name, address }) {
  return (
    <VStack>
      <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
        {id}
      </Text>
      <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
        {userId}
      </Text>
      <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
        {name}
      </Text>
      <Text fontSize={'sm'}>{address}</Text>
    </VStack>
  );
}
