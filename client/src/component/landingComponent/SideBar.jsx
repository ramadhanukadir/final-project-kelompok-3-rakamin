import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  IconButton,
  Avatar,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiBell, FiChevronDown, FiBarChart, FiLayout, FiCodesandbox, FiPackage, FiUser, FiSliders } from 'react-icons/fi';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useSwipeable } from 'react-swipeable';
import SideItem from './SideItem';
import { DataContext } from '@/context/AllDataContext';
const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { userLogin, setIsLogin } = useContext(DataContext);
  console.log('name', userLogin);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
    setIsLogin(false);
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} flexBasis={{ base: '0px', md: '230px', lg: '230px', xl: '230px' }}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="80%">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav user={userLogin} onOpen={onOpen} handleLogout={handleLogout} />
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Box bg={useColorModeValue('white')} boxShadow={'md'} w={{ base: 'full', md: 60 }} h="full" position="fixed" top="0" transition="left 0.3s" left={'0'} zIndex={6} {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src="/StocktrackrLogo-01.png" alt="logo" width={'130px'} height={'35px'} />
      </Flex>
      <VStack
        // display={'flex'}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={5}
        px={5}
        gap={2}
        {...rest}
      >
        <SideItem
          navSize={''}
          icon={FiHome}
          title="Dashboard"
          active={activeItem === 'dashboard'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('dashboard'), router.push('/dashboard');
          }}
        />
        <SideItem
          icon={FiCodesandbox}
          title="Category"
          active={activeItem === 'category'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('category'), router.push('/category');
          }}
        />
        <SideItem
          icon={FiUser}
          title="Purchase"
          active={activeItem === 'purchase'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('purchase'), router.push('/purchase');
          }}
        />
        <SideItem
          icon={FiUser}
          title="Product"
          active={activeItem === 'product'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('product'), router.push('/product');
          }}
        />
        <SideItem
          icon={FiUser}
          title="Supplier"
          active={activeItem === 'supplier'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('supplier'), router.push('/supplier');
          }}
        />
        <SideItem
          icon={FiUser}
          title="Customers"
          active={activeItem === 'customers'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('customers'), router.push('/customers');
          }}
        />
        <SideItem
          icon={FiUser}
          title="Warehouse"
          active={activeItem === 'warehouse'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('warehouse'), router.push('/warehouse');
          }}
        />
        <SideItem
          icon={FiUser}
          title="Warehouses"
          active={activeItem === 'warehouses'}
          activeColor={'#1363DF'}
          onClick={() => {
            handleItemClick('warehouses'), router.push('/warehouse');
          }}
        />
      </VStack>
    </Box>
  );
};

const MobileNav = ({ user, handleLogout, onOpen, ...rest }) => {
  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      as={'nav'}
      position={'fixed'}
      top={0}
      w={'full'}
      height="60px"
      px={{ base: 4, md: 4 }}
      alignItems="center"
      bg={'white'}
      // boxShadow={'md'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      zIndex={5}
      {...rest}
    >
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} src={user?.image_url} />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">{`${user?.first_name}  ${user?.last_name}`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    @{user?.username}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')} zIndex={'10'}>
              <MenuItem zIndex={'10'}>Profile</MenuItem>
              <MenuItem zIndex={'10'}>Settings</MenuItem>
              <MenuItem zIndex={'10'}>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout} zIndex={'10'}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SideBar;
