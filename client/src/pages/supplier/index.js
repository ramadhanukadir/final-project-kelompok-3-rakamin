import React from "react";
import { Box, Text } from "@chakra-ui/react";

const index = () => {
  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <Text fontSize={"3xl"} justifyContent={"center"} alignItems={"center"}>
        Hello
      </Text>
    </Box>
  );
};

export default index;
