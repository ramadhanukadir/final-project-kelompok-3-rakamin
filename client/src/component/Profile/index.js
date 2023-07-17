import { DataContext } from '@/context/AllDataContext';
import { Flex, HStack, Image, Text, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import FormEditProfile from './FormEditProfile';
import FormEditPassword from './FormEditPassword';
import FormEditProfilePicture from './FormEditProfilePicture';

function Profile() {
  const { userLogin } = useContext(DataContext);

  return (
    <HStack h={'inherit'} w={'full'} py={20}>
      <Flex w={'40%'} h={'inherit'} alignItems={'center'}>
        <Image src={userLogin?.image_url} w={'200px'} h={'200px'} mx={'auto'} />
      </Flex>
      <Flex
        w={'60%'}
        h={'inherit'}
        flexDirection={'column'}
        rowGap={2}
        justifyContent={'center'}
      >
        <Text fonstSize={'lg'} fontWeight={'semibold'} alignSelf={'center'}>
          Account
        </Text>
        <Flex flexDirection={'row'} columnGap={4}>
          <Flex flexDirection={'column'}>
            <Text>First Name</Text>
            <Text>Last Name</Text>
            <Text>Username</Text>
            <Text>Email</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text>{`: ${userLogin?.first_name}`}</Text>
            <Text> {`: ${userLogin?.last_name}`}</Text>
            <Text>{`: ${userLogin?.username}`}</Text>
            <Text>{`: ${userLogin?.email}`}</Text>
          </Flex>
        </Flex>
        <FormEditProfile />
        <FormEditPassword />
        <FormEditProfilePicture />
      </Flex>
    </HStack>
  );
}

export default Profile;
