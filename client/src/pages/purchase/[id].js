import { getOrderById } from "@/api/fetch/orders";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({ orderId }) {
  const router = useRouter();
  // const { id } = router.query;
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(orderId);
      setOrder(data);
    };
    fetchOrder();
  }, []);

  return (
    <Flex
      w={"100%"}
      marginTop={20}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      zIndex={1}>
      <HStack>
        <Button size={"sm"} w={"3"} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
      </HStack>
      <Flex direction={"column"}>
        <Text fontSize="xl" fontWeight="bold">
          Order Detail
        </Text>
        <Flex direction={"row"} columnGap={"20px"}>
          <Flex direction={"column"}>
            <Text>Cutomer </Text>
            <Text>Warehouse </Text>
            <Text>Total Revenue </Text>
            <Text>Date </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text>: {order.customer}</Text>
            <Text>: {order.warehouse}</Text>
            <Text>
              :{" "}
              {order.totalRevenue?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
            <Text>: {order.date}</Text>
          </Flex>
        </Flex>
        <VStack mt={6}>
          <Text fontSize="md" fontWeight="bold">
            Detail Product
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
              {order?.items?.map((item) => (
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
                        {item.name}
                      </Text>
                      <HStack>
                        <Text fontSize={"sm"} fontWeight={"light"}>
                          {item.quantity}
                        </Text>
                        <Text fontSize={"sm"} fontWeight={"light"}>
                          x
                        </Text>
                        <Text fontSize={"sm"} fontWeight={"light"}>
                          {item.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                  <Flex flexDirection={"column"}>
                    <Text fontSize={"sm"} fontWeight={"light"}>
                      Total Price
                    </Text>
                    <Text fontSize={"md"} fontWeight={"bold"}>
                      {item.totalPrice.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </Text>
                  </Flex>
                </HStack>
              ))}
            </HStack>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return { props: { orderId: id } };
};
// export const getStaticPaths = async () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data } = await getOrderById(id);

//   const paths = data.map((order) => ({
//     params: { id: order.id.toString() },
//   }));
//   return {
//     paths: paths,
//     fallback: 'true',
//   };
// };

// export const getStaticProps = async (context) => {
//   try {
//     const { id } = context.params;
//     const { data } = await getOrderById(id);
//     return {
//       props: {
//         order: data,
//       },
//       revalidate: 10,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export async function getStaticProps() {
//   return {
//     props: {
//       name: 'John Doe',
//     },
//   };
// }
