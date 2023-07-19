import React, { useState, useEffect } from 'react';
import { instance } from '@/modules/axios';
import axios from 'axios';
import {
  Button,
  Text,
  Box,
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Select,
  useToast,
  FormErrorMessage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { getAllWarehouses, getWarehouseId } from '@/modules/fetch';
import { SearchIcon, EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export default function Warehouse() {
  const [warehouses, setWarehouse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filterWarehouses = () => {
    if (searchInput.trim() === '') {
      // If search input is empty, show all warehouses
      setFilteredWarehouses(warehouses);
    } else {
      // Filter warehouses by checking if the warehouse name includes the search input
      const filtered = warehouses.filter((warehouse) => warehouse.name.toLowerCase().includes(searchInput.trim().toLowerCase()));
      setFilteredWarehouses(filtered);
    }
  };

  useEffect(() => {
    filterWarehouses();
  }, [searchInput, warehouses]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditWarehouse = async (warehouseId) => {
    try {
      const warehouse = await getWarehouseId(warehouseId);
      console.log(warehouse);

      // Pastikan properti "city" ada dalam objek "warehouse"
      if (warehouse.city) {
        // Set data gudang yang akan diedit ke dalam state
        setIsModalOpen(false);
        setSelectedWarehouse(warehouse);
        reset();
        setIsEditModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSubmit = async (data) => {
    try {
      // Validasi input
      if (!data.name || !data.address || !data.province || !data.city || !data.telephone) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validasi format nomor handphone
      const phoneRegex = /^[0-9]{10,12}$/;
      if (!phoneRegex.test(data.telephone)) {
        toast({
          title: 'Error',
          description: 'Please enter a valid phone number.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Kirim permintaan ke backend untuk memperbarui data gudang menggunakan axios atau metode lainnya
      // await updateWarehouses(selectedWarehouse.id), data;
      await instance.put(`warehouses/${selectedWarehouse.id}`, data);

      // Dapatkan data gudang terbaru dari backend
      const updatedWarehouses = await getAllWarehouses();
      setWarehouse(updatedWarehouses);

      // Tampilkan popup info bahwa data telah diperbarui
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Warehouse data has been updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form jika diperlukan
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouses = await getAllWarehouses();
      setWarehouse(warehouses);
    };
    fetchWarehouse();

    if (selectedWarehouse) {
      setValue('name', selectedWarehouse.name);
      setValue('address', selectedWarehouse.address);
      setValue('province', selectedWarehouse.province);
      setValue('city', selectedWarehouse.city);
      setValue('postal_code', selectedWarehouse.postalCode);
      setValue('telephone', selectedWarehouse.telephone);
    }
  }, [selectedWarehouse]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://api.goapi.id/v1/regional/provinsi?api_key=xPYHpbKxZjKwZTMsBURTp8zDNnZtYB');
        setProvinces(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchCitiesByProvince = async (selectedProvince) => {
    try {
      const response = await axios.get(`https://api.goapi.id/v1/regional/kota?api_key=xPYHpbKxZjKwZTMsBURTp8zDNnZtYB&provinsi_id=${selectedProvince}`);
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    reset();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      // Validasi input
      if (!data.name || !data.address || !data.province || !data.city || !data.telephone) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validasi format nomor handphone
      const phoneRegex = /^[0-9]{10,12}$/;
      if (!phoneRegex.test(data.telephone)) {
        toast({
          title: 'Error',
          description: 'Please enter a valid phone number.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Kirim data gudang ke backend
      await instance.post('/warehouses', data);

      // Dapatkan data gudang terbaru dari backend
      const fetchedWarehouses = await getAllWarehouses();
      setWarehouse(fetchedWarehouses);

      // Tampilkan popup info bahwa data telah disimpan
      setIsSavePopupOpen(true);

      // Set timeout untuk menutup popup setelah beberapa detik
      setTimeout(() => {
        setIsSavePopupOpen(false);
      }, 3000);

      // Reset form dan tutup modal
      reset();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteWarehouse = (warehouseId) => {
    setDeleteWarehouseId(warehouseId);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteWarehouse = async () => {
    try {
      // Kirim permintaan hapus data gudang ke backend menggunakan axios atau metode lainnya
      await instance.delete(`/warehouses/${deleteWarehouseId}`);

      // Dapatkan data gudang terbaru dari backend
      const fetchedWarehouses = await getAllWarehouses();
      setWarehouse(fetchedWarehouses);

      // Tampilkan popup info bahwa data telah dihapus
      setIsDeleteConfirmationOpen(false);
      // setIsSavePopupOpen(true);
      setIsDeletePopupOpen(true);

      // Set timeout untuk menutup popup setelah beberapa detik
      setTimeout(() => {
        setIsDeletePopupOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDeleteWarehouse = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} py={'10'} mt={10}>
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Warehouses
        </Text>
        <Box display={'flex'} flexDirection={'row'} gap={'5'}>
          <Button size="sm" bgColor={''} leftIcon={<FiPlus />} onClick={openModal}>
            Add Warehouse
          </Button>
        </Box>
      </Box>

      <Box>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={'row'} justifyContent={'start'} alignItems={'center'} gap={'10'} my={'5'}></Box>
          <Box display={'flex'} justifyContent={'end'} mb={2}>
            <InputGroup>
              <Input placeholder="Nama Gudang.." value={searchInput} onChange={handleSearchInputChange} px={'8'} />
              <InputRightElement width="auto">
                <Button colorScheme="blue" onClick={filterWarehouses} leftIcon={<SearchIcon />}>
                  Cari
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead bg={'#DFF6FE'}>
                <Tr>
                  <Th>Warehouse Name</Th>
                  <Th>Address</Th>
                  <Th>Province</Th>
                  <Th>City</Th>
                  <Th>Postal Code</Th>
                  <Th>Telephone</Th>
                  <Th>
                    <Center>Actions</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredWarehouses.map((warehouse) => (
                  <Tr key={warehouse.id}>
                    <Td>{warehouse.name}</Td>
                    <Td style={{ width: '400px', whiteSpace: 'normal' }}>{warehouse.address}</Td>
                    <Td>{warehouse.province}</Td>
                    {/* <Td>{warehouse.city.split('-')[1]}</Td> */}
                    <Td>{warehouse.city}</Td>
                    <Td>{warehouse.postalCode}</Td>
                    <Td>{warehouse.telephone}</Td>
                    <Td>
                      {/* <Button colorScheme="yellow" onClick={() => handleDeleteItems(warehouse.id)} size={'sm'} ml={2} variant="outline">
                        <ViewIcon />
                      </Button> */}
                      <Button colorScheme="blue" onClick={() => handleEditWarehouse(warehouse.id)} size={'sm'} ml={2} variant="outline">
                        <EditIcon />
                      </Button>
                      <Button colorScheme="red" onClick={() => handleDeleteWarehouse(warehouse.id)} size={'sm'} ml={2} variant="outline">
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add Warehouse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ChakraFormControl isInvalid={errors.name} isRequired>
                <ChakraFormLabel>Name</ChakraFormLabel>
                <Input {...register('name', { required: true })} />
                {errors.province && <FormErrorMessage>This field is required</FormErrorMessage>}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.address} isRequired>
                <ChakraFormLabel>Address</ChakraFormLabel>
                <Textarea {...register('address', { required: true })} />
                {errors.province && <FormErrorMessage>This field is required</FormErrorMessage>}
              </ChakraFormControl>
              <ChakraFormControl isInvalid={errors.province} isRequired>
                <ChakraFormLabel>Province</ChakraFormLabel>
                <Select id="province" {...register('province', { required: true })} onChange={(e) => fetchCitiesByProvince(e.target.selectedOptions[0].getAttribute('data-id'))}>
                  <option value="">-Select Province-</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.name} data-id={province.id}>
                      {province.name}
                    </option>
                  ))}
                </Select>
                {errors.province && <FormErrorMessage>This field is required</FormErrorMessage>}
              </ChakraFormControl>

              <ChakraFormControl isInvalid={errors.city} isRequired>
                <ChakraFormLabel>City</ChakraFormLabel>
                <Select id="city" {...register('city', { required: true })}>
                  <option value="">-Select City-</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                {errors.province && <FormErrorMessage>This field is required</FormErrorMessage>}
              </ChakraFormControl>

              <ChakraFormControl>
                <ChakraFormLabel>Postal Code</ChakraFormLabel>
                <Input type="number" {...register('postal_code')} />
              </ChakraFormControl>

              <ChakraFormControl isInvalid={errors.telephone} isRequired>
                <ChakraFormLabel>Telephone</ChakraFormLabel>
                <Input type="number" {...register('telephone', { required: true })} />
                {errors.province && <FormErrorMessage>This field is required</FormErrorMessage>}
              </ChakraFormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isSavePopupOpen && (
        <Box position="fixed" bottom={4} right={4} p={3} bg="green.500" color="white" borderRadius="md" zIndex={9999}>
          Data has been saved to the database.
        </Box>
      )}

      {isDeletePopupOpen && (
        <Box position="fixed" bottom={4} right={4} p={3} bg="red.700" color="white" borderRadius="md" zIndex={9999}>
          Data has been deleted.
        </Box>
      )}

      <AlertDialog isOpen={isDeleteConfirmationOpen} onClose={cancelDeleteWarehouse}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Warehouse
            </AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>Are you sure you want to delete this warehouse? This action is irreversible.</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={cancelDeleteWarehouse}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={confirmDeleteWarehouse}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Warehouse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <ChakraFormControl>
                <ChakraFormLabel>Name</ChakraFormLabel>
                <Input {...register('name')} />
              </ChakraFormControl>
              <ChakraFormControl>
                <ChakraFormLabel>Address</ChakraFormLabel>
                <Textarea {...register('address')} />
              </ChakraFormControl>
              <ChakraFormControl>
                <ChakraFormLabel>Province</ChakraFormLabel>
                <Select
                  id="province"
                  {...register('province', { required: true })}
                  onChange={(e) => {
                    fetchCitiesByProvince(e.target.selectedOptions[0].getAttribute('data-id'));
                  }}
                >
                  <option value="">-Select Province-</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.name} data-id={province.id}>
                      {province.name}
                    </option>
                  ))}
                </Select>
              </ChakraFormControl>
              <ChakraFormControl>
                <ChakraFormLabel>City</ChakraFormLabel>
                <Select id="city" {...register('city', { required: true })}>
                  <option value="">-Select City-</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
              </ChakraFormControl>
              <ChakraFormControl>
                <ChakraFormLabel>Postal Code</ChakraFormLabel>
                <Input {...register('postal_code')} />
              </ChakraFormControl>
              <ChakraFormControl>
                <ChakraFormLabel>Telephone</ChakraFormLabel>
                <Input {...register('telephone')} />
              </ChakraFormControl>

              <ModalFooter>
                <Button colorScheme="blue" type="submit">
                  Save Changes
                </Button>
                <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
