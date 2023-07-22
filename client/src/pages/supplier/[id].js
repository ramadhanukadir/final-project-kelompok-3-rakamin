import React, { useState, useEffect } from "react";
import { getSuppliersById } from "@/api/suppliers";
import { getAllSuppliersItems } from "@/api/suppliers-items";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  Stack,
  VStack,
  Heading,
  Grid,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Page({ supplierId }) {
  const [supplier, setSupplier] = useState({});
  const [supplierItems, setSupplierItems] = useState([]);
  const router = useRouter();
  const columns = useBreakpointValue({ base: 1, md: 3 });

  useEffect(() => {
    const fetchSupplier = async () => {
      const data = await getSuppliersById(supplierId);
      setSupplier(data);
    };
    fetchSupplier();
  }, []);
  console.log("INI SUPPLIERS", supplier);

  useEffect(() => {
    const fetchSupplierItems = async () => {
      try {
        const { data } = await getAllSuppliersItems();
        setSupplierItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSupplierItems();
  }, []);
  //console.log("INI SUPLLIERS ITEMS", supplierItems);

  const filteredItems = supplierItems.filter(
    (supplierItems) => supplierItems.suppliers_id === supplier.id
  );

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
          SUPPLIERS
        </Text>
      </HStack>
      <Flex direction={"column"}>
        <Flex direction={"column"} columnGap={"20px"}>
          <Text fontSize="xl" fontWeight="bold">
            Suppliers Detail
          </Text>
          <Flex direction={"row"} columnGap={"20px"}>
            <Flex direction={"column"}>
              <Text>Name </Text>
              <Text>Address </Text>
              <Text>Phone </Text>
            </Flex>
            <Flex direction={"column"}>
              <Text>: {supplier.name}</Text>
              <Text>: {supplier.address}</Text>
              <Text>: {supplier.telephone}</Text>
            </Flex>
          </Flex>

          <VStack mt={6}>
            <Text fontSize="md" fontWeight="bold">
              List of Product
            </Text>
            <Flex
              alignSelf={"flex-start"}
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
                  <Flex flexDirection={"row"} gap={4}>
                    <Box>
                      <Grid
                        templateColumns={`repeat(${columns}, 1fr)`}
                        gap={4}
                        w={"100%"}
                        justifyContent={"center"}>
                        {filteredItems?.map((item) => (
                          <Box
                            role={"group"}
                            p={5}
                            maxW={"330px"}
                            w={"full"}
                            bg={useColorModeValue("white", "gray.900")}
                            boxShadow={"2xl"}
                            rounded={"lg"}
                            pos={"relative"}
                            zIndex={1}
                            key={item.Item.id}>
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
                                backgroundImage: `url(${item.Item.image_url})`,
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
                                src={item.Item.image_url}
                                objectFit={"cover"}
                              />
                            </Box>
                            <Stack pt={10} align={"center"}>
                              <Text
                                color={"gray.500"}
                                fontSize={"sm"}
                                textTransform={"uppercase"}>
                                {item.Item.SKU}
                              </Text>
                              <Text
                                color={"gray.500"}
                                fontSize={"sm"}
                                textTransform={"uppercase"}>
                                {item.Item.name}
                              </Text>
                              <Heading
                                fontSize={"2xl"}
                                fontFamily={"body"}
                                fontWeight={500}>
                                {item.Item.description}
                              </Heading>
                              <Stack direction={"row"} align={"center"}>
                                <Text fontWeight={800} fontSize={"xl"}>
                                  {item.Item.base_price?.toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </Text>
                              </Stack>
                            </Stack>
                          </Box>
                        ))}
                      </Grid>
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

  return { props: { supplierId: id } };
}
