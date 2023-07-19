import React, { useState, useEffect } from 'react';
import { instance } from '@/modules/axios';
import ReactPaginate from 'react-paginate';

import {
  Button,
  Text,
  Box,
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Select,
  useToast,
  FormErrorMessage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  useDisclosure,
  Icon,
  IconButton,
} from '@chakra-ui/react';

import { SearchIcon, FiDelete, ViewIcon, FiEdit } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getWarehouses();
  }, [page, keyword]);

  const getWarehouses = async () => {
    const response = await instance.get(`/warehouses/with-filter?search_query=${keyword}&page=${page}&limit=${limit}`);

    setWarehouses(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg('Jika tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci specific');
    } else {
      setMsg('');
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <Box width="100%">
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} py={'10'} mt={10}>
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Warehouses
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={'5'}>
          <Button size="sm" bgColor={''} leftIcon={<FiPlus />} onClick={''}>
            Add Warehouse
          </Button>
        </Box>
      </Box>

      <Box>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={'row'} justifyContent={'start'} alignItems={'center'} gap={'10'} my={'5'}></Box>
          <Box display={'flex'} justifyContent={'end'} mb={2}>
            <form onSubmit={searchData}>
              <InputGroup>
                <Input placeholder="Nama Gudang.." value={query} onChange={(e) => setQuery(e.target.value)} px={'8'} />
                <InputRightElement width="auto">
                  <Button type="submit" colorScheme="blue" leftIcon={<SearchIcon />}>
                    Cari
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={'#DFF6FE'}>
                <Tr>
                  <Th>Warehouse Name</Th>
                  <Th>Address</Th>
                  <Th>Province</Th>
                  <Th>City</Th>
                  <Th>Postal Code</Th>
                  <Th>Telephone</Th>
                  <Th>
                    <Center>Actions</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {warehouses.map((warehouse) => (
                  <Tr key={warehouse.id}>
                    <Td>{warehouse.name}</Td>
                    <Td>{warehouse.address}</Td>
                    <Td>{warehouse.province}</Td>
                    <Td>{warehouse.city}</Td>
                    <Td>{warehouse.postal_code}</Td>
                    <Td>{warehouse.telephone}</Td>
                    <Td></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <p>
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
          </p>
          <p className="text-danger">{msg}</p>
          <nav className="pagination is-centered" key={rows} role="navigation" aria-label="pagination">
            <ReactPaginate
              previousLabel={'< Prev'}
              nextLabel={'Next >'}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName="pagination-list"
              pageLinkClassName="pagination-link"
              previousLinkClassName={'pagination-previous'}
              nextLinkClassName="pagination-next"
              activeLinkClassName="pagination-link is-current"
              disabledLinkClassName="pagination-link is-disabled"
            />
          </nav>
        </Box>
      </Box>
    </Box>
  );
};

export default Warehouses;
