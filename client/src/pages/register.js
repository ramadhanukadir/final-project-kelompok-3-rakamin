import React, { useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Image,
  FormLabel,
  Link,
  HStack,
  useToast,
  InputRightElement,
} from '@chakra-ui/react';
import { CheckCircleIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { handleRegister } from '@/api/auth';
import InputField from '@/component/InputField/InputField';

const register = () => {
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
      await handleRegister(data);
      toast({
        description: 'Successfully Register',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      router.push('/login');
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
    <Container
      as={SimpleGrid}
      maxW={'7xl'}
      columns={{ base: 1, md: 2 }}
      alignItems={'center'}
      h={'100vh'}
      gridColumnGap={5}
      py={{ base: 6, sm: 6, lg: 9, xl: 10 }}
      px={{ base: 5, sm: 5, lg: 7, xl: 8 }}
    >
      <Stack mx={'auto'} p={{ base: 2, sm: 2, md: 2 }} maxW={{ lg: 'lg' }}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: 'xl', sm: 'xl', md: '2xl', lg: '3xl' }}
        >
          <Image
            src='/StocktrackrLogo-01.png'
            alt='logo'
            width={'250px'}
            height={'80px'}
            onClick={handleHome}
            mb={6}
          />
          Scale Your Business with Stocktrackr
        </Heading>
        <Stack direction={'row'} spacing={2} align={'center'}>
          <Text fontWeight='bold' fontSize='xl'>
            Business inventory management made efficient.
          </Text>
        </Stack>
        <HStack>
          <CheckCircleIcon alignSelf={'start'} pt={1} />
          <Text>
            Logistics can be challenging. Avoid missing out on valuable sales
            with Stocktrackr, a trusted fulfillment partner that can help you
            navigate complexities, so you can focus on growing your business.
            Our experts will help you find a solution that suits your business
            needs. Reach out today!
          </Text>
        </HStack>
        <HStack>
          <CheckCircleIcon alignSelf={'start'} pt={1} />
          <Text>
            Capture every revenue opportunity using historical sales data to
            forecast and replenish your stock when you need to.
          </Text>
        </HStack>
        <HStack>
          <CheckCircleIcon alignSelf={'start'} pt={1} />
          <Text>
            Reduce stock mismanagement and gain inventory tracking and control
            over all selling platforms.
          </Text>
        </HStack>
        <HStack>
          <CheckCircleIcon alignSelf={'start'} pt={1} />
          <Text>
            Maintain an accurate picture of stock levels at every stage of the
            inventory and order process.
          </Text>
        </HStack>
      </Stack>
      <Stack
        bg={'gray.50'}
        rounded={'xl'}
        mx={'auto'}
        p={{ base: 4, sm: 6, md: 8 }}
        maxW={{ lg: 'lg' }}
      >
        <Heading
          color={'gray.800'}
          lineHeight={1.1}
          fontSize={{ base: 'lg', sm: 'lg', md: 'xl', lg: 'xl', xl: '2xl' }}
        >
          Create an Account
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack>
            <InputField
              type='text'
              name='firstName'
              label='First Name'
              placeholder='Insert First Name'
              register={register('first_name', {
                required: 'First Name is Required',
              })}
              errors={errors.first_name}
            />
            <InputField
              type='text'
              name='lastName'
              label='Last Name'
              placeholder='Insert Last Name'
              register={register('last_name', {
                required: 'Last Name is Required',
              })}
              errors={errors.last_name}
            />
          </HStack>
          <InputField
            type='text'
            name='userName'
            label='Username'
            placeholder='Insert Username'
            register={register('username', {
              required: 'Username is Required',
            })}
            errors={errors.username}
          />
          <InputField
            name='email'
            type='text'
            label='Email'
            placeholder='Insert your email'
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email is invalid',
              },
            })}
            errors={errors.email}
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
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputField>
          <Text>
            Have an Account?{' '}
            <Link href='/login' fontWeight='bold'>
              {' '}
              Sign in!
            </Link>
          </Text>
          <Button
            type='submit'
            rounded={'lg'}
            size={'md'}
            fontWeight={'Bold'}
            mt={5}
            px={10}
            w={'full'}
            bg={'blue.400'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default register;
