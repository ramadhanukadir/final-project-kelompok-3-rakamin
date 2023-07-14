import React, { useState, useEffect } from "react";
import {
  getCustomers,
  getCustomersById,
  editCustomersById,
  deleteCustomersById,
} from "@/api/fetch/customers";
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
} from "@chakra-ui/react";
import { FiPlus, FiDelete, FiEdit, FiMove } from "react-icons/fi";
import { instance } from "../../modules/axios/index";
import { useRouter } from "next/router";
import { useFieldArray, useForm, watch } from "react-hook-form";
import { fetchData } from "@/api/fetch/supplier";

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
      const response = await instance.get("customer");
      const { data } = response.data;
      setCustomers(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  //console.log(customers);

  useEffect(() => {
    if (detailItems) {
      setValue("users_id", detailItems.users_id);
      setValue("full_name", detailItems.full_name);
      setValue("address", detailItems.address);
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
        title: "Delete Product",
        description: "You have successfully Created Product.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
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
      await instance.put(`/customer/${editCustomersId}`, data);
      handleCloseModal();
      toast({
        title: "Updated Customer",
        description: "You have successfully Updated Customers.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
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
            Customers
          </Text>
          <InputCustomers />
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead bg={"#DFF6FE"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Users Id</Th>
                  <Th>Full Name</Th>
                  <Th>Address</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td
                      onClick={() => router.push(`/customers/${customer.id}`)}>
                      {customer.id}
                    </Td>
                    <Td>{customer.users_id}</Td>
                    <Td>{customer.full_name}</Td>
                    <Td>{customer.address}</Td>

                    <Td>
                      <IconButton
                        icon={<FiEdit />}
                        onClick={() => handleEdit(customer.id)}
                      />
                      <IconButton
                        icon={<FiDelete />}
                        onClick={() => handleDelete(customer.id)}
                      />
                    </Td>
                  </Tr>
                ))}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign="center">Edit Customers</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.users_id} mb={4}>
                          <FormLabel htmlFor="users_id">Users Id:</FormLabel>
                          <Input
                            type="number"
                            id="user_id"
                            {...register("users_id", { required: true })}
                          />
                          <FormErrorMessage>
                            UsersId Harus Di Isi
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.full_name} mb={4}>
                          <FormLabel htmlFor="full_name">Full Name</FormLabel>
                          <Input
                            type="text"
                            id="full_name"
                            {...register("full_name", { required: true })}
                          />
                          <FormErrorMessage>
                            FullName Harus Di isi
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.address} mb={4}>
                          <FormLabel htmlFor="address">Address</FormLabel>
                          <Input
                            type="text"
                            id="address"
                            {...register("address", { required: true })}
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

export const InputCustomers = () => {
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
      await instance.post("/customer", data);
      handleCloseModal(),
        toast({
          title: "Created Product",
          description: "You have successfully Created Product.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      fetchData();
      reset();
    } catch (error) {
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
    setValue("users_id", "");
    setValue("full_name", "");
    setValue("address", "");
  }, [setValue]);

  return (
    <Box>
      <Button size="sm" onClick={handleOpenModal}>
        <FiPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Stock Form</ModalHeader>
          <ModalBody>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.users_id} mb={4}>
                  <FormLabel htmlFor="users_id">Users Id:</FormLabel>
                  <Input
                    type="number"
                    id="user_id"
                    {...register("users_id", { required: true })}
                  />
                  <FormErrorMessage>UsersId Harus Di Isi</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.full_name} mb={4}>
                  <FormLabel htmlFor="full_name">Full Name</FormLabel>
                  <Input
                    type="text"
                    id="full_name"
                    {...register("full_name", { required: true })}
                  />
                  <FormErrorMessage>FullName Harus Di isi</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.address} mb={4}>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    type="text"
                    id="address"
                    {...register("address", { required: true })}
                  />
                  <FormErrorMessage>Description Harus Di isi</FormErrorMessage>
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

export default Customers;
