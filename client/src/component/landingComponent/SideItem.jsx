import React from 'react';
import {
  Link,
  Flex,
  Icon,
  Text,
  useColorMode,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const SideItem = ({
  icon,
  title,
  active,
  navSize,
  to,
  onClick,
  activeColor,
}) => {
  return (
    // <Link >
    <HStack
      p={3}
      borderRadius={14}
      w={'100%'}
      href={to}
      onClick={onClick}
      cursor={'pointer'}
      backgroundColor={active ? activeColor : 'transparent'}
      color={active ? 'white' : '#06283D'}
      _hover={{
        bg: '#DFF6FF',
        color: '#06283D',
      }}
    >
      <Icon as={icon} fontSize='xl' />
      <Text ml={3}>{title}</Text>
    </HStack>
    // </Link>
  );
};

export default SideItem;
