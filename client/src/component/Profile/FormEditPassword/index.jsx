import { updateUserLogin } from '@/api/auth';
import InputField from '@/component/InputField/InputField';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  InputRightElement,
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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function FormEditPassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');

  const onSubmit = async (data) => {
    try {
      if (newPassword === confirmNewPassword) delete data.confirmNewPassword;
      await updateUserLogin(data);
      console.log(data);
      toast({
        title: 'Successfully changed password',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      alert(error.message);
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Button
        rounded={'full'}
        size='md'
        bgColor={'#06283D'}
        color={'#EEEDED'}
        onClick={onOpen}
        _hover={{
          bg: '#164B60',
          color: '#EEEDED',
        }}
      >
        Change Password
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name={'oldPassword'}
                label={'Old Password'}
                type={showOldPassword ? 'text' : 'password'}
                register={register('oldPassword', {
                  required: 'This is required',
                })}
                errors={errors.oldPassword}
              >
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowOldPassword((prevState) => !prevState)
                    }
                  >
                    {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputField>
              <InputField
                name={'newPassword'}
                label={'New Password'}
                type={showNewPassword ? 'text' : 'password'}
                register={register('newPassword', {
                  required: 'This is required',
                })}
                errors={errors.newPassword}
              >
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowNewPassword((prevState) => !prevState)
                    }
                  >
                    {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputField>
              <InputField
                name={'confirmNewPassword'}
                label={'Confirm New Password'}
                type={showConfirmNewPassword ? 'text' : 'password'}
                register={register('confirmNewPassword', {
                  required: 'This is required',
                  validate: (value) =>
                    value === newPassword || 'Password must match',
                })}
                errors={errors.confirmNewPassword}
              >
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfirmNewPassword((prevState) => !prevState)
                    }
                  >
                    {showConfirmNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputField>
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

export default FormEditPassword;
