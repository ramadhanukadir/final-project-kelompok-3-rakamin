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
  Image,
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
  Select,
} from "@chakra-ui/react";
import { useFieldArray, useForm, watch } from "react-hook-form";
import {
  getAllCategories,
  getCategoriesId,
  updateCategories,
  deleteCategories,
} from "@/modules/fetch";
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
import { useRouter } from "next/router";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState([]);
  const toast = useToast();
  const columns = useBreakpointValue({ base: 1, md: 3 });
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
  const [editItemId, setEditItemId] = useState(null);
  const [detailItems, setDetailItems] = useState({});
  const router = useRouter();

  const fetchCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  useEffect(() => {
    if (detailItems) {
      setValue("name", detailItems.name);
      setValue("description", detailItems.description);
    }
    fetchCategories();
  }, [detailItems, isModalOpen]);
  // console.log(categories);

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

  // const handleGetById = async (id) => {
  //   const foundProduct = await getCategoriesId(id);
  //   setCategoriesId(foundProduct);

  //   if (foundProduct) {
  //     setGetById(id);
  //   }
  // };

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
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}>
      <Box display={"flex"} flexDirection={"row"} my={"10"}>
        <InputCategory />
      </Box>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>
          Category List
        </Text>

        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={"#DFF6FE"}>
                <Tr>
                  <Th>SKU</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories?.data?.map((item) => (
                  <Tr key={item.id}>
                    <Td
                      onClick={() => router.push(`/category/${item.id}`)}
                      cursor={"pointer"}
                      _hover={"black"}>
                      {item.name}
                    </Td>

                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleEdit(item.id)}
                        size={"md"}>
                        <FiPlus />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
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
                    <ModalHeader textAlign="center">Edit Product</ModalHeader>
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
      <Button size="sm" leftIcon={<FiPlus />} onClick={handleOpenModal}>
        Create Category
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Stock Form</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.categories_id} mb={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                  />
                  <FormErrorMessage>Name harus diisi.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name} mb={4}>
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

// function Card({ name, description, image }) {
//   return (
//     <Box
//       role={"group"}
//       p={6}
//       maxW={"330px"}
//       w={"full"}
//       bg={useColorModeValue("white", "gray.900")}
//       boxShadow={"2xl"}
//       rounded={"lg"}
//       pos={"relative"}
//       zIndex={1}>
//       <Box
//         rounded={"lg"}
//         mt={-12}
//         height={"230px"}
//         pos={"relative"}
//         _after={{
//           transition: "all .3s ease",
//           content: '""',
//           w: "full",
//           h: "full",
//           pos: "absolute",
//           top: 5,
//           left: 0,
//           backgroundImage: `url(${image})`,
//           filter: "blur(15px)",
//           zIndex: -1,
//         }}
//         _groupHover={{
//           _after: {
//             filter: "blur(20px)",
//           },
//         }}>
//         <Image
//           rounded={"lg"}
//           height={230}
//           width={282}
//           src={image}
//           objectFit={"cover"}
//         />
//       </Box>
//       <Stack pt={10} align={"center"}>
//         <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
//           {name}
//         </Heading>
//         <Stack direction={"row"} align={"center"}>
//           <Text fontWeight={"normal"} fontSize={"xl"}>
//             {description}
//           </Text>
//         </Stack>
//         <Stack direction={"row"} align={"center"}>
//           <Button colorScheme="blue">Update</Button>
//           <Button colorScheme="red">Delete</Button>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }

export default Categories;
