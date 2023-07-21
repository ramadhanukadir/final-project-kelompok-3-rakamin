import { useContext, useState } from "react";
import { Box, Text, SimpleGrid, Icon, Stack, Flex } from "@chakra-ui/react";
import React from "react";
import { FiPackage, FiUser, FiUsers } from "react-icons/fi";
import { MdOutlineWarehouse } from "react-icons/md";
import { DataContext } from "@/context/AllDataContext";

const AllDataDashboard = () => {
  const { products } = useContext(DataContext);
  const { suppliers } = useContext(DataContext);
  const { customers } = useContext(DataContext);
  const { warehouses } = useContext(DataContext);

  console.log("INI DATA PRODUCT", products);
  console.log("INI DATA suppliers", suppliers);
  console.log("INI DATA CUSTOMERS", customers);
  console.log("INI DATA WAREHOUSES", warehouses);

  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      boxShadow={"2px 2px 10px 1px #DDE6ED"}
      border={"1px solid #DDE6ED"}
      borderRadius={"10px"}
      p="3%"
      marginTop={10}
      w="100%"
      h="auto">
      {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}> */}
      <Feature
        icon={<Icon as={FiPackage} w={10} h={10} color={"black"} />}
        title={"Product"}
        text={products?.data?.length}
      />
      <Feature
        icon={<Icon as={FiUser} w={10} h={10} color={"black"} />}
        title={"Suppliers"}
        text={"Lorem ipsum dolor sit amet"}
      />
      <Feature
        icon={<Icon as={FiUsers} w={10} h={10} color={"black"} />}
        title={"Customers"}
        text={customers?.dataCustomers?.length}
      />
      <Feature
        icon={<Icon as={MdOutlineWarehouse} w={10} h={10} color={"black"} />}
        title={"Warehouse"}
        text={warehouses.length}
      />
      {/* </SimpleGrid> */}
    </Flex>
  );
};

const Feature = ({ title, text, icon }) => {
  return (
    <Stack justifyContent={"flex"} alignItems={"center"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justifyContent={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default AllDataDashboard;
