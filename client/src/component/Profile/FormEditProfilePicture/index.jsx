import { updateUserLogin } from '@/api/fetch/auth';
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
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';

function FormEditProfilePicture() {
  const { fetchUserLogin } = useContext(DataContext);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image_url', data.image_url);
      await updateUserLogin(formData);
      toast({
        title: 'Successfully Update Profile Picture',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUserLogin();
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Change Profile Picture</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name='image_url'
                rules={{ required: 'picture is required' }}
                render={({ field: { ref, value, onChange, ...field } }) => {
                  return (
                    <InputField
                      {...field}
                      label={'Picture'}
                      value={value?.fileName}
                      onChange={(event) => {
                        onChange(event.target.files[0]);
                      }}
                      type='file'
                      id='picture'
                      errors={errors.image_url}
                    />
                  );
                }}
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

export default FormEditProfilePicture;
