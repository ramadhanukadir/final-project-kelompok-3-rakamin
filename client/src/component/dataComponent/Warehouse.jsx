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
} from '@chakra-ui/react';
import { getAllWarehouses } from '@/modules/fetch';
import { SearchIcon, EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export default function Warehouse() {
  const [warehouses, setWarehouse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [editData, setEditData] = useState(null); // State untuk data yang ingin diedit

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const fetchWarehouse = async () => {
      const warehouses = await getAllWarehouses();
      setWarehouse(warehouses);
    };
    fetchWarehouse();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://api.goapi.id/v1/regional/provinsi?api_key=xPYHpbKxZjKwZTMsBURTp8zDNnZtYB');
        setProvinces(response.data.data);
        // console.log(response.data.data);
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

  useEffect(() => {
    if (editData) {
      fetchCitiesByProvince(editData.province); // Mengambil data kota berdasarkan provinsi dari editData
    }
  }, [editData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (id) => {
    const dataToEdit = warehouses.find((warehouse) => warehouse.id === id);
    setEditData(dataToEdit);
    openModal();
    reset(dataToEdit); // Mengatur nilai awal form dengan data yang akan diedit
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
      if (editData) {
        // Jika ada editData, artinya kita sedang dalam mode edit
        // Kirim data yang akan diedit ke backend menggunakan axios atau metode penyimpanan data lainnya
        await instance.put(`/warehouses/${editData.id}`, data);
      } else {
        // Jika tidak ada editData, artinya kita sedang dalam mode tambah
        // Kirim data baru ke backend menggunakan axios atau metode penyimpanan data lainnya
        await instance.post('/warehouses', data);
      }

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
      setEditData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteWarehouse = async (warehouseId) => {
    try {
      // Kirim permintaan hapus data gudang ke backend menggunakan axios atau metode lainnya
      await instance.delete(`/warehouses/${warehouseId}`);

      // Dapatkan data gudang terbaru dari backend
      const fetchedWarehouses = await getAllWarehouses();
      setWarehouse(fetchedWarehouses);

      // Tampilkan popup info bahwa data telah dihapus
      setIsDeletePopupOpen(true);

      // Set timeout untuk menutup popup setelah beberapa detik
      setTimeout(() => {
        setIsDeletePopupOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} py={'10'}>
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
              <Input placeholder="Masukkan kata kunci" value="Search value" onChange={''} px={'8'} />
              <InputRightElement width="auto">
                <Button colorScheme="blue" onClick={''} leftIcon={<SearchIcon />}>
                  Cari
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <Box>
          <TableContainer>
            <Table variant="simple">
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
                {warehouses.map((warehouse) => (
                  <Tr key={warehouse.id}>
                    <Td>{warehouse.name}</Td>
                    <Td style={{ width: '400px', whiteSpace: 'normal' }}>{warehouse.address}</Td>
                    <Td>{warehouse.province}</Td>
                    <Td>{warehouse.city}</Td>
                    <Td>{warehouse.postalCode}</Td>
                    <Td>{warehouse.telephone}</Td>
                    <Td>
                      <Button colorScheme="yellow" onClick={() => handleDeleteItems(warehouse.id)} size={'sm'} ml={2} variant="outline">
                        <ViewIcon />
                      </Button>
                      <Button colorScheme="blue" onClick={() => handleEdit(warehouse.id)} size={'sm'} ml={2} variant="outline">
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
          <ModalHeader>Add Warehouse</ModalHeader>
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
                <Input type="number" {...register('postalCode')} />
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
    </Box>
  );
}
