import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  FormErrorMessage,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Image2 from '../image/cloud-01.png';
import { useRouter } from 'next/router';
import { handleLogin } from '@/api/auth';
import InputField from '@/component/InputField/InputField';
import { DataContext } from '@/context/AllDataContext';

const login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  const handleHome = () => {
    router.push('/');
  };

  const onSubmit = async (data) => {
    try {
      await handleLogin(data);
      toast({
        description: 'Login Success',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  return (
    <Container maxW={'7xl'} height={'inherit'} py={{ base: 10, md: 8 }}>
      <Stack
        align={'center'}
        maxH={'full'}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} height={'inherit'}>
          <Image
            src='/StocktrackrLogo-01.png'
            alt='logo'
            width={150}
            height={150}
            onClick={handleHome}
          />
          <Heading
            lineHeight={1.1}
            fontWeight='bold'
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                position: 'absolute',
                bottom: 1,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Welcome Back !
            </Text>
            <Text fontSize='2xl'>Log in to Your Account</Text>
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name='usernameOrEmail'
              label='Username or Email'
              type='text'
              placeholder='Insert username or email'
              register={register('usernameOrEmail', {
                required: 'This is required',
              })}
              errors={errors.usernameOrEmail}
            />
            <InputField
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Insert password'
              register={register('password', {
                required: 'This is required',
              })}
              errors={errors.password}
            >
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputField>
            <HStack mb={2}>
              <Text>New here?</Text>
              <Text
                onClick={() => router.push('/register')}
                fontWeight='bold'
                cursor={'pointer'}
              >
                Create an Account!
              </Text>
            </HStack>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                type='submit'
                rounded={'lg'}
                size={'lg'}
                fontWeight={'Bold'}
                px={20}
                colorScheme={'red'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          width={'full'}
          height={'auto'}
        >
          <Box width={'full'}>
            <Image
              src={Image2}
              alt={'Hero Image'}
              fit={'cover'}
              w={'100%'}
              h={'auto'}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default login;
