import React, { useState, useEffect, useContext } from 'react';
import { getCategoriesId, getAllCategories } from '@/modules/fetch';
import { useRouter } from 'next/router';
import { DataContext } from '@/context/AllDataContext';
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Image,
  Button,
  Flex,
  HStack,
  VStack,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Page({ categoryId }) {
  const [category, setCategory] = useState({});
  const router = useRouter();
  const tableSize = useBreakpointValue({ base: 'lg', lg: 'lg', sm: 'sm' });

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoriesId(categoryId);
      setCategory(data);
    };
    fetchCategory();
  }, []);

  return (
    <Flex
      w={'100%'}
      marginTop={'5em'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      zIndex={1}
    >
      <HStack display={'flex'} justifyContent={'space-between'}>
        <Button size={'sm'} w={'3'} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Detail Category
        </Text>
      </HStack>
      <Flex direction={'row'} columnGap={'15px'} mt={6}>
        <Flex direction={'column'}>
          <Text fontSize={'lg'} fontWeight={'normal'}>
            Name
          </Text>
          <Text fontSize={'lg'} fontWeight={'normal'}>
            Description
          </Text>
          <Text fontSize={'lg'} fontWeight={'normal'}>
            Total Product
          </Text>
        </Flex>
        <Flex direction={'column'}>
          <Text fontSize={'lg'} fontWeight={'normal'}>
            {`: ${category?.name}`}
          </Text>
          <Text fontSize={'lg'} fontWeight={'normal'}>
            {`: ${category?.description}`}
          </Text>
          <Text fontSize={'lg'} fontWeight={'normal'}>
            {`: ${category?.items?.length}`}
          </Text>
        </Flex>
      </Flex>
      <Flex direction={'column'}>
        <Flex direction={'column'} columnGap={'20px'}>
          <Flex direction={'column'}></Flex>
          <VStack mt={6}>
            <Text fontSize='md' fontWeight='bold'>
              List Product
            </Text>
            <TableContainer overflowY={'auto'} h={'25em'} px={5} w={'100%'}>
              <Table size={tableSize} variant='simple'>
                <Thead bg={'#06283D'}>
                  <Tr>
                    <Th color={'#EEEDED'}>Name</Th>
                    <Th color={'#EEEDED'}>SKU</Th>
                    <Th color={'#EEEDED'}>Base Price</Th>
                    <Th color={'#EEEDED'}>Selling Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {category?.items?.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.SKU}</Td>
                      <Td>
                        {item.basePrice?.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </Td>
                      <Td>
                        {item.sellingPrice?.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { categoryId: id } };
}
