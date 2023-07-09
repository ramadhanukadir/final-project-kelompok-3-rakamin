import React, { useState, useEffect } from "react";
import { instance } from "@/modules/axios";
import {
  Box,
  Grid,
  Text,
  Button,
  Center,
  Heading,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import {
  getAllCategories,
  getAllWarehouses,
  getAllWarehouseStock,
  getAllSuppliers,
  getWarehouseId,
  deleteItems,
  updateItems,
} from "@/modules/fetch";

const Categories = () => {
  const [product, setProduct] = useState([]);
  const columns = useBreakpointValue({ base: 1, md: 3 });

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getAllCategories();
      setProduct(product);
    };
    fetchProduct();
  }, []);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}>
      <Box display={"flex"} flexDirection={"row"} my={"10"}>
        <Button colorScheme="blue">Create a new Category</Button>
      </Box>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"}>
          Category List
        </Text>
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
          {product?.data?.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.imageUrl}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

function Card({ name, description, image }) {
  return (
    <Box
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}>
      <Box
        rounded={"lg"}
        mt={-12}
        height={"230px"}
        pos={"relative"}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}>
        <Image
          rounded={"lg"}
          height={230}
          width={282}
          src={image}
          objectFit={"cover"}
        />
      </Box>
      <Stack pt={10} align={"center"}>
        <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          {name}
        </Heading>
        <Stack direction={"row"} align={"center"}>
          <Text fontWeight={"normal"} fontSize={"xl"}>
            {description}
          </Text>
        </Stack>
        <Stack direction={"row"} align={"center"}>
          <Button colorScheme="blue">Update</Button>
          <Button colorScheme="red">Delete</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Categories;
