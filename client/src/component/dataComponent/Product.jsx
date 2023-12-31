import React, { useState, useEffect, useContext } from 'react';
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
  useToast,
  Icon,
  TableCaption,
  useDisclosure,
} from '@chakra-ui/react';
import {
  getAllItems,
  getAllItemsById,
  getAllWarehouses,
  getAllSuppliers,
} from '@/modules/fetch';
import { FiPlus, FiArrowRight, FiDelete, FiMove, FiEdit } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { DataContext } from '@/context/AllDataContext';
import SelectField from '../SelectField/SelectField';
import Filter from '../Filter';
import { updateItems, deleteItems, addStock } from '@/api/product';
import ModalConfirmation from '../ModalConfirmation';
import { moveStock } from '@/api/warehouses';
import SkeletonLoading from '../SkeletonLoading';

const Product = () => {
  const toast = useToast();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const {
    allProducts,
    categories,
    warehouseStock,
    products,
    fetchItems,
    fetchAllItems,
    filterProducts,
    fetchCategories,
    setFilterProducts,
    fetchWarehousesStock,
    isLoading,
  } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [id, setId] = useState(null);
  const [detailItems, setDetailItems] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    if (detailItems) {
      setValue('categories_id', detailItems.categoriesId);
      setValue('name', detailItems.name);
      setValue('SKU', detailItems.SKU);
      setValue('size', detailItems.size);
      setValue('weight', detailItems.weight);
      setValue('description', detailItems.description);
      setValue('base_price', detailItems.basePrice);
      setValue('selling_price', detailItems.sellingPrice);
    }
    fetchCategories();
  }, [detailItems, isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (id) => {
    const foundProduct = await getAllItemsById(id);
    setDetailItems(foundProduct.data);

    if (foundProduct) {
      setEditItemId(parseInt(id));
      setIsModalOpen(true);
    }
  };

  const categoriesName = (id) => {
    const categoryName = categories.find((item) => item.id === id);
    return categoryName?.name;
  };

  const handleDeleteItems = async (id) => {
    try {
      await deleteItems(id);
      handleCloseModal(),
        toast({
          title: 'Delete Product',
          description: 'Successfully Delete Product.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      fetchItems();
    } catch (error) {
      toast({
        title: 'Failed to delete product.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
      if (data.image_url[0]) {
        formData.append('image_url', data.image_url[0]);
      }

      await updateItems(editItemId, formData);
      toast({
        title: 'Success',
        description: 'Successfully update product',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleCloseModal();
      fetchItems();
      fetchWarehousesStock();
      reset();
    } catch (error) {
      toast({
        title: 'Failed to update product',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={10}
        pb={'10'}
      >
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Products
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={'5'}>
          <AddProductForm fetchItems={() => fetchItems()} />
          <AddStockForm fetchWarehousesStock={() => fetchWarehousesStock()} />
          <MoveStock
            allProducts={allProducts}
            fetchAllItems={() => fetchAllItems()}
            warehouseStock={warehouseStock}
            fetchWarehousesStock={() => fetchWarehousesStock()}
          />
        </Box>
      </Box>
      <Filter
        page={products?.meta}
        model={products}
        show={products}
        hide={products}
        filter={filterProducts}
        handleNextPage={() => {
          setFilterProducts({
            ...filterProducts,
            page: filterProducts.page + 1,
          });
        }}
        handlePrevPage={() => {
          setFilterProducts({
            ...filterProducts,
            page: filterProducts.page - 1,
          });
        }}
        handleLimit={(e) => {
          setFilterProducts({
            ...filterProducts,
            limit: e.target.value,
          });
        }}
        disableNextPage={filterProducts.page === products?.meta?.totalPages}
        disablePrevPage={filterProducts.page === 1}
        count={products?.meta?.totalData}
        placeholder={'Search by Name or SKU'}
        handleSearch={(e) => {
          setTimeout(() => {
            setFilterProducts({
              ...filterProducts,
              q: e.target.value,
            });
          }, 1000);
        }}
        handleOrder={(e) => {
          console.log(e.target.value);
          setFilterProducts({
            ...filterProducts,
            order: e.target.value,
          });
        }}
        handleSort={(e) => {
          console.log(e.target.value);
          setFilterProducts({
            ...filterProducts,
            sort: e.target.value,
          });
        }}
        value={'name'}
        textValue={'Name'}
      />
      <TableContainer overflowY={'auto'} h={'25em'} px={5}>
        <Table variant='simple' size={'md'}>
          <TableCaption>Products</TableCaption>
          <Thead bg={'#06283D'}>
            <Tr>
              <Th color={'#EEEDED'}>Name</Th>
              <Th color={'#EEEDED'}>SKU</Th>
              <Th color={'#EEEDED'}>Categories</Th>
              <Th color={'#EEEDED'}>Warehouse</Th>
              <Th color={'#EEEDED'}>Image</Th>
              <Th color={'#EEEDED'}>Action</Th>
            </Tr>
          </Thead>
          <Tbody bg={'#EEEDED'}>
            {isLoading ? (
              <>
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </>
            ) : (
              products?.data?.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td
                      whiteSpace={'nowrap'}
                      textOverflow={'ellipsis'}
                      overflow={'hidden'}
                      title={item.name}
                      maxWidth={'250px'}
                      onClick={() => router.push(`/product/${item.id}`)}
                      cursor={'pointer'}
                      py={2}
                    >
                      {item.name}
                    </Td>
                    <Td
                      onClick={() => router.push(`/product/${item.id}`)}
                      cursor={'pointer'}
                      py={2}
                    >
                      {item.SKU}
                    </Td>
                    <Td py={2}>{categoriesName(item.categoriesId)}</Td>
                    <Td py={2}>
                      <Select border={'1px solid #9DB2BF'}>
                        {warehouseStock
                          .filter((ws) => ws.itemsName === item.name)
                          .map((wS) => {
                            return (
                              <option
                                key={wS.id}
                              >{`${wS.warehouseName}, Stock:  ${wS.stock}`}</option>
                            );
                          })}
                      </Select>
                    </Td>
                    <Image src={item.imageUrl} w={'50px'} h={'50px'} />
                    <Td>
                      <Icon
                        color={'#06283D'}
                        onClick={() => handleEdit(item.id)}
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
                          setId(item.id);
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
                );
              })
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign='center'>Edit Product</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <SelectField
                      name={'categories'}
                      label={'Categories'}
                      register={register('categories_id', {
                        required: 'This is required',
                      })}
                      errors={errors.categories_id}
                      mapping={categories}
                      option={(opt) => opt.name}
                      value={(opt) => opt.id}
                    />
                    <FormControl isInvalid={errors.name} mb={4}>
                      <FormLabel htmlFor='name'>Name:</FormLabel>
                      <Input
                        type='text'
                        id='name'
                        {...register('name', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.SKU} mb={4}>
                      <FormLabel htmlFor='SKU'>SKU:</FormLabel>
                      <Input
                        type='text'
                        id='SKU'
                        {...register('SKU', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.size} mb={4}>
                      <FormLabel htmlFor='size'>size:</FormLabel>
                      <Input
                        type='number'
                        id='size'
                        {...register('size', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.weight} mb={4}>
                      <FormLabel htmlFor='weight'>weight:</FormLabel>
                      <Input
                        type='number'
                        id='weight'
                        {...register('weight', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.description} mb={4}>
                      <FormLabel htmlFor='description'>Description:</FormLabel>
                      <Input
                        type='text'
                        id='description'
                        {...register('description', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.base_price} mb={4}>
                      <FormLabel htmlFor='base_price'>Base Price:</FormLabel>
                      <Input
                        type='number'
                        id='base_price'
                        {...register('base_price', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.selling_price} mb={4}>
                      <FormLabel htmlFor='selling_price'>
                        Selling price:
                      </FormLabel>
                      <Input
                        type='number'
                        id='selling_price'
                        {...register('selling_price', { required: true })}
                      />
                      <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel htmlFor='image_url'>Gambar:</FormLabel>
                      <Input
                        type='file'
                        id='image_url'
                        {...register('image_url')}
                      />
                    </FormControl>
                    <Button
                      type='submit'
                      size={'md'}
                      rounded={'full'}
                      colorScheme='blue'
                      w={'100%'}
                      mr={3}
                    >
                      Update product
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size={'md'}
                    rounded={'full'}
                    colorScheme='red'
                    onClick={handleCloseModal}
                  >
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
        name={'product'}
        onClick={() => {
          handleDeleteItems(id);
          onClose();
        }}
      />
    </Box>
  );
};

export const AddProductForm = ({ fetchItems }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { categories } = useContext(DataContext);

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
      if (data.image_url[0]) {
        formData.append('image_url', data.image_url[0]);
      }

      await instance.post('/items', formData);
      toast({
        title: 'Created Product',
        description: 'Successfully Created product',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
      fetchItems();
      handleCloseModal();
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
        Add Product
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Create Product</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <SelectField
                  name={'categories'}
                  label={'Categories'}
                  register={register('categories_id', {
                    required: 'This is required',
                  })}
                  variant={'filled'}
                  errors={errors.categories_id}
                  mapping={categories}
                  option={(opt) => opt.name}
                  value={(opt) => opt.id}
                />
                <FormControl isInvalid={errors.name} mb={4}>
                  <FormLabel htmlFor='name'>Name:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='text'
                    id='name'
                    {...register('name', { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.SKU} mb={4}>
                  <FormLabel htmlFor='SKU'>SKU:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='text'
                    id='SKU'
                    {...register('SKU', { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.size} mb={4}>
                  <FormLabel htmlFor='size'>size:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='number'
                    id='size'
                    {...register('size', { required: true })}
                    min={0}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.weight} mb={4}>
                  <FormLabel htmlFor='weight'>weight:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='number'
                    id='weight'
                    {...register('weight', { required: true })}
                    min={0}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description} mb={4}>
                  <FormLabel htmlFor='description'>Description:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='text'
                    id='description'
                    {...register('description', { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.base_price} mb={4}>
                  <FormLabel htmlFor='base_price'>Base Price:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='number'
                    id='base_price'
                    {...register('base_price', { required: true })}
                    min={0}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.selling_price} mb={4}>
                  <FormLabel htmlFor='selling_price'>Selling price:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='number'
                    id='selling_price'
                    {...register('selling_price', { required: true })}
                    min={0}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.image_url} mb={4}>
                  <FormLabel htmlFor='image_url'>Gambar:</FormLabel>
                  <Input
                    variant={'filled'}
                    type='file'
                    id='image_url'
                    {...register('image_url')}
                  />
                  <FormErrorMessage>Gambar harus diunggah.</FormErrorMessage>
                </FormControl>
                <Button
                  rounded={'full'}
                  width={'100%'}
                  type='submit'
                  size={'md'}
                  colorScheme='blue'
                  mr={3}
                >
                  Tambah product
                </Button>
              </form>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              rounded={'full'}
              colorScheme='red'
              size={'md'}
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

export const AddStockForm = ({ fetchWarehousesStock }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { allSuppliers, allProducts, fetchAllItems, fetchAllSuppliers } =
    useContext(DataContext);
  const [warehouse, setWarehouse] = useState([]);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouse = await getAllWarehouses();
      setWarehouse(warehouse);
    };
    fetchWarehouse();
  }, []);

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllItems();
  }, [isOpen]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue('category', selectedValue);
  };

  const onSubmit = async (data) => {
    try {
      await addStock(data);
      handleCloseModal();
      toast({
        title: 'Add Stock',
        description: 'Successfully Add Stock Product.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
      fetchWarehousesStock();
    } catch (error) {
      toast({
        title: 'Failed to add stock product.',
        description: error.message,
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
      <Button
        size='sm'
        bgColor={'#06283D'}
        color={'#EEEDED'}
        borderRadius={'full'}
        boxShadow={'0px 0px 3px 0px #06283D'}
        _hover={{
          bg: '#164B60',
          color: '#EEEDED',
        }}
        leftIcon={<FiArrowRight />}
        onClick={handleOpenModal}
      >
        Add Stocks
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Stock Form</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={4} isInvalid={errors.items_id}>
                  <FormLabel>Product</FormLabel>
                  <Select
                    size='sm'
                    variant='filled'
                    name='Items Id'
                    onChange={handleChange}
                    {...register('items_id', { required: true })}
                  >
                    <option value='' selected disabled>
                      Select Items
                    </option>
                    {allProducts?.data?.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Items Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.warehouse_id}>
                  <FormLabel>Warehouse</FormLabel>
                  <Select
                    size='sm'
                    variant='filled'
                    name='warehouse_id'
                    onChange={handleChange}
                    {...register('warehouses_id', { required: true })}
                  >
                    <option value='' selected disabled>
                      Select Warehouse
                    </option>
                    {warehouse.map((warehouses) => (
                      <option key={warehouses.id} value={warehouses.id}>
                        {warehouses.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Warehouse Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.stock}>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    size='sm'
                    variant='filled'
                    type='number'
                    name='quantity'
                    onChange={handleChange}
                    {...register('stock', { required: true })}
                    min={1}
                  />
                  <FormErrorMessage>Stock Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.suppliers_id}>
                  <FormLabel>Suppliers</FormLabel>
                  <Select
                    size='sm'
                    variant='filled'
                    name='vendor_id'
                    onChange={handleChange}
                    {...register('suppliers_id', { required: true })}
                  >
                    <option value='' selected disabled>
                      Select Suppliers
                    </option>
                    {allSuppliers?.dataSuppliers?.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Suppliers Harus Di Isi</FormErrorMessage>
                </FormControl>

                <Button
                  type='submit'
                  size={'md'}
                  colorScheme='blue'
                  rounded={'full'}
                  w={'100%'}
                  mr={3}
                  onClick={() => console.log('Masuk')}
                >
                  Add Stock Product
                </Button>
              </form>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              size={'md'}
              rounded={'full'}
              colorScheme='red'
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

export const MoveStock = ({
  allProducts,
  warehouseStock,
  fetchWarehousesStock,
  fetchAllItems,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseId, setWarehouseId] = useState(0);
  const [itemsId, setItemsId] = useState(0);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchAllItems();
  }, [isOpen]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouse = await getAllWarehouses();
      setWarehouse(warehouse);
    };
    fetchWarehouse();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue('category', selectedValue);
  };

  const onSubmit = async (data) => {
    try {
      await moveStock(data);
      handleCloseModal();
      toast({
        title: 'Product Moved',
        description: 'Successfully move product.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      reset();
      fetchWarehousesStock();
    } catch (error) {
      toast({
        title: 'Failed to move product.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      reset();
    }
  };

  return (
    <Box>
      <Button
        size='sm'
        bgColor={'#06283D'}
        color={'#EEEDED'}
        borderRadius={'full'}
        boxShadow={'0px 0px 3px 0px #06283D'}
        _hover={{
          bg: '#164B60',
          color: '#EEEDED',
        }}
        leftIcon={<FiMove />}
        onClick={handleOpenModal}
      >
        Move Stocks
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center' fontSize='sm'>
            Move Stock
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Mapping over products */}
                <FormControl mb={4} isInvalid={errors.items_id}>
                  <FormLabel>Select Product To move</FormLabel>
                  <Select
                    size='sm'
                    variant='filled'
                    name='Items Id'
                    onChange={handleChange}
                    {...register('items_id', { required: true })}
                  >
                    <option value='' selected disabled>
                      Select Items
                    </option>
                    {allProducts?.data?.map((product) => (
                      <option
                        onClick={() => setItemsId(product.id)}
                        key={product.id}
                        value={product.id}
                      >
                        {product.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Items Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.items_id}>
                  <FormLabel>Select Source Warehouse</FormLabel>
                  <Select
                    size='sm'
                    variant='filled'
                    name='Items Id'
                    onChange={handleChange}
                    {...register('source_warehouse_id', { required: true })}
                  >
                    <option value='' selected disabled>
                      {' '}
                      Select Source Warehouse{' '}
                    </option>
                    {warehouseStock
                      ?.filter((ws) => ws.itemsId === itemsId)
                      .map((warehouses) => (
                        <option
                          key={warehouses.id}
                          value={warehouses.warehouseId}
                          onClick={() => setWarehouseId(warehouses.warehouseId)}
                        >
                          {`${warehouses.warehouseName}, Stock: ${warehouses.stock}`}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>This is required</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.stock}>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    size='sm'
                    variant='filled'
                    type='text'
                    name='quantity'
                    onChange={handleChange}
                    {...register('stock', { required: true })}
                  />
                  <FormErrorMessage>Stock Harus Di Isi</FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={errors.suppliers_id}>
                  <FormLabel>Select Warehouse Destination</FormLabel>
                  <Select
                    size='sm'
                    variant='filled'
                    name='Warehouse id'
                    onChange={handleChange}
                    {...register('destination_warehouse_id', {
                      required: true,
                    })}
                  >
                    <option value='' selected disabled>
                      Select Destination Warehouse
                    </option>
                    {warehouse
                      .filter((ws) => ws.id !== warehouseId)
                      .map((warehouses) => (
                        <option key={warehouses.id} value={warehouses.id}>
                          {warehouses.name}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>Suppliers Harus Di Isi</FormErrorMessage>
                </FormControl>
                <Button
                  rounded={'full'}
                  width={'100%'}
                  type='submit'
                  size={'md'}
                  colorScheme='blue'
                  mr={3}
                >
                  Move product
                </Button>
              </form>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              size={'md'}
              rounded={'full'}
              colorScheme='red'
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

export default Product;
