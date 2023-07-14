import React, { useState, useEffect, useContext } from "react";
import { getCustomersById } from "@/api/fetch/customers";
import { getAllOrders, getOrderById } from "@/api/fetch/orders";
import { instance } from "@/modules/axios";
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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Page({ customersId }) {
  const router = useRouter();
  const [customers, setCustomers] = useState({});
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await getCustomersById(customersId);
      setCustomers(data);
    };
    fetchCustomers();
  }, []);
  //console.log("INI CUSTOMER", customers);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await getAllOrders();
        //console.log("DATA ORDERS", data);

        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);
  // console.log("data order", order);

  const filteredOrders = order.filter(
    (order) => order.customer === customers.full_name
  );

  console.log("DATA FILTER", filteredOrders);

  return (
    <Flex
      w={"100%"}
      marginTop={100}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      zIndex={1}>
      <HStack>
        <Button size={"sm"} w={"3"} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
      </HStack>
      <Flex direction={"column"}>
        <Text>Customers</Text>
        <Flex direction={"column"} columnGap={"20px"}>
          <Flex direction={"column"}>
            <Text>Name {customers.full_name} </Text>
            <Text>Address: {customers.address}</Text>
          </Flex>
          <Flex direction={"column"}></Flex>
          <VStack mt={6}>
            <Text fontSize="md" fontWeight="bold">
              Detail Order
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
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        {order.customer}
                      </Text>
                      <HStack>
                        <Text fontSize={"sm"} fontWeight={"light"}>
                          {order.date}
                        </Text>
                        <Text fontSize={"sm"} fontWeight={"light"}>
                          {order.warehouse}
                        </Text>
                        <Text fontSize={"sm"} fontWeight={"light"}>
                          {order.totalRevenue}
                        </Text>
                      </HStack>
                      <HStack w={"100%"}>
                        {filteredOrders?.map((item) => (
                          <HStack
                            display={"flex"}
                            justifyContent={"space-between"}
                            w={"100%"}
                            key={item.id}
                            // pb={{ base: 2, md: 3 }}
                            // borderBottom={{ base: 'none', md: '1px' }}
                          >
                            <Flex flexDirection={"row"} gap={4}>
                              <Image
                                src={item.image}
                                aspectRatio={"1/1"}
                                w={12}
                                h={12}
                                objectFit={"center"}
                                borderRadius={"xl"}
                                // bg={'black'}
                              />
                              <Box>
                                <Text fontSize={"sm"} fontWeight={"semibold"}>
                                  {item.customer}
                                </Text>
                                <HStack>
                                  <Text fontSize={"sm"} fontWeight={"light"}>
                                    {item.date}
                                  </Text>
                                  <Text fontSize={"sm"} fontWeight={"light"}>
                                    {item.warehouse}
                                  </Text>
                                  <Text fontSize={"sm"} fontWeight={"light"}>
                                    {item.totalRevenue?.toLocaleString(
                                      "id-ID",
                                      {
                                        style: "currency",
                                        currency: "IDR",
                                      }
                                    )}
                                  </Text>
                                </HStack>
                              </Box>
                            </Flex>
                          </HStack>
                        ))}
                      </HStack>
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

  return { props: { customersId: id } };
}

function Card({ id, userId, name, address }) {
  return (
    <VStack>
      <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
        {id}
      </Text>
      <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
        {userId}
      </Text>
      <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
        {name}
      </Text>
      <Text fontSize={"sm"}>{address}</Text>
    </VStack>
  );
}
