import React, { useState, useEffect, useContext } from 'react';
import { instance } from '@/modules/axios';
import axios from 'axios';

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  Select,
  FormErrorMessage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure,
  Icon,
  IconButton,
  Flex,
  TableCaption,
  Skeleton,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';
import { FiPlus, FiDelete, FiEdit, FiEye } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Filter from '../Filter';
import { DataContext } from '@/context/AllDataContext';

const Warehouses = () => {
  const router = useRouter();

  const { isLoading } = useContext(DataContext);
  const [warehouses, setWarehouses] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({});
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');

  const [filterWarehouses, setFilterWarehouses] = useState({
    search_query: '',
    page: 1,
    limit: 5,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = useState(null);

  const [editWarehouseData, setEditWarehouseData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

  // Edit Warehouse
  const handleEditWarehouse = (warehouse) => {
    setEditWarehouseData(warehouse);
    openEditModal();
  };

  console.log(editWarehouseData);

  const onSubmitEdit = async (data) => {
    try {
      if (!editWarehouseData) {
        console.log('Gudang belum dipilih untuk diedit.');
        return;
      }

      // Panggil API untuk memperbarui data gudang
      await instance.put(`/warehouses/${editWarehouseData.id}`, data);

      // Setelah berhasil memperbarui data gudang, tutup modal edit
      closeEditModal();

      // Ambil daftar gudang yang diperbarui lagi dari server
      getWarehouses();
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = () => {
    reset();
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    reset();
    setIsEditModalOpen(false);
  };

  // Pagination & Get Warehouses
  useEffect(() => {
    getWarehouses();
  }, [page, keyword, filterWarehouses]);

  const getWarehouses = async () => {
    const response = await instance.get(
      `/warehouses/with-filter?search_query=${filterWarehouses.search_query}&page=${filterWarehouses.page}&limit=${filterWarehouses.limit}`
    );

    setWarehouses(response.data.result);
    setPage(response.data.page);
    setPages(response.data);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg('cari data dengan kata kunci spesifik');
    } else {
      setMsg('');
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  // Modal
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const openModal = () => {
    reset();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          'https://api.goapi.id/v1/regional/provinsi?api_key=xPYHpbKxZjKwZTMsBURTp8zDNnZtYB'
        );
        setProvinces(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchCitiesByProvince = async (selectedProvince) => {
    try {
      const response = await axios.get(
        `https://api.goapi.id/v1/regional/kota?api_key=xPYHpbKxZjKwZTMsBURTp8zDNnZtYB&provinsi_id=${selectedProvince}`
      );
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Save Modal
  const onSubmit = async (data) => {
    try {
      // Validasi input
      if (
        !data.name ||
        !data.address ||
        !data.province ||
        !data.city ||
        !data.telephone
      ) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validasi format nomor handphone
      const phoneRegex = /^[0-9]{10,12}$/;
      if (!phoneRegex.test(data.telephone)) {
        toast({
          title: 'Error',
          description: 'Please enter a valid phone number.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Kirim data gudang ke backend
      await instance.post('/warehouses', data);

      // Dapatkan data gudang terbaru dari backend
      getWarehouses();

      // Tampilkan popup info bahwa data telah disimpan
      setIsSavePopupOpen(true);

      // Set timeout untuk menutup popup setelah beberapa detik
      setTimeout(() => {
        setIsSavePopupOpen(false);
      }, 3000);

      // Reset form dan tutup modal
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Warehouse
  const handleDeleteWarehouse = (warehouseId) => {
    setDeleteWarehouseId(warehouseId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteWarehouse = async () => {
    try {
      // Kirim permintaan hapus data gudang ke backend menggunakan axios atau metode lainnya
      await instance.delete(`/warehouses/${deleteWarehouseId}`);

      // Dapatkan data gudang terbaru dari backend
      getWarehouses();

      // Tampilkan popup info bahwa data telah dihapus
      setIsDeleteConfirmationOpen(false);
      // setIsSavePopupOpen(true);
      setIsDeletePopupOpen(true);

      // Set timeout untuk menutup popup setelah beberapa detik
      setTimeout(() => {
        setIsDeletePopupOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDeleteWarehouse = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <Box maxW='7xl' mx={'auto'} pt={{ base: 2, sm: 12, md: 17 }} mt={'3em'}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        mb={'3em'}
        pb={'8'}
      >
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Warehouses
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={'5'}>
          <Button
            size='sm'
            bgColor={'#06283D'}
            color={'#EEEDED'}
            leftIcon={<FiPlus />}
            onClick={openModal}
            borderRadius={'full'}
            boxShadow={'0px 0px 3px 0px #06283D'}
            _hover={{
              bg: '#164B60',
              color: '#EEEDED',
            }}
          >
            Add Warehouse
          </Button>
        </Box>
      </Box>

      <Filter
        page={pages}
        model={warehouses}
        show={warehouses}
        filter={filterWarehouses}
        handleNextPage={() => {
          setFilterWarehouses({
            ...filterWarehouses,
            page: filterWarehouses.page + 1,
          });
        }}
        handlePrevPage={() => {
          setFilterWarehouses({
            ...filterWarehouses,
            page: filterWarehouses.page - 1,
          });
        }}
        handleLimit={(e) => {
          setFilterWarehouses({
            ...filterWarehouses,
            limit: e.target.value,
          });
        }}
        disableNextPage={filterWarehouses.page === pages}
        disablePrevPage={filterWarehouses.page === 1}
        count={rows}
        placeholder={'Search by Name or Warehouse'}
        handleSearch={(e) => {
          setTimeout(() => {
            setFilterWarehouses({
              ...filterWarehouses,
              search_query: e.target.value,
            });
          }, 1000);
        }}
      />
      <Box>
        <Box>
          <TableContainer overflowY={'auto'} h={'25em'} px={5}>
            <Table variant='simple'>
              <TableCaption>Warehouses</TableCaption>
              <Thead bg={'#06283D'}>
                <Tr>
                  <Th color={'#EEEDED'}>Warehouse Name</Th>
                  <Th color={'#EEEDED'}>Address</Th>
                  <Th color={'#EEEDED'}>Province</Th>
                  <Th color={'#EEEDED'}>City</Th>

                  <Th color={'#EEEDED'}>
                    <Center>Actions</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody bg={'#EEEDED'}>
                {warehouses.map((warehouse) => (
                  <Tr key={warehouse.id}>
                    <Td
                      onClick={() => router.push(`/warehouse/${warehouse.id}`)}
                      cursor={'pointer'}
                    >
                      {warehouse.name}
                    </Td>
                    <Td>{warehouse.address}</Td>
                    <Td>{warehouse.province}</Td>
                    <Td>{warehouse.city}</Td>
                    <Td>
                      <Icon
                        color={'#06283D'}
                        onClick={() => handleEditWarehouse(warehouse)}
                        as={FiEdit}
                        mr={3}
                        _hover={{
                          cursor: 'pointer',
                          color: '#4F709C',
                        }}
                        title='Edit'
                      />
                      <Icon
                        color={'red'}
                        onClick={() => handleDeleteWarehouse(warehouse.id)}
                        as={FiDelete}
                        _hover={{
                          cursor: 'pointer',
                          color: '#EF6262',
                        }}
                        title='Delete'
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add Warehouse</ModalHeader>
          <ModalBody>
            <form onSubmit={''}>
              <ChakraFormControl isInvalid={errors.name} isRequired>
                <ChakraFormLabel>Name</ChakraFormLabel>
                <Input {...register('name', { required: true })} />
                {errors.name && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.address} isRequired>
                <ChakraFormLabel>Address</ChakraFormLabel>
                <Textarea {...register('address', { required: true })} />
                {errors.address && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.province} isRequired>
                <ChakraFormLabel>Province</ChakraFormLabel>
                <Select
                  id='province'
                  {...register('province', { required: true })}
                  onChange={(e) =>
                    fetchCitiesByProvince(
                      e.target.selectedOptions[0].getAttribute('data-id')
                    )
                  }
                >
                  <option value=''>-Select Province-</option>
                  {provinces.map((province) => (
                    <option
                      key={province.id}
                      value={province.name}
                      data-id={province.id}
                    >
                      {province.name}
                    </option>
                  ))}
                  {errors.province && (
                    <FormErrorMessage>This field is required</FormErrorMessage>
                  )}
                </Select>
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.city} isRequired>
                <ChakraFormLabel>City</ChakraFormLabel>
                <Select id='city' {...register('city', { required: true })}>
                  <option value=''>-Select City-</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.city && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.postal_code}>
                <ChakraFormLabel>Postal Code</ChakraFormLabel>
                <Input type='number' {...register('postal_code')} />
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.telephone} isRequired>
                <ChakraFormLabel>Telephone</ChakraFormLabel>
                <Input
                  type='number'
                  {...register('telephone', { required: true })}
                />
                {errors.telephone && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
            <Button variant='ghost' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isSavePopupOpen && (
        <Box
          position='fixed'
          bottom={4}
          right={4}
          p={3}
          bg='green.500'
          color='white'
          borderRadius='md'
          zIndex={9999}
        >
          Data has been saved to the database.
        </Box>
      )}

      {isDeletePopupOpen && (
        <Box
          position='fixed'
          bottom={4}
          right={4}
          p={3}
          bg='red.700'
          color='white'
          borderRadius='md'
          zIndex={9999}
        >
          Data has been deleted.
        </Box>
      )}

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        onClose={cancelDeleteWarehouse}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Warehouse
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this warehouse? This action is
              irreversible.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                rounded={'full'}
                colorScheme='red'
                mr={3}
                onClick={confirmDeleteWarehouse}
              >
                Delete
              </Button>
              <Button rounded={'full'} onClick={cancelDeleteWarehouse}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Warehouse</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmitEdit)}>
              <ChakraFormControl isInvalid={errors.name} isRequired>
                <ChakraFormLabel>Name</ChakraFormLabel>
                <Input
                  defaultValue={editWarehouseData?.name}
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.address} isRequired>
                <ChakraFormLabel>address</ChakraFormLabel>
                <Textarea
                  defaultValue={editWarehouseData?.address}
                  {...register('address', { required: true })}
                />
                {errors.address && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.province} isRequired>
                <ChakraFormLabel>Province</ChakraFormLabel>
                <Select
                  id='province'
                  {...register('province', { required: true })}
                  onChange={(e) =>
                    fetchCitiesByProvince(
                      e.target.selectedOptions[0].getAttribute('data-id')
                    )
                  }
                  defaultValue={editWarehouseData?.province}
                >
                  <option value=''>-Select Province-</option>
                  {provinces.map((province) => (
                    <option
                      key={province.id}
                      value={province.name}
                      data-id={province.id}
                    >
                      {province.name}
                    </option>
                  ))}
                  {errors.province && (
                    <FormErrorMessage>This field is required</FormErrorMessage>
                  )}
                </Select>
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.city} isRequired>
                <ChakraFormLabel>City</ChakraFormLabel>
                <Select
                  id='city'
                  {...register('city', { required: true })}
                  defaultValue={editWarehouseData?.city}
                >
                  <option value={editWarehouseData?.city}>
                    {editWarehouseData?.city}
                  </option>
                  <option value=''>-Select City-</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.city && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.postal_code}>
                <ChakraFormLabel>Postal Code</ChakraFormLabel>
                <Input
                  defaultValue={editWarehouseData?.postal_code}
                  type='number'
                  {...register('postal_code')}
                />
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.telephone} isRequired>
                <ChakraFormLabel>Telephone</ChakraFormLabel>
                <Input
                  defaultValue={editWarehouseData?.telephone}
                  type='number'
                  {...register('telephone', { required: true })}
                />
                {errors.telephone && (
                  <FormErrorMessage>This field is required</FormErrorMessage>
                )}
              </ChakraFormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit(onSubmitEdit)}>
              Save Changes
            </Button>
            <Button variant='ghost' onClick={closeEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Warehouses;
