import React from 'react';
import { Link, Flex, Icon, Text, useColorMode, Button } from '@chakra-ui/react';
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
  const router = useRouter();
  return (
    <Link
      p={3}
      borderRadius={8}
      w={navSize === 'large' && '100%'}
      href={to}
      onClick={onClick}
    >
      <Flex>
        <Icon as={icon} fontSize='xl' />
        <Text ml={5} display={navSize === 'small' ? 'none' : 'flex'}>
          {title}
        </Text>
      </Flex>
    </Link>
  );
};

export default SideItem;
