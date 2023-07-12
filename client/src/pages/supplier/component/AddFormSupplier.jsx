// import { useEffect, useState } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Box,
//   TableContainer,
//   IconButton,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { FiPlus, FiDelete, FiEdit, FiMove } from "react-icons/fi";
// import { instance } from "../../../modules/axios";
// import Link from "next/link";
// import { Link as ChakraLink } from "@chakra-ui/react";

// const SuppliersTable = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [telephone, setTelephone] = useState("");
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [currentSupplierId, setCurrentSupplierId] = useState("");
//   const [detail, setDetail] = useState({});
//   const {
//     isOpen: isModalOpen,
//     onOpen: openModal,
//     onClose: closeModal,
//   } = useDisclosure();
//   const {
//     isOpen: isUpdateModalOpen,
//     onOpen: openUpdateModal,
//     onClose: closeUpdateModal,
//   } = useDisclosure();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await instance.get("suppliers?page=1&limit=10");
//       const { dataSuppliers } = response.data;
//       setSuppliers(dataSuppliers);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     }
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const toggleUpdateModal = async (id) => {
//     const { data } = await instance.get(`suppliers/${id}`);
//     setDetail(data.dataSuppliers);

//     setName(data.dataSuppliers.name);
//     setAddress(data.dataSuppliers.address);
//     setTelephone(data.dataSuppliers.telephone);

//     setCurrentSupplierId(id);
//     openUpdateModal();
//   };

//   const toggleCancelModal = () => {
//     closeUpdateModal();
//     setName("");
//     setAddress("");
//     setTelephone("");
//   };

//   const handleCreate = async () => {
//     try {
//       const newSupplier = {
//         name: name,
//         address: address,
//         telephone: telephone,
//       };

//       const response = await instance.post("suppliers", newSupplier);
//       const createdSupplier = response.data;

//       setSuppliers([...suppliers, createdSupplier]);

//       closeModal();
//       fetchData();
//     } catch (error) {
//       console.error("Gagal membuat supplier:", error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedSupplier = {
//         name: name,
//         address: address,
//         telephone: telephone,
//       };
//       console.log(updatedSupplier);
//       await instance.put(`suppliers/${currentSupplierId}`, updatedSupplier);
//       closeUpdateModal();
//       fetchData();
//     } catch (error) {
//       console.error("Gagal memperbarui supplier:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await instance.delete(`suppliers/${id}`);
//       const updatedSuppliers = suppliers.filter(
//         (supplier) => supplier.id !== id
//       );
//       setSuppliers(updatedSuppliers);
//     } catch (error) {
//       console.error("Gagal menghapus supplier:", error);
//     }
//   };

//   return (
//     <>
//       <Box>
//         <Box
//           display={"flex"}
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           py={"10"}
//         >
//           <Text fontWeight={"bold"} fontSize={"xl"}>
//             Supplier
//           </Text>
//         </Box>
//         <Box display={"flex"} flexDirection={"row"} gap={"5"}>
//           <Button
//             size="sm"
//             bgColor={""}
//             leftIcon={<FiPlus />}
//             colorScheme="blue"
//             mb={10}
//             onClick={openModal}
//           >
//             Add Supplier
//           </Button>

//           <Modal isOpen={isModalOpen} onClose={closeModal}>
//             <ModalOverlay />
//             <ModalContent>
//               <Box display={"flex"} flexDirection={"row"} gap={"5"}>
//                 <ModalHeader>Tambah Supplier</ModalHeader>
//               </Box>
//               <ModalCloseButton />
//               <ModalBody>
//                 <FormControl>
//                   <FormLabel>Nama:</FormLabel>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl mt={4}>
//                   <FormLabel>Alamat:</FormLabel>
//                   <Input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl mt={4}>
//                   <FormLabel>Telepon:</FormLabel>
//                   <Input
//                     type="text"
//                     value={telephone}
//                     onChange={(e) => setTelephone(e.target.value)}
//                   />
//                 </FormControl>
//               </ModalBody>
//               <ModalFooter>
//                 <Button colorScheme="blue" mr={3} onClick={handleCreate}>
//                   Simpan
//                 </Button>
//                 <Button onClick={closeModal}>Batal</Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>

//           <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
//             <ModalOverlay />
//             <ModalContent>
//               <Box display={"flex"} flexDirection={"row"} gap={"5"}>
//                 <ModalHeader>Edit Supplier</ModalHeader>
//               </Box>
//               <ModalCloseButton />
//               <ModalBody>
//                 <FormControl>
//                   <FormLabel>Nama:</FormLabel>
//                   <Input
//                     type="text"
//                     // value={name}
//                     defaultValue={detail.name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl mt={4}>
//                   <FormLabel>Alamat:</FormLabel>
//                   <Input
//                     type="text"
//                     // value={address}
//                     defaultValue={detail.address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl mt={4}>
//                   <FormLabel>Telepon:</FormLabel>
//                   <Input
//                     type="text"
//                     // value={telephone}
//                     defaultValue={detail.telephone}
//                     onChange={(e) => setTelephone(e.target.value)}
//                   />
//                 </FormControl>
//               </ModalBody>
//               <ModalFooter>
//                 <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
//                   Update
//                 </Button>
//                 <Button onClick={toggleCancelModal}>Cancel</Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>
//         </Box>
//         <Box>
//           <Box>
//             <TableContainer>
//               <Table variant="simple">
//                 <Thead bg={"#DFF6FE"}>
//                   <Tr>
//                     <Th>ID</Th>
//                     <Th>Name</Th>
//                     <Th>Address</Th>
//                     <Th>Telephone</Th>
//                     <Th>Actions</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {suppliers.map((supplier) => (
//                     <Tr key={supplier.id}>
//                       <Td>{supplier.id}</Td>
//                       <Td>{supplier.name}</Td>
//                       <Td>{supplier.address}</Td>
//                       <Td>{supplier.telephone}</Td>
//                       <Td>

//                       <IconButton
//                           icon={<FiPlus />}
//                           onClick={openModal}
//                         />
//                         <IconButton
//                           icon={<FiEdit />}
//                           onClick={() => toggleUpdateModal(supplier.id)}
//                         />

//                         <IconButton
//                           icon={<FiDelete />}
//                           onClick={() => handleDelete(supplier.id)}
//                         />
//                         <Link href={'/dashboard'} passHref>
//                           <ChakraLink>
//                             <IconButton icon={<FiMove />} />
//                           </ChakraLink>
//                         </Link>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default SuppliersTable;
