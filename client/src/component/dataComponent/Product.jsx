import React, { useState, useEffect } from "react";
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
  VStack,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  getAllCategories,
  getAllWarehouse,
  getAllWarehouseStock,
  getAllSuppliers,
} from "@/modules/fetch";
//import { useNavigate } from "react-router-dom";
import { WarningIcon, SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";
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
} from "react-icons/fi";
import { Form, useForm } from "react-hook-form";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getAllCategories();
      setProduct(product);
    };
    fetchProduct();
  }, []);

  // console.log(product.data);
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        py={"10"}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Products
        </Text>
        <Box display={"flex"} flexDirection={"row"} gap={"5"}>
          <AddProductForm />
          <AddStockForm />
          <MoveStock />
        </Box>
      </Box>
      <Box>
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            mx={"2"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Summary
            </Text>
            <Text fontWeight={"bold"} color={"#1363DE"}>
              Product Categories
            </Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"center"}
          justifyContent={"center"}
          gap={"5"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            px={"10"}
            py={"5"}
            borderWidth="1px"
            rounded="lg"
            shadow="lg">
            <WarningIcon fontSize={30} />
            <Box direction={"column"} px={"2"} py={"3"}>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                28 Types
              </Text>
              <Text fontWeight={"normal"} fontSize={"xl"}>
                Available Stock
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            px={"10"}
            py={"5"}
            borderWidth="1px"
            rounded="lg"
            shadow="lg">
            <WarningIcon fontSize={30} />
            <Box direction={"column"} px={"2"} py={"3"}>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                28 Types
              </Text>
              <Text fontWeight={"normal"} fontSize={"xl"}>
                Available Stock
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            px={"10"}
            py={"5"}
            borderWidth="1px"
            rounded="lg"
            shadow="lg">
            <WarningIcon fontSize={30} />
            <Box direction={"column"} px={"2"} py={"3"}>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                28 Types
              </Text>
              <Text fontWeight={"normal"} fontSize={"xl"}>
                Available Stock
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            px={"10"}
            py={"5"}
            borderWidth="1px"
            rounded="lg"
            shadow="lg">
            <WarningIcon fontSize={30} />
            <Box direction={"column"} px={"2"} py={"3"}>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                28 Types
              </Text>
              <Text fontWeight={"normal"} fontSize={"xl"}>
                Available Stock
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Box
            display={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={"10"}
            my={"5"}>
            <Button
              px={8}
              bg={"#DFF6FE"}
              color={"black"}
              rounded={"md"}
              _active={{ bg: "#1363DE" }}>
              Goods & Services
            </Button>
            <Button
              px={8}
              bg={"#1363DE"}
              color={"white"}
              rounded={"md"}
              _active={{ bg: "#DFF6FE" }}>
              Stock Adjustment
            </Button>
            <Button
              px={8}
              bg={"#DFF6FE"}
              color={"black"}
              rounded={"md"}
              _active={{ bg: "#1363DE" }}>
              Need Approval
            </Button>
          </Box>
          <Box display={"flex"} justifyContent={"end"}>
            <InputGroup>
              <Input
                placeholder="Masukkan kata kunci"
                value="Search value"
                onChange={""}
                px={"8"}
              />
              <InputRightElement width="auto">
                <Button
                  colorScheme="blue"
                  onClick={""}
                  leftIcon={<SearchIcon />}>
                  Cari
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>

        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={"#DFF6FE"}>
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
                {product?.data?.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.SKU}</Td>
                    <Td>{item.categoriesId}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.size}</Td>
                    <Td>{item.weight}</Td>
                    <Td>{item.basePrice}</Td>
                    <Td>{item.sellingPrice}</Td>
                    <Image
                      src={`http://localhost:3000/${item.imageUrl}`}
                      boxSize="50px"
                    />
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
      formData.append("categories_id", data.categories_id);
      formData.append("name", data.name);
      formData.append("SKU", data.SKU);
      formData.append("size", data.size);
      formData.append("weight", data.weight);
      formData.append("description", data.description);
      formData.append("base_price", data.base_price);
      formData.append("selling_price", data.selling_price);
      formData.append("image_url", data.image_url[0]);

      const response = await axios.post(
        "http://localhost:3000/api/items",
        formData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4NDc0MTc0fQ.XVjCXQTspbYuUEabpmFBja17eSe9w1FNplwLQpOjEmI",
            "Content-Type": "multipart/form-data",
          },
        },
        handleCloseModal(),
        toast({
          title: "Created Product",
          description: "You have successfully Created Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );
      if (response.status === 200) {
        console.log("Produk berhasil ditambahkan!");

        reset();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim permintaan:", error);
      toast({
        title: "Failed to create product.",
        description: err.message,
        status: "error",
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
        size="sm"
        bgColor={""}
        leftIcon={<FiPlus />}
        onClick={handleOpenModal}>
        Add Product
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create Product</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.categories_id} mb={4}>
                  <FormLabel htmlFor="categories_id">Categories id:</FormLabel>
                  <Input
                    type="number"
                    id="categories_id"
                    {...register("categories_id", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} mb={4}>
                  <FormLabel htmlFor="name">Name:</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.SKU} mb={4}>
                  <FormLabel htmlFor="SKU">SKU:</FormLabel>
                  <Input
                    type="text"
                    id="SKU"
                    {...register("SKU", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.size} mb={4}>
                  <FormLabel htmlFor="size">size:</FormLabel>
                  <Input
                    type="number"
                    id="size"
                    {...register("size", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.weight} mb={4}>
                  <FormLabel htmlFor="weight">weight:</FormLabel>
                  <Input
                    type="number"
                    id="weight"
                    {...register("weight", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description} mb={4}>
                  <FormLabel htmlFor="description">Description:</FormLabel>
                  <Input
                    type="text"
                    id="description"
                    {...register("description", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.base_price} mb={4}>
                  <FormLabel htmlFor="base_price">Base Price:</FormLabel>
                  <Input
                    type="number"
                    id="base_price"
                    {...register("base_price", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.selling_price} mb={4}>
                  <FormLabel htmlFor="selling_price">Selling price:</FormLabel>
                  <Input
                    type="number"
                    id="selling_price"
                    {...register("selling_price", { required: true })}
                  />
                  <FormErrorMessage>Harga harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.image_url} mb={4}>
                  <FormLabel htmlFor="image_url">Gambar:</FormLabel>
                  <Input
                    type="file"
                    id="image_url"
                    {...register("image_url", { required: true })}
                  />
                  <FormErrorMessage>Gambar harus diunggah.</FormErrorMessage>
                </FormControl>
                <Button type="submit" size={"md"} colorScheme="blue" mr={3}>
                  Tambah product
                </Button>
                <Button size={"md"} onClick={handleCloseModal}>
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

export const AddStockForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [warehouse, setWarehouse] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouse = await getAllWarehouse();
      setWarehouse(warehouse);
    };
    fetchWarehouse();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getAllCategories();
      setItems(items);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliers = await getAllSuppliers();
      setSuppliers(suppliers);
    };
    fetchSuppliers();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue("category", selectedValue);
  };

  React.useEffect(() => {
    setValue("items_id", 1);
    setValue("warehouses_id", 1);
    setValue("suppliers_id", 1);
    setValue("stock", 1);
  }, [setValue]);

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data);
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/items/stock",
        jsonData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4NDc0MTc0fQ.XVjCXQTspbYuUEabpmFBja17eSe9w1FNplwLQpOjEmI",
            "Content-Type": "application/json",
          },
        },
        handleCloseModal(),
        toast({
          title: "Created Product",
          description: "You have successfully Created Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );
      if (response.status === 200) {
        console.log("Produk berhasil ditambahkan!");

        reset();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim permintaan:", error);
      toast({
        title: "Failed to create product.",
        description: err.message,
        status: "error",
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
      <Button size="sm" leftIcon={<FiArrowRight />} onClick={handleOpenModal}>
        Add Stocks
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Stock Form</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={4} isInvalid={errors.items_id}>
                  <FormLabel>Product</FormLabel>
                  <Select
                    size="sm"
                    variant="filled"
                    name="Items Id"
                    onChange={handleChange}
                    {...register("items_id", { required: true })}>
                    {items?.data?.map((product) => (
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
                    size="sm"
                    variant="filled"
                    name="warehouse_id"
                    onChange={handleChange}
                    {...register("warehouses_id", { required: true })}>
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
                    size="sm"
                    variant="filled"
                    type="text"
                    name="quantity"
                    onChange={handleChange}
                    {...register("stock", { required: true })}
                  />
                  <FormErrorMessage>Stock Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.suppliers_id}>
                  <FormLabel>Suppliers</FormLabel>
                  <Select
                    size="sm"
                    variant="filled"
                    name="vendor_id"
                    onChange={handleChange}
                    {...register("suppliers_id", { required: true })}>
                    {suppliers?.dataSuppliers?.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Suppliers Harus Di Isi</FormErrorMessage>
                </FormControl>

                <Button type="submit" size={"md"} colorScheme="blue" mr={3}>
                  Tambah product
                </Button>
                <Button size={"md"} onClick={handleCloseModal}>
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

export const MoveStock = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [items, setItems] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  console.log(typeof items);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getAllCategories();
      setItems(items);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouse = await getAllWarehouse();
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
    setValue("category", selectedValue);
  };

  React.useEffect(() => {
    setValue("items_id", 1);
    setValue("source_warehouse_id", 1);
    setValue("stock", 1);
    setValue("destination_warehouse_id", 1);
  }, [setValue]);

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data);
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/warehouses-stock/move-items",
        jsonData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZOYW1lIjoiSm9obiIsImxuYW1lIjoiRG9lIiwiaWF0IjoxNjg4NDc0MTc0fQ.XVjCXQTspbYuUEabpmFBja17eSe9w1FNplwLQpOjEmI",
            "Content-Type": "application/json",
          },
        },
        handleCloseModal(),
        toast({
          title: "Created Product",
          description: "You have successfully Created Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );
      if (response.status === 200) {
        console.log("Produk berhasil ditambahkan!");

        reset();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim permintaan:", error);
      toast({
        title: "Failed to create product.",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Button
        size="sm"
        bgColor={""}
        leftIcon={<FiMove />}
        onClick={handleOpenModal}>
        Move Stocks
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="sm">
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
                    size="sm"
                    variant="filled"
                    name="Items Id"
                    onChange={handleChange}
                    {...register("items_id", { required: true })}>
                    {items?.data?.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Items Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.items_id}>
                  <FormLabel>Select Product To move</FormLabel>
                  <Select
                    size="sm"
                    variant="filled"
                    name="Items Id"
                    onChange={handleChange}
                    {...register("source_warehouse_id", { required: true })}>
                    {/* {items
                      .find((product) => product.id === selectedProductId)
                      .warehouse.map((warehouses) => (
                        <option key={warehouses.id} value={warehouses.id}>
                          {warehouses.name}
                        </option>
                      ))} */}
                    {warehouse.map((warehouses) => (
                      <option key={warehouses.id} value={warehouses.id}>
                        {warehouses.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Items Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.stock}>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    size="sm"
                    variant="filled"
                    type="text"
                    name="quantity"
                    onChange={handleChange}
                    {...register("stock", { required: true })}
                  />
                  <FormErrorMessage>Stock Harus Di Isi</FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={errors.suppliers_id}>
                  <FormLabel>Select warehouse destination</FormLabel>
                  <Select
                    size="sm"
                    variant="filled"
                    name="Warehouse id"
                    onChange={handleChange}
                    {...register("destination_warehouse_id", {
                      required: true,
                    })}>
                    {warehouse.map((warehouses) => (
                      <option key={warehouses.id} value={warehouses.id}>
                        {warehouses.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>Suppliers Harus Di Isi</FormErrorMessage>
                </FormControl>

                <Button type="submit" size={"md"} colorScheme="blue" mr={3}>
                  Tambah product
                </Button>
                <Button size={"md"} onClick={handleCloseModal}>
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

export default Product;
