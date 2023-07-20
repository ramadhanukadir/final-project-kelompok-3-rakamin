import React, { useState, useEffect, useContext } from "react";
import { getAllItemsById } from "@/modules/fetch";
import { getAllWarehousesStock } from "@/api/warehouses";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Stack,
  Heading,
  Image,
  Button,
  useColorModeValue,
  Flex,
  HStack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ArrowBackIcon } from "@chakra-ui/icons";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page({ itemsId }) {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const flexDirection = useBreakpointValue({ base: "column", sm: "row" });

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await getAllItemsById(itemsId);
      setProduct(data);
    };
    fetchItems();
  }, []);
  console.log("INI ITEMS", product);

  return (
    <Flex
      w={"100%"}
      marginTop={100}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      zIndex={1}>
      <HStack display={"flex"} justifyContent={"space-between"}>
        <Button size={"sm"} w={"3"} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          PRODUCT
        </Text>
      </HStack>
      <Flex direction={"column"}>
        <Flex justifyContent={"center"} columnGap={"20px"}>
          <VStack mt={6}>
            <Text fontSize="md" fontWeight="bold">
              Detail Product
            </Text>
            <Flex
              alignContent={"center"}
              w={"100%"}
              py={{ base: 2, md: 4 }}
              px={{ base: 4, md: 8 }}
              border={"1px"}
              borderColor={"gray.300"}
              borderRadius={"lg"}>
              <HStack w={"100%"}>
                <HStack
                  display={"flex"}
                  justifyContent={"space-between"}
                  w={"100%"}>
                  <Flex
                    direction={flexDirection}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={4}>
                    <Box>
                      <Card
                        key={product.index}
                        SKU={product.SKU}
                        description={product.description}
                        name={product.name}
                        basePrice={product.basePrice}
                        sellingPrice={product.sellingPrice}
                        image={product.imageUrl}
                      />
                    </Box>
                    <Box>
                      <DetailProductChart product={product} />
                    </Box>
                  </Flex>
                </HStack>
              </HStack>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { itemsId: id } };
}

function Card({ SKU, description, name, basePrice, sellingPrice, image }) {
  return (
    <Box
      role={"group"}
      p={5}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}>
      <Box
        rounded={"lg"}
        mt={15}
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
          width={250}
          src={image}
          objectFit={"cover"}
        />
      </Box>
      <Stack pt={5} align={"center"}>
        <Text
          color={"black"}
          fontWeight={800}
          fontSize={"xl"}
          textTransform={"uppercase"}>
          {SKU}
        </Text>
        <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
          {name}
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          {description}
        </Heading>
        <Stack direction={"column"} align={"center"}>
          <Text>
            {basePrice?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </Text>
          <Text color={"gray.600"}>
            {sellingPrice?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

function DetailProductChart({ product }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllWarehousesStock();
      setStocks(data);
    };
    fetchItems();
  }, []);

  //console.log("INI ALL STOCK", stocks);

  const warehouseId = stocks.filter((stock) => stock.itemsId === product.id);
  const quantities = warehouseId.map((stock) => stock.stock);

  const randomColors = warehouseId.map(() => {
    const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
    const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation value between 70 and 100
    const lightness = Math.floor(Math.random() * 30) + 70; // Random lightness value between 70 and 100

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });

  const data = {
    labels: warehouseId.map((warehouseName) => warehouseName.warehouseName),
    datasets: [
      {
        data: quantities,
        backgroundColor: randomColors,
      },
    ],
  };

  return <Doughnut data={data} />;
}
