import React, { useState, useEffect } from "react";
import { instance } from "@/modules/axios";
import {
  Box,
  Grid,
  Text,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  useBreakpointValue,
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
  FormControl as FormErrorMessage,
  FormLabel as ChakraFormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useFieldArray, useForm, watch } from "react-hook-form";
import {
  getAllCategories,
  getCategoriesId,
  updateCategories,
  deleteCategories,
} from "@/modules/fetch";
import { FiPlus, FiEdit, FiDelete } from "react-icons/fi";
import { useRouter } from "next/router";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    resetField,
    setValue,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [detailItems, setDetailItems] = useState({});
  const router = useRouter();

  const fetchCategories = async () => {
    const { data } = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
    if (detailItems) {
      setValue("name", detailItems.name);
      setValue("description", detailItems.description);
    }
  }, [detailItems, isModalOpen]);
  console.log(categories);

  const handleEdit = async (id) => {
    const foundProduct = await getCategoriesId(id);
    setDetailItems(foundProduct);
    fetchCategories();
    if (foundProduct) {
      setEditItemId(id);
      setIsModalOpen(true);
    }
  };
  // console.log(detailItems);

  const handleDeleteItems = async (id) => {
    try {
      await deleteCategories(id);
      handleCloseModal(),
        toast({
          title: "Delete Product",
          description: "You have successfully Created Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      fetchCategories();
    } catch (error) {
      toast({
        title: "Failed to delete product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await instance.put(`/categories/${editItemId}`, data);
      handleCloseModal();
      toast({
        title: "Created Product",
        description: "You have successfully Created Product.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchCategories();
      reset();
    } catch (error) {
      toast({
        title: "Failed to create product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }} mt={50}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          py={"10"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Category
          </Text>
          <InputCategory />
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={"#DFF6FE"}>
                <Tr>
                  <Th>SKU</Th>
                  <Th>Description</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((item) => (
                  <Tr key={item.id}>
                    <Td
                      onClick={() => router.push(`/category/${item.id}`)}
                      cursor={"pointer"}
                      _hover={"black"}>
                      {item.name}
                    </Td>
                    <Td cursor={"pointer"} _hover={"black"}>
                      {item.description}
                    </Td>

                    <Td>
                      <Button
                        colorScheme={"blue"}
                        variant={"outline"}
                        onClick={() => handleEdit(item.id)}
                        size={"md"}>
                        <FiEdit />
                      </Button>
                      <Button
                        colorScheme={"red"}
                        variant={"outline"}
                        onClick={() => handleDeleteItems(item.id)}
                        size={"md"}>
                        <FiDelete />
                      </Button>
                    </Td>
                  </Tr>
                ))}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign="center">Edit Category</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.name} mb={4}>
                          <FormLabel htmlFor="name">Name:</FormLabel>
                          <Input
                            type="text"
                            id="name"
                            {...register("name", { required: true })}
                          />
                          <FormErrorMessage>Name Harus Di Isi</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.description} mb={4}>
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <Input
                            type="text"
                            id="description"
                            {...register("description", { required: true })}
                          />
                          <FormErrorMessage>
                            Description Harus Di isi
                          </FormErrorMessage>
                        </FormControl>
                        <Button
                          type="submit"
                          size={"md"}
                          colorScheme="blue"
                          mr={3}>
                          Edit Category
                        </Button>
                        <Button size={"md"} onClick={handleCloseModal}>
                          Cancel
                        </Button>
                      </form>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
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

export const InputCategory = () => {
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
    const jsonData = JSON.stringify(data);
    try {
      const response = await instance.post(
        "/categories",
        jsonData,
        {
          headers: {
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
        fetchCategories();
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

  React.useEffect(() => {
    setValue("name", "");
    setValue("description", "");
  }, [setValue]);

  return (
    <Box>
      <Button size="sm" onClick={handleOpenModal}>
        <FiPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Category Form</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name} mb={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                  />
                  <FormErrorMessage>Name harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description} mb={4}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    type="text"
                    id="description"
                    {...register("description", { required: true })}
                  />
                  <FormErrorMessage>Description harus diisi.</FormErrorMessage>
                </FormControl>

                <Button type="submit" size={"md"} colorScheme="blue" mr={3}>
                  Create Category
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

export default Categories;
