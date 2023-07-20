import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  Icon,
} from '@chakra-ui/react';
import { FiPlus, FiDelete, FiEdit, FiMove } from 'react-icons/fi';
import { instance } from '@/modules/axios';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentSupplierId, setCurrentSupplierId] = useState('');
  const [detail, setDetail] = useState({});
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: openUpdateModal,
    onClose: closeUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();
  const [deleteSupplierId, setDeleteSupplierId] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get('suppliers?page=1&limit=10');
      const { dataSuppliers } = response.data;
      setSuppliers(dataSuppliers);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUpdateModal = async (id) => {
    const { data } = await instance.get(`suppliers/${id}`);
    setDetail(data.dataSuppliers);

    setName(data.dataSuppliers.name);
    setAddress(data.dataSuppliers.address);
    setTelephone(data.dataSuppliers.telephone);

    setCurrentSupplierId(id);
    openUpdateModal();
  };
  console.log(setDetail);

  const toggleCancelModal = () => {
    closeUpdateModal();
    setName('');
    setAddress('');
    setTelephone('');
  };

  const handleCreate = async () => {
    try {
      const newSupplier = {
        name: name,
        address: address,
        telephone: telephone,
      };

      const response = await instance.post('suppliers', newSupplier);
      const createdSupplier = response.data;

      setSuppliers([...suppliers, createdSupplier]);

      closeModal();
      fetchData();
    } catch (error) {
      console.error('Gagal membuat supplier:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedSupplier = {
        name: name,
        address: address,
        telephone: telephone,
      };
      console.log(updatedSupplier);
      await instance.put(`suppliers/${currentSupplierId}`, updatedSupplier);
      closeUpdateModal();
      fetchData();
    } catch (error) {
      console.error('Gagal memperbarui supplier:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`suppliers/${id}`);
      const updatedSuppliers = suppliers.filter(
        (supplier) => supplier.id !== id
      );
      setSuppliers(updatedSuppliers);
      closeDeleteModal();
    } catch (error) {
      console.error('Gagal menghapus supplier:', error);
    }
  };

  return (
    <Box marginTop={'5em'}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={'6em'}
        pb={'10'}
      >
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Supplier
        </Text>
        <Button
          size='sm'
          bgColor={'#06283D'}
          color={'#EEEDED'}
          leftIcon={<FiPlus />}
          onClick={openModal}
          borderRadius={'full'}
          boxShadow={'0px 0px 3px 0px #06283D'}
          _hover={{
            bg: '#164B60',
            color: '#EEEDED',
          }}
        >
          Add Product
        </Button>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={'5'}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <Box display={'flex'} flexDirection={'row'} gap={'5'}>
              <ModalHeader>Tambah Supplier</ModalHeader>
            </Box>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nama:</FormLabel>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Alamat:</FormLabel>
                <Input
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Telepon:</FormLabel>
                <Input
                  type='text'
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleCreate}>
                Simpan
              </Button>
              <Button onClick={closeModal}>Batal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
          <ModalOverlay />
          <ModalContent>
            <Box display={'flex'} flexDirection={'row'} gap={'5'}>
              <ModalHeader>Edit Supplier</ModalHeader>
            </Box>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nama:</FormLabel>
                <Input
                  type='text'
                  defaultValue={detail.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Alamat:</FormLabel>
                <Input
                  type='text'
                  defaultValue={detail.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Telepon:</FormLabel>
                <Input
                  type='text'
                  defaultValue={detail.telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button onClick={toggleCancelModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this supplier?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme='red'
                mr={3}
                onClick={() => handleDelete(deleteSupplierId)}
              >
                Delete
              </Button>
              <Button onClick={closeDeleteModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <TableContainer overflowY={'auto'} h={'25em'} px={5}>
        <Table variant='simple'>
          <Thead bg={'#06283D'}>
            <Tr>
              <Th color={'#EEEDED'}>Name</Th>
              <Th color={'#EEEDED'}>Address</Th>
              <Th color={'#EEEDED'}>Telephone</Th>
              <Th color={'#EEEDED'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody bg={'#EEEDED'}>
            {suppliers.map((supplier) => (
              <Tr key={supplier.id}>
                <Td
                  onClick={() => router.push(`/supplier/${supplier.id}`)}
                  cursor={'pointer'}
                >
                  {supplier.name}
                </Td>
                <Td>{supplier.address}</Td>
                <Td>{supplier.telephone}</Td>
                <Td>
                  <Icon
                    color={'#06283D'}
                    onClick={() => toggleUpdateModal(supplier.id)}
                    as={FiEdit}
                    mr={3}
                    _hover={{
                      cursor: 'pointer',
                      color: '#4F709C',
                    }}
                    title='Edit'
                  />
                  <Icon
                    color={'red'}
                    onClick={() => {
                      setDeleteSupplierId(supplier.id);
                      openDeleteModal();
                    }}
                    as={FiDelete}
                    _hover={{
                      cursor: 'pointer',
                      color: '#EF6262',
                    }}
                    title='Delete'
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Suppliers;
