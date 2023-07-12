import React, { useState, useEffect } from "react";

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
  FormLabel,
  Input,
  Box,
  TableContainer,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus, FiDelete, FiEdit, FiMove } from "react-icons/fi";
import { instance } from "../../modules/axios/index";
import { fetchData } from "@/api/fetch/supplier/index.";

const index = () => {
  const [customers, setCustomers] = useState([]);
  const [fullName, setfullName] = useState("");
  const [address, setAddress] = useState("");

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const handleCreate = async () => {
    try {
      const newSupplier = {
        full_name: fullName,
        address: address,
        telephone: telephone,
      };

      const response = await instance.post("customer/", newSupplier);
      const createdCustomers = response.data;

      setSuppliers([...suppliers, createdCustomers]);

      closeModal();
      fetchData();
    } catch (error) {
      console.error("Gagal membuat supplier:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get("customer");
      const { data } = response.data;
      setCustomers(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };
  return (
    <>
      <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
        <Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            py={"10"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Customers
            </Text>
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
                      <Td>{customer.id}</Td>
                      <Td>{customer.users_id}</Td>
                      <Td>{customer.full_name}</Td>
                      <Td>{customer.address}</Td>

                      <Td>
                        <IconButton icon={<FiPlus />} />
                        <IconButton icon={<FiEdit />} />
                        <IconButton icon={<FiDelete />} />
                        {/* <Link onClick={"/"} passHref>
                          <ChakraLink>
                            <IconButton icon={<FiMove />} />
                          </ChakraLink>
                        </Link> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default index;
