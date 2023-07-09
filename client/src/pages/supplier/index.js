import Suppliers from "@/pages/supplier/component/Suppliers";
import { Text, Box } from "@chakra-ui/react";
import React from "react";

const index = () => {
  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>


      <Suppliers/>
    </Box>
  )
};

export default index;
