import React, { useState, useEffect, useContext } from "react";
import { getAllItemsById } from "@/modules/fetch";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Stack,
  Heading,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Page({ itemsId }) {
  //console.log("INI NOMOR ITEMS", itemsId);
  const router = useRouter();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllItemsById(itemsId);
      setProduct(data);
    };
    fetchItems();
  }, []);
  //console.log("INI ITEMS", product);

  const mappedData = Object.keys(product).map((data) => {
    return product[data];
  });

  console.log("MAPPED DATA", mappedData);
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        my={"100"}
        mx={"100"}>
        {mappedData.map((item, index) => (
          <Card
            key={index}
            SKU={item.SKU}
            categories={item.categories}
            description={item.description}
            name={item.name}
            basePrice={item.basePrice}
            sellingPrice={item.sellingPrice}
            image={item.imageUrl}
          />
        ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { itemsId: id } };
}

function Card({
  SKU,
  categories,
  description,
  name,
  basePrice,
  sellingPrice,
  image,
}) {
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
        <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
          {SKU}
        </Text>
        <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
          {name}
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          {description}
        </Heading>
        <Stack direction={"row"} align={"center"}>
          <Text fontWeight={800} fontSize={"xl"}>
            {basePrice}
          </Text>
          <Text color={"gray.600"}>{sellingPrice}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
