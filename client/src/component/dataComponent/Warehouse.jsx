import React, { useState, useEffect } from 'react';
import { instance } from '@/modules/axios';
import {
  Button,
  Image,
  Text,
  Box,
  Select,
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormLabel as ChakraFormLabel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  VStack,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { getAllWarehouses, getAllWarehouseStock, deleteItems, updateItems } from '@/modules/fetch';
//import { useNavigate } from "react-router-dom";
import { WarningIcon, SearchIcon, ArrowForwardIcon, EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Center, Square, Circle } from '@chakra-ui/react';
import { FiSearch, FiUpload, FiPlus, FiArrowLeft, FiArrowRight, FiCircle, FiArrowUpRight, FiDelete, FiMove } from 'react-icons/fi';
import { Form, useForm } from 'react-hook-form';

export default function Warehouse() {
  const [warehouses, setWarehouse] = useState([]);
  const toast = useToast();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouses = await getAllWarehouses();
      setWarehouse(warehouses);
    };
    fetchWarehouse();
  }, []);

  return (
    <Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} py={'10'}>
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Warehouses
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={'5'}>
          <AddWarehouseForm />
          {/* <AddStockForm /> */}
          {/* <MoveStock /> */}
        </Box>
      </Box>

      <Box>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={'row'} justifyContent={'start'} alignItems={'center'} gap={'10'} my={'5'}>
            <Button px={8} bg={'#DFF6FE'} color={'black'} rounded={'md'} _active={{ bg: '#1363DE' }}>
              Goods & Services
            </Button>
            <Button px={8} bg={'#1363DE'} color={'white'} rounded={'md'} _active={{ bg: '#DFF6FE' }}>
              Stock Adjustment
            </Button>
            <Button px={8} bg={'#DFF6FE'} color={'black'} rounded={'md'} _active={{ bg: '#1363DE' }}>
              Need Approval
            </Button>
          </Box>
          <Box display={'flex'} justifyContent={'end'}>
            <InputGroup>
              <Input placeholder="Masukkan kata kunci" value="Search value" onChange={''} px={'8'} />
              <InputRightElement width="auto">
                <Button colorScheme="blue" onClick={''} leftIcon={<SearchIcon />}>
                  Cari
                </Button>
              </InputRightElement>
            </InputGroup>
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
                    <Td>{warehouse.postalCode}</Td>
                    <Td>{warehouse.telephone}</Td>

                    <Td>
                      <Button colorScheme="yellow" onClick={() => handleDeleteItems(item.id)} size={'sm'} ml={2} variant="outline">
                        <ViewIcon />
                      </Button>

                      <Button colorScheme="blue" onClick={() => handleEdit(item.id)} size={'sm'} ml={2} variant="outline">
                        <EditIcon />
                      </Button>

                      <Button colorScheme="red" onClick={() => handleDeleteItems(item.id)} size={'sm'} ml={2} variant="outline">
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
                {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign="center">Edit Product</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.categories_id} mb={4}>
                          <FormLabel htmlFor="categories_id">Categories id:</FormLabel>
                          <Input type="number" id="categories_id" {...register('categories_id', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.name} mb={4}>
                          <FormLabel htmlFor="name">Name:</FormLabel>
                          <Input type="text" id="name" {...register('name', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.SKU} mb={4}>
                          <FormLabel htmlFor="SKU">SKU:</FormLabel>
                          <Input type="text" id="SKU" {...register('SKU', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.size} mb={4}>
                          <FormLabel htmlFor="size">size:</FormLabel>
                          <Input type="number" id="size" {...register('size', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.weight} mb={4}>
                          <FormLabel htmlFor="weight">weight:</FormLabel>
                          <Input type="number" id="weight" {...register('weight', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.description} mb={4}>
                          <FormLabel htmlFor="description">Description:</FormLabel>
                          <Input type="text" id="description" {...register('description', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.base_price} mb={4}>
                          <FormLabel htmlFor="base_price">Base Price:</FormLabel>
                          <Input type="number" id="base_price" {...register('base_price', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.selling_price} mb={4}>
                          <FormLabel htmlFor="selling_price">Selling price:</FormLabel>
                          <Input type="number" id="selling_price" {...register('selling_price', { required: true })} />
                          <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.image_url} mb={4}>
                          <FormLabel htmlFor="image_url">Gambar:</FormLabel>
                          <Input type="file" id="image_url" {...register('image_url', { required: true })} />
                          <FormErrorMessage>Gambar harus diunggah.</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" size={'md'} colorScheme="blue" mr={3}>
                          Tambah product
                        </Button>
                        <Button size={'md'} onClick={handleCloseModal}>
                          Cancel
                        </Button>
                      </form>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal> */}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export const AddWarehouseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('categories_id', data.categories_id);
      formData.append('name', data.name);
      formData.append('SKU', data.SKU);
      formData.append('size', data.size);
      formData.append('weight', data.weight);
      formData.append('description', data.description);
      formData.append('base_price', data.base_price);
      formData.append('selling_price', data.selling_price);
      formData.append('image_url', data.image_url[0]);

      const response = await instance.post(
        '/items',
        formData,
        handleCloseModal(),
        toast({
          title: 'Created Product',
          description: 'You have successfully Created Product.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      );
      if (response.status === 200) {
        console.log('Produk berhasil ditambahkan!');

        reset();
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim permintaan:', error);
      toast({
        title: 'Failed to create product.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    setDetails((prev) => {
      return { ...prev, image: e.target.files[0] };
    });
  };

  return (
    <Box>
      <Button size="sm" bgColor={''} leftIcon={<FiPlus />} onClick={handleOpenModal}>
        Add Product
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create Warehouse</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name} mb={4}>
                  <FormLabel htmlFor="name">Warehouse Name:</FormLabel>
                  <Input type="text" id="name" {...register('name', { required: true })} />
                  <FormErrorMessage>Nama Harus Diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.address} mb={4}>
                  <FormLabel htmlFor="address">Address:</FormLabel>
                  <Input type="text" id="address" {...register('address', { required: true })} />
                  <FormErrorMessage>Alamat harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.province} mb={4}>
                  <FormLabel htmlFor="province">Province:</FormLabel>
                  <Input type="text" id="province" {...register('province', { required: true })} />
                  <FormErrorMessage>Provinsi harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.city} mb={4}>
                  <FormLabel htmlFor="city">City:</FormLabel>
                  <Input type="number" id="city" {...register('size', { required: true })} />
                  <FormErrorMessage>Kab/Kota harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.weight} mb={4}>
                  <FormLabel htmlFor="weight">Postal Code:</FormLabel>
                  <Input type="number" id="weight" {...register('weight', { required: true })} />
                  <FormErrorMessage>Kode pos harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description} mb={4}>
                  <FormLabel htmlFor="description">Telephone:</FormLabel>
                  <Input type="text" id="description" {...register('description', { required: true })} />
                  <FormErrorMessage>No Telepon harus diisi.</FormErrorMessage>
                </FormControl>
                <Button type="submit" size={'md'} colorScheme="blue" mr={3}>
                  Create
                </Button>
                <Button size={'md'} onClick={handleCloseModal}>
                  Cancel
                </Button>
              </form>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
