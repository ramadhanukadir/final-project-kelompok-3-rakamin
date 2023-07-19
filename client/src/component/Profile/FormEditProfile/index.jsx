import { updateUserLogin } from '@/api/auth';
import InputField from '@/component/InputField/InputField';
import { DataContext } from '@/context/AllDataContext';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function FormEditProfile() {
  const { userLogin, fetchUserLogin } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await updateUserLogin(data);
      toast({
        title: 'Successfully Edit Profile',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      onClose();
      fetchUserLogin();
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setValue('first_name', userLogin?.first_name);
    setValue('last_name', userLogin?.last_name);
    setValue('username', userLogin?.username);
    setValue('email', userLogin?.email);
  }, [onOpen]);

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name={'first_name'}
                label={'First Name'}
                register={register('first_name', { required: true })}
                errors={errors.first_name}
              />
              <InputField
                name={'last_name'}
                label={'Last Name'}
                register={register('last_name', { required: true })}
                errors={errors.last_name}
              />
              <InputField
                name={'username'}
                label={'Username'}
                register={register('username', { required: true })}
                errors={errors.username}
              />
              <InputField
                name={'email'}
                label={'Email'}
                register={register('email', { required: true })}
                errors={errors.email}
              />
              <Button
                type='submit'
                rounded={'full'}
                size={'md'}
                w={'full'}
                fontWeight={'Bold'}
                my={2}
                px={10}
                colorScheme={'red'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
                isLoading={isSubmitting}
              >
                Update
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormEditProfile;
