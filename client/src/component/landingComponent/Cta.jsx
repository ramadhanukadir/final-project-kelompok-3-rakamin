import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Text,
  ImageProps,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import Image from "next/image";
import Image2 from "../../image/image1.png";
import Image3 from "../../image/image2.png";

const Cta = () => {
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}>
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Manage and fulfill orders anytime, anywhere
            </chakra.h2>
            <Text colorScheme="green" size="md">
              Stay connected and get real-time updates on the order status,{" "}
              <br></br>no matter where you are.
            </Text>
            <Image
              src={Image2}
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              width={200}
              height={200}
            />
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <Image
              src={Image3}
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              width={300}
              height={300}
            />
          </VStack>
        </GridItem>
      </Grid>
      <Grid justifyContent="center" alignItems="center" marginTop={50}>
        <Text textAlign="center" fontWeight="bold" fontSize="3xl">
          Ready to Get Started?
        </Text>
        <Text>
          Uncover our products to enhance your supply chain planning and unlock
          your growth potential.
        </Text>
        <Button
          bg="#1363DE"
          color="white"
          width="150px"
          marginInline={"auto"}
          marginTop={3}>
          Start Demo/Trial
        </Button>
      </Grid>
      <Divider mt={12} />
    </Box>
  );
};

export default Cta;
