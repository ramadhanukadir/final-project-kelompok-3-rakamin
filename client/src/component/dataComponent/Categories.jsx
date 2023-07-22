import React, { useState, useEffect, useContext } from "react";
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
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  FormControl as FormErrorMessage,
  FormLabel as ChakraFormLabel,
  useToast,
  Icon,
  Skeleton,
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
import { DataContext } from "@/context/AllDataContext";
import InputField from "../InputField/InputField";
import SkeletonLoading from "@/component/SkeletonLoading";

const Categories = () => {
  const { categories, fetchCategories, isLoading } = useContext(DataContext);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [detailItems, setDetailItems] = useState({});
  const router = useRouter();
  console.log(isLoading);

  useEffect(() => {
    if (detailItems) {
      setValue("name", detailItems.name);
      setValue("description", detailItems.description);
    }
  }, [detailItems, isModalOpen]);

  const handleEdit = async (id) => {
    const foundProduct = await getCategoriesId(id);
    setDetailItems(foundProduct);
    if (foundProduct) {
      setEditItemId(id);
      setIsModalOpen(true);
    }
  };

  const handleDeleteItems = async (id) => {
    try {
      await deleteCategories(id);
      handleCloseModal(),
        toast({
          title: "Delete Product",
          description: "You have successfully deleted Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      fetchCategories();
    } catch (error) {
      toast({
        title: "Failed to delete product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await instance.put(`/categories/${editItemId}`, data);
      handleCloseModal();
      toast({
        title: "Update Product",
        description: "You have successfully updated Product.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      fetchCategories();
      reset();
    } catch (error) {
      toast({
        title: "Failed to update product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box maxW="7xl" mx={"auto"} pt={{ base: 2, sm: 12, md: 17 }} mt={"5em"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mb={"6em"}
          pb={"10"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Category
          </Text>
          <InputCategory fetchCategories={() => fetchCategories()} />
        </Box>
        <Box>
          <TableContainer overflowY={"auto"} h={"25em"} px={5}>
            <Table variant="simple">
              <Thead bg={"#06283D"}>
                <Tr>
                  <Th color={"#EEEDED"}>Name</Th>
                  <Th color={"#EEEDED"}>Description</Th>
                  <Th color={"#EEEDED"}>Action</Th>
                </Tr>
              </Thead>
              <Tbody bg={"#EEEDED"}>
                {isLoading ? (
                  <Tr>
                    <Td>
                      <Skeleton height="20px" width="80%" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="60%" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="40%" />
                    </Td>
                  </Tr>
                ) : (
                  categories?.map((c) => (
                    <Tr key={c.id}>
                      <Td
                        onClick={() => router.push(`/category/${c.id}`)}
                        cursor={"pointer"}
                        _hover={"black"}>
                        {c.name}
                      </Td>
                      <Tr>
                        <Td>{c.description}</Td>
                      </Tr>

                      <Td>
                        <Icon
                          color={"#06283D"}
                          onClick={() => handleEdit(c.id)}
                          as={FiEdit}
                          mr={3}
                          _hover={{
                            cursor: "pointer",
                            color: "#4F709C",
                          }}
                          title="Edit"
                        />
                        <Icon
                          color={"red"}
                          onClick={() => handleDeleteItems(c.id)}
                          as={FiDelete}
                          _hover={{
                            cursor: "pointer",
                            color: "#EF6262",
                          }}
                          title="Delete"
                        />
                      </Td>
                    </Tr>
                  ))
                )}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign="center">Edit Category</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                          label={"Category Name"}
                          name={"name"}
                          placeholder={"Insert name"}
                          register={register("name", {
                            required: "This is required",
                          })}
                          errors={errors.name}
                        />
                        <InputField
                          label={"Description"}
                          name={"description"}
                          placeholder={"Insert description"}
                          register={register("description", {
                            required: "This is required",
                          })}
                          errors={errors.description}
                        />
                        <Button
                          type="submit"
                          size={"md"}
                          colorScheme="blue"
                          isLoading={isSubmitting}
                          rounded={"full"}
                          w={"100%"}>
                          Update Category
                        </Button>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        size={"sm"}
                        colorScheme="red"
                        rounded={"full"}
                        fontWeight={"semibold"}
                        onClick={handleCloseModal}>
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

export const InputCategory = ({ fetchCategories }) => {
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
      const response = await instance.post("/categories", data);
      handleCloseModal(),
        toast({
          title: "Created Product",
          description: "You have successfully Created Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
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
        position: "top",
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
        size="sm"
        bgColor={"#06283D"}
        color={"#EEEDED"}
        leftIcon={<FiPlus />}
        onClick={handleOpenModal}
        borderRadius={"full"}
        boxShadow={"0px 0px 3px 0px #06283D"}
        _hover={{
          bg: "#164B60",
          color: "#EEEDED",
        }}>
        Add Category
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Category Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label={"Category Name"}
                name={"name"}
                placeholder={"Insert name"}
                register={register("name", { required: "This is required" })}
                errors={errors.name}
              />
              <InputField
                label={"Description"}
                name={"description"}
                placeholder={"Insert description"}
                register={register("description", {
                  required: "This is required",
                })}
                errors={errors.description}
              />
              <Button
                type="submit"
                size={"md"}
                colorScheme="blue"
                mt={3}
                rounded={"full"}
                w={"100%"}>
                Create Category
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="red"
              rounded={"full"}
              fontWeight={"semibold"}
              onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Categories;
