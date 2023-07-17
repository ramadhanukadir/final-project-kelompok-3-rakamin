import { updateUserLogin } from '@/api/fetch/auth';
import InputField from '@/component/InputField/InputField';
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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

function FormEditProfilePicture({ userLogin }) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // await updateUserLogin(data);
      alert('SUCCESS');
    } catch (error) {
      alert(error.message);
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
                      value={value?.fileName}
                      onChange={(event) => {
                        onChange(event.target.files[0]);
                      }}
                      type='file'
                      id='picture'
                      errors={errors.image}
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
