import React, { useState, useEffect } from 'react';
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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormLabel,
  FormControl,
  Input,
  Link,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { getAllCategories, createCategories } from '@/modules/fetch';
//import { useNavigate } from "react-router-dom";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  SearchIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import {
  FiSearch,
  FiUpload,
  FiPlus,
  FiArrowLeft,
  FiArrowRight,
  FiCircle,
  FiArrowUpRight,
  FiDelete,
  FiMove,
} from 'react-icons/fi';
import { Form, useForm } from 'react-hook-form';
import axios from 'axios';

const Product = () => {
  const [books, setBooks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllCategories();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  console.log(books.data);
  return (
    <Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        py={'10'}
      >
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Products
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={'5'}>
          <AddProductForm />
          <AddStockForm />
          <MoveStock />
        </Box>
      </Box>
      <Box>
        <Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            mx={'2'}
          >
            <Text fontWeight={'bold'} fontSize={'xl'}>
              Summary
            </Text>
            <Text fontWeight={'bold'} color={'#1363DE'}>
              Product Categories
            </Text>
          </Box>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'center'}
          justifyContent={'center'}
          gap={'5'}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            px={'10'}
            py={'5'}
            borderWidth='1px'
            rounded='lg'
            shadow='lg'
          >
            <WarningIcon fontSize={30} />
            <Box direction={'column'} px={'2'} py={'3'}>
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                28 Types
              </Text>
              <Text fontWeight={'normal'} fontSize={'xl'}>
                Available Stock
              </Text>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            px={'10'}
            py={'5'}
            borderWidth='1px'
            rounded='lg'
            shadow='lg'
          >
            <WarningIcon fontSize={30} />
            <Box direction={'column'} px={'2'} py={'3'}>
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                28 Types
              </Text>
              <Text fontWeight={'normal'} fontSize={'xl'}>
                Available Stock
              </Text>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            px={'10'}
            py={'5'}
            borderWidth='1px'
            rounded='lg'
            shadow='lg'
          >
            <WarningIcon fontSize={30} />
            <Box direction={'column'} px={'2'} py={'3'}>
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                28 Types
              </Text>
              <Text fontWeight={'normal'} fontSize={'xl'}>
                Available Stock
              </Text>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            px={'10'}
            py={'5'}
            borderWidth='1px'
            rounded='lg'
            shadow='lg'
          >
            <WarningIcon fontSize={30} />
            <Box direction={'column'} px={'2'} py={'3'}>
              <Text fontWeight={'bold'} fontSize={'2xl'}>
                28 Types
              </Text>
              <Text fontWeight={'normal'} fontSize={'xl'}>
                Available Stock
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            display={'row'}
            justifyContent={'start'}
            alignItems={'center'}
            gap={'10'}
            my={'5'}
          >
            <Button
              px={8}
              bg={'#DFF6FE'}
              color={'black'}
              rounded={'md'}
              _active={{ bg: '#1363DE' }}
            >
              Goods & Services
            </Button>
            <Button
              px={8}
              bg={'#1363DE'}
              color={'white'}
              rounded={'md'}
              _active={{ bg: '#DFF6FE' }}
            >
              Stock Adjustment
            </Button>
            <Button
              px={8}
              bg={'#DFF6FE'}
              color={'black'}
              rounded={'md'}
              _active={{ bg: '#1363DE' }}
            >
              Need Approval
            </Button>
          </Box>
          <Box display={'flex'} justifyContent={'end'}>
            <InputGroup>
              <Input
                placeholder='Masukkan kata kunci'
                value='Search value'
                onChange={''}
                px={'8'}
              />
              <InputRightElement width='auto'>
                <Button
                  colorScheme='blue'
                  onClick={''}
                  leftIcon={<SearchIcon />}
                >
                  Cari
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>

        <Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead bg={'#DFF6FE'}>
                <Tr>
                  <Th>SKU</Th>
                  <Th>Categories Id</Th>
                  <Th>Description</Th>
                  <Th>Name</Th>
                  <Th>Item Size</Th>
                  <Th>Item Weight</Th>
                  <Th>Selling Price</Th>
                  <Th>Base Price</Th>
                  <Th>Image</Th>
                </Tr>
              </Thead>
              <Tbody>
                {books?.data?.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.SKU}</Td>
                    <Td>{item.categoriesId}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.size}</Td>
                    <Td>{item.weight}</Td>
                    <Td>{item.basePrice}</Td>
                    <Td>{item.sellingPrice}</Td>
                    <Image src={item.imageUrl} boxSize='50px' />
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export const AddProductForm = () => {
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
      //const response = await createCategories(formData);

      const response = await axios.post(
        'http://localhost:8081/api/items',
        formData,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4NTQyMDQyfQ.UrgiBm_GkR9MLaku7MeZWIT5zEnmPGsHKjPSrVL-J68',
            'Content-Type': 'multipart/form-data',
          },
        },
        handleCloseModal(),
        toast({
          title: 'Created Product',
          description: 'You have successfully Created Product.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      );
      console.log(response.data);

      if (response.status === 200) {
        console.log('Produk berhasil ditambahkan!');

        reset();
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim permintaan:', error);
      toast({
        title: 'Failed to create product.',
        description: err.message,
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
      <Button
        size='sm'
        bgColor={''}
        leftIcon={<FiPlus />}
        onClick={handleOpenModal}
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
                <FormControl isInvalid={errors.categories_id} mb={4}>
                  <FormLabel htmlFor='categories_id'>Categories id:</FormLabel>
                  <Input
                    type='number'
                    id='categories_id'
                    {...register('categories_id', { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
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
                  <FormLabel htmlFor='selling_price'>Selling price:</FormLabel>
                  <Input
                    type='number'
                    id='selling_price'
                    {...register('selling_price', { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.image_url} mb={4}>
                  <FormLabel htmlFor='image_url'>Gambar:</FormLabel>
                  <Input
                    type='file'
                    id='image_url'
                    {...register('image_url', { required: true })}
                  />
                  <FormErrorMessage>Gambar harus diunggah.</FormErrorMessage>
                </FormControl>
                <Button type='submit' size={'md'} colorScheme='blue' mr={3}>
                  Tambah product
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

export const AddStockForm = ({
  data,
  setData,
  warehouses,
  vendors,
  handleAddProduct,
}) => {
  //data needed: products , vendors, warehouses

  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [details, setDetails] = useState({
    product_id: 1,
    quantity: 1,
    vendor_id: 1,
    warehouse_id: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setDetails((prev) => ({ ...prev, [name]: 0 }));
    } else {
      const quantity = parseInt(value);
      setDetails((prev) => ({ ...prev, [name]: quantity }));
    }
  };

  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    handleAddProduct(details);
    try {
      await postStock(
        details.product_id,
        details.quantity,
        details.vendor_id,
        details.warehouse_id,
        accessToken
      );
      setDetails({
        product_id: 0,
        quantity: 1,
        vendor_id: 0,
        warehouse_id: 0,
      });
      setData((prevData) => ({
        ...prevData,
        products: [...prevData.products, details],
      }));
      handleCloseModal();
      toast({
        title: 'Stocks Added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleCloseModal();
    } catch (err) {
      toast({
        title: 'Failed to add stocks.',
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

  // const { colorMode } = useColorMode();
  // const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  // const counterColor = colorMode === "dark" ? "#da7272" : "#fb997b";
  return (
    <Box>
      <Button size='sm' leftIcon={<FiArrowRight />} onClick={handleOpenModal}>
        Add Stocks
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Stock Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Product</FormLabel>
                <Select
                  size='sm'
                  variant='filled'
                  name='product_id'
                  value={details.product_id}
                  onChange={handleChange}
                >
                  {/* {data.products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))} */}
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  size='sm'
                  variant='filled'
                  type='text'
                  name='quantity'
                  value={''}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Vendor</FormLabel>
                <Select
                  size='sm'
                  variant='filled'
                  name='vendor_id'
                  value={''}
                  onChange={handleChange}
                >
                  {/* {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))} */}
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Warehouse</FormLabel>
                <Select
                  size='sm'
                  variant='filled'
                  name='warehouse_id'
                  value={''}
                  onChange={handleChange}
                >
                  {/* {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))} */}
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              size='sm'
              variant='filled'
              // bgColor={buttonColor}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              size='sm'
              variant='filled'
              // bgColor={counterColor}
              onClick={handleCloseModal}
              ml={2}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const MoveStock = () => {
  const [details, setDetails] = useState({
    product_id: '',
    source_warehouse_id: '',
    quantity: '',
    destination_warehouse_id: '',
  });
  // const products = data.data.products;
  // const destinationWarehouse = data.warehouse;
  const [selectedProductId, setSelectedProductId] = useState(0);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setDetails((prev) => ({ ...prev, [name]: 0 }));
    } else {
      const quantity = parseInt(value);
      setDetails((prev) => ({ ...prev, [name]: quantity }));
    }
  };

  const handleMoveSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    try {
      await moveProduct(
        details.product_id,
        details.source_warehouse_id,
        details.quantity,
        details.destination_warehouse_id,
        accessToken
      );
      setDetails({
        product_id: '',
        source_warehouse_id: '',
        quantity: '',
        destination_warehouse_id: '',
      });
      handleCloseModal();
      toast({
        title: 'Move Success.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Move Failed.',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // const { colorMode } = useColorMode();
  // const buttonColor = colorMode === "dark" ? "#7289da" : "#3bd1c7";
  // const counterColor = colorMode === "dark" ? "#da7272" : "#fb997b";
  return (
    <Box>
      <Button
        size='sm'
        bgColor={''}
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
            {/* Mapping over products */}

            <Select
              p={4}
              size='sm'
              variant='filled'
              name='product_id'
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(+e.target.value);
                setDetails((prev) => {
                  return { ...prev, product_id: +e.target.value };
                });
              }}
            >
              <option value='' disabled isDisabled>
                Select Product to move
              </option>
              {/* {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))} */}
            </Select>
            {selectedProductId ? (
              <Select
                p={4}
                size='sm'
                variant='filled'
                defaultValue={details.source_warehouse_id}
                name='source_warehouse_id'
                onChange={handleChange}
              >
                <option value='' disabled>
                  Select source
                </option>
                {/* {products
                  .find((product) => product.id === selectedProductId)
                  .Warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} @ {warehouse.WarehouseStock.quantity}
                    </option>
                  ))} */}
              </Select>
            ) : (
              <Select
                p={4}
                size='sm'
                variant='filled'
                name='source_warehouse_id'
                placeholder='select product to move first'
                disabled
              >
                <option value='' disabled>
                  Select a product first
                </option>
              </Select>
            )}

            {/* Mapping over destinationWarehouse */}
            <Select
              p={4}
              size='sm'
              variant='filled'
              name='destination_id'
              value={details.destination_warehouse_id}
              placeholder='Select warehouse destination'
              onChange={(e) => {
                setDetails((prev) => {
                  return { ...prev, destination_warehouse_id: +e.target.value };
                });
              }}
            >
              {/* {destinationWarehouse.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))} */}
            </Select>
            <Input
              size='sm'
              p={4}
              variant='filled'
              name='quantity'
              value={details.quantity}
              placeholder='Quantity'
              onChange={(e) => {
                setDetails((prev) => {
                  return { ...prev, quantity: +e.target.value };
                });
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button size='sm' bgColor={''} onClick={handleMoveSubmit}>
              Submit
            </Button>
            <Button
              bgColor={''}
              size='sm'
              colorScheme='gray'
              onClick={handleCloseModal}
              ml={2}
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
