import React, { useState, useEffect } from 'react';
import {
  getAllCustomer,
  getCustomersById,
  editCustomersById,
  deleteCustomersById,
} from '@/api/customers';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormControl as FormErrorMessage,
  FormLabel,
  Input,
  Box,
  TableContainer,
  IconButton,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FiPlus, FiDelete, FiEdit, FiMove } from 'react-icons/fi';
import { instance } from '../../modules/axios/index';
import { useRouter } from 'next/router';
import { useFieldArray, useForm, watch } from 'react-hook-form';
import { fetchData } from '@/api/suppliers';
import InputField from '../InputField/InputField';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
    reset,
    resetField,
    setValue,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCustomersId, setEditCustomersId] = useState(null);
  const [detailItems, setDetailItems] = useState({});
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await instance.get('/customer?page=1&limit=5');
      const { dataCustomers } = response.data;
      setCustomers(dataCustomers);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };
  // console.log(detailItems, 'Customer');

  useEffect(() => {
    fetchData();
    if (detailItems) {
      setValue('full_name', detailItems?.data?.full_name);
      setValue('address', detailItems?.data?.address);
    }
    fetchData();
  }, [detailItems, isModalOpen]);
  // console.log("INI DETAILS ITEMS", detailItems);

  const handleEdit = async (id) => {
    const foundCustomers = await getCustomersById(id);
    setDetailItems(foundCustomers);
    fetchData();
    if (foundCustomers) {
      setEditCustomersId(id);
      setIsModalOpen(true);
    }
  };
  //console.log(detailItems);

  const handleDelete = async (id) => {
    try {
      await deleteCustomersById(id);
      handleCloseModal();
      toast({
        title: 'Delete Product',
        description: 'You have successfully Created Product.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Failed to delete product.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await instance.put(`/customer/${editCustomersId}`, data);
      handleCloseModal();
      toast({
        title: 'Updated Customer',
        description: 'You have successfully Updated Customers.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData();
      reset();
    } catch (error) {
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
    setIsModalOpen(false);
  };

  return (
    <Box maxW='7xl' mx={'auto'} px={{ base: 2, sm: 12, md: 17 }} mt={50}>
      <Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          py={'10'}
        >
          <Text fontWeight={'bold'} fontSize={'xl'}>
            Customers
          </Text>
          <InputCustomers fetchData={fetchData} />
        </Box>
        <Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead bg={'#DFF6FE'}>
                <Tr>
                  <Th>Full Name</Th>
                  <Th>Address</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td
                      onClick={() => router.push(`/customers/${customer.id}`)}
                      cursor={'pointer'}
                    >
                      {customer.full_name}
                    </Td>
                    <Td>{customer.address}</Td>
                    <Td>
                      <IconButton
                        icon={<FiEdit />}
                        colorScheme={'blue'}
                        variant={'outline'}
                        ml={2}
                        onClick={() => handleEdit(customer.id)}
                      />
                      <IconButton
                        icon={<FiDelete />}
                        colorScheme={'red'}
                        variant={'outline'}
                        ml={2}
                        onClick={() => handleDelete(customer.id)}
                      />
                    </Td>
                  </Tr>
                ))}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign='center'>Edit Customers</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                          name={'full_name'}
                          label={'Full Name'}
                          type={'text'}
                          placeholder={'Please Input Your Full Name'}
                          register={register('full_name', {
                            required: 'This is required',
                          })}
                          errors={errors.full_name}
                        />
                        <InputField
                          name={'address'}
                          label={'Address'}
                          type={'text'}
                          placeholder={'Please Input Your Address'}
                          register={register('address', {
                            required: 'This is required',
                          })}
                          errors={errors.address}
                        />
                        <Button
                          type='submit'
                          size={'md'}
                          colorScheme='blue'
                          mt={3}
                          w={'100%'}
                          borderRadius={'full'}
                        >
                          Update Category
                        </Button>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button size={'md'} onClick={handleCloseModal}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export const InputCustomers = ({ fetchData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await instance.post('/customer', data);
      handleCloseModal(),
        toast({
          title: 'Created Product',
          description: 'You have successfully Created Product.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

      reset();
      fetchData();
    } catch (error) {
      toast({
        title: 'Failed to create product.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button size='sm' onClick={handleOpenModal}>
        <FiPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Stock Form</ModalHeader>
          <ModalBody pb={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name={'full_name'}
                label={'Full Name'}
                type={'text'}
                placeholder={'Please Input Your Full Name'}
                register={register('full_name', {
                  required: 'This is required',
                })}
                errors={errors.full_name}
              />
              <InputField
                name={'address'}
                label={'Address'}
                type={'text'}
                placeholder={'Please Input Your Address'}
                register={register('address', {
                  required: 'This is required',
                })}
                errors={errors.address}
              />
              <Button
                type='submit'
                size={'md'}
                colorScheme='blue'
                mt={3}
                w={'100%'}
                borderRadius={'full'}
              >
                Create Category
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button size={'md'} onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customers;
