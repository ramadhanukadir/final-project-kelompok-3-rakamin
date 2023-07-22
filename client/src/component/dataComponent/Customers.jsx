import React, { useState, useEffect, useContext } from 'react';
import {
  getCustomersById,
  editCustomersById,
  deleteCustomersById,
  postCustomers,
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
  FormControl as FormErrorMessage,
  Box,
  TableContainer,
  Text,
  useToast,
  Icon,
  TableCaption,
  useDisclosure,
  Skeleton,
} from '@chakra-ui/react';
import { FiPlus, FiDelete, FiEdit, FiMove } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import InputField from '../InputField/InputField';
import { DataContext } from '@/context/AllDataContext';
import Filter from '../Filter';
import ModalConfirmation from '../ModalConfirmation';

const Customers = () => {
  const {
    customers,
    filterCustomer,
    setFilterCustomer,
    fetchCustomers,
    isLoading,
  } = useContext(DataContext);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCustomersId, setEditCustomersId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailItems, setDetailItems] = useState({});
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (detailItems) {
      setValue('full_name', detailItems?.data?.full_name);
      setValue('address', detailItems?.data?.address);
    }
    fetchCustomers();
  }, [detailItems, isModalOpen]);

  const handleEdit = async (id) => {
    const foundCustomers = await getCustomersById(id);
    setDetailItems(foundCustomers);
    fetchCustomers();
    if (foundCustomers) {
      setEditCustomersId(id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomersById(id);
      handleCloseModal();
      toast({
        title: 'Delete Customer',
        description: 'Successfully Delete Customer',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      fetchCustomers();
    } catch (error) {
      toast({
        title: 'Failed to delete customer',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await editCustomersById(editCustomersId, data);
      handleCloseModal();
      toast({
        title: 'Updated Customer',
        description: 'Successfully Updated Customers',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchCustomers();
      reset();
    } catch (error) {
      toast({
        title: 'Failed to create customer',
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
    <Box maxW='7xl' mx={'auto'} pt={{ base: 2, sm: 12, md: 17 }} mt={'3em'}>
      <Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          mb={'3em'}
          pb={'8'}
        >
          <Text fontWeight={'bold'} fontSize={'xl'}>
            Customers
          </Text>
          <InputCustomers fetchData={() => fetchCustomers()} />
        </Box>
        <Box>
          <Filter
            page={customers}
            model={customers}
            show={!customers}
            filter={filterCustomer}
            handleNextPage={() => {
              setFilterCustomer({
                ...filterCustomer,
                page: filterCustomer.page + 1,
              });
            }}
            handlePrevPage={() => {
              setFilterCustomer({
                ...filterCustomer,
                page: filterCustomer.page - 1,
              });
            }}
            handleLimit={(e) => {
              setFilterCustomer({
                ...filterCustomer,
                limit: e.target.value,
              });
            }}
            disableNextPage={filterCustomer.page === customers?.totalPages}
            disablePrevPage={filterCustomer.page === 1}
            count={customers?.totalItems}
            handleOrder={(e) => {
              setFilterCustomer({
                ...filterCustomer,
                order: e.target.value,
              });
            }}
            handleSort={(e) => {
              setFilterCustomer({
                ...filterCustomer,
                sort: e.target.value,
              });
            }}
            value={'full_name'}
            textValue={'Full Name'}
          />
          <TableContainer overflowY={'auto'} h={'25em'} px={5}>
            <Table variant='simple'>
              <TableCaption>Customers</TableCaption>
              <Thead bg={'#06283D'}>
                <Tr>
                  <Th color={'#EEEDED'}>Full Name</Th>
                  <Th color={'#EEEDED'}>Address</Th>
                  <Th color={'#EEEDED'}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody bg={'#EEEDED'}>
                {isLoading ? (
                  <Tr>
                    <Td>
                      <Skeleton height='20px' width='80%' />
                    </Td>
                    <Td>
                      <Skeleton height='20px' width='60%' />
                    </Td>
                    <Td>
                      <Skeleton height='20px' width='40%' />
                    </Td>
                  </Tr>
                ) : (
                  customers?.dataCustomers?.map((customer) => (
                    <Tr key={customer.id}>
                      <Td
                        onClick={() => router.push(`/customers/${customer.id}`)}
                        cursor={'pointer'}
                      >
                        {customer.full_name}
                      </Td>
                      <Td>{customer.address}</Td>
                      <Td>
                        <Icon
                          color={'#06283D'}
                          onClick={() => handleEdit(customer.id)}
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
                          onClick={() => {
                            setDeleteId(customer.id);
                            onOpen();
                          }}
                          as={FiDelete}
                          _hover={{
                            cursor: 'pointer',
                            color: '#EF6262',
                          }}
                          title='Delete'
                        />
                      </Td>
                    </Tr>
                  ))
                )}
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
                          Update Customer
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
          <ModalConfirmation
            isOpen={isOpen}
            onClose={onClose}
            name={'customer'}
            onClick={() => {
              handleDelete(deleteId);
              onClose();
            }}
          />
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
                    Update Customer
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  size={'sm'}
                  colorScheme='red'
                  rounded={'full'}
                  fontWeight={'semibold'}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await postCustomers(data);
      handleCloseModal(),
        toast({
          title: 'Created Product',
          description: 'You have successfully Created Product',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

      reset();
      fetchData();
    } catch (error) {
      toast({
        title: 'Failed to create product',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
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
      <Button
        size='sm'
        bgColor={'#06283D'}
        color={'#EEEDED'}
        leftIcon={<FiPlus />}
        onClick={handleOpenModal}
        borderRadius={'full'}
        boxShadow={'0px 0px 3px 0px #06283D'}
        _hover={{
          bg: '#164B60',
          color: '#EEEDED',
        }}
      >
        Add Customer
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
                Add Customer
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              size={'sm'}
              colorScheme='red'
              rounded={'full'}
              fontWeight={'semibold'}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customers;
