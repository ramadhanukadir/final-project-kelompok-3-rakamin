import React, { useState } from "react";
import { useRouter } from "next/router";
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
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiBarChart,
  FiLayout,
  FiCodesandbox,
  FiPackage,
  FiUser,
  FiSliders,
} from "react-icons/fi";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useSwipeable } from "react-swipeable";
import SideItem from "./SideItem";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const [activeItem, setActiveItem] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleSwipe = (eventData) => {
    if (eventData.deltaX > 100) {
      setIsOpen(true);
    } else if (eventData.deltaX < -100) {
      setIsOpen(false);
    }
  };

  const swipeableHandlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Box
      bg={useColorModeValue("#DFF6FE")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      h="full"
      pos="fixed"
      top="0"
      transition="left 0.3s"
      left={isOpen ? "0" : "-40"}
      zIndex={5}
      {...rest}
      {...swipeableHandlers}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src="/StocktrackrLogo-01.png"
          alt="logo"
          width={150}
          height={150}
        />
        <IconButton
          bg={"#1363DE"}
          aria-label="Toggle Sidebar"
          icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          onClick={() => setIsOpen(!isOpen)}
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        {...rest}>
        <SideItem
          navSize={""}
          icon={FiHome}
          title="Dashboard"
          active={activeItem === "/dashboard"}
          to="/dashboard"
          onClick={() => handleItemClick("dashboard")}
        />
        <SideItem
          icon={FiBarChart}
          title="Business Summary"
          active={activeItem === "/business"}
          to="/business"
          onClick={() => handleItemClick("business")}
        />
        <SideItem
          icon={FiLayout}
          title="Report"
          active={activeItem === "/report"}
          to="/report"
          onClick={() => handleItemClick("report")}
        />
        <SideItem
          icon={FiCodesandbox}
          title="Category"
          active={activeItem === "/category"}
          to="/category"
          onClick={() => handleItemClick("category")}
        />
        <SideItem
          icon={FiPackage}
          title="Selling"
          active={activeItem === "/selling"}
          to="/selling"
          onClick={() => handleItemClick("selling")}
        />
        <SideItem
          icon={FiUser}
          title="Purchase"
          active={activeItem === "/purchase"}
          to="/purchase"
          onClick={() => handleItemClick("purchase")}
        />
        <SideItem
          icon={FiUser}
          title="Product"
          active={activeItem === "/product"}
          to="/product"
          onClick={() => handleItemClick("product")}
        />
        <SideItem
          icon={FiUser}
          title="Supplier"
          active={activeItem === "/supplier"}
          to="/supplier"
          onClick={() => handleItemClick("supplier")}
        />
        <SideItem
          icon={FiSettings}
          title="Settings"
          active={activeItem === "/settings"}
          to="/settings"
          onClick={() => handleItemClick("settings")}
        />
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#1363DE")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SideBar;
