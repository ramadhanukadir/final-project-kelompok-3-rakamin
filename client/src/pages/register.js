import React from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Image,
  FormLabel,
  Link,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const register = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}>
            <Image
              src="/StocktrackrLogo-01.png"
              alt="logo"
              width={150}
              height={150}
              onClick={handleHome}
            />
            Scale Your Business with Stocktrackr
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Text fontWeight="bold" fontSize="2xl">
              Business inventory management made efficient.
            </Text>
          </Stack>
          <Text fontWeight="bold">
            Logistics can be challenging. Avoid missing out on valuable sales
            with Stocktrackr, a trusted fulfillment partner that can help you
            navigate complexities, so you can focus on growing your business.
            Our experts will help you find a solution that suits your business
            needs. Reach out today!
          </Text>
          <Text>
            <CheckCircleIcon />
            Logistics can be challenging. Avoid missing out on valuable sales
            with Stocktrackr, a trusted fulfillment partner that can help you
            navigate complexities, so you can focus on growing your business.
            Our experts will help you find a solution that suits your business
            needs. Reach out today!
          </Text>
          <Text>
            <CheckCircleIcon />
            Capture every revenue opportunity using historical sales data to
            forecast and replenish your stock when you need to.
          </Text>
          <Text>
            <CheckCircleIcon />
            Reduce stock mismanagement and gain inventory tracking and control
            over all selling platforms.
          </Text>
          <Text>
            <CheckCircleIcon />
            Maintain an accurate picture of stock levels at every stage of the
            inventory and order process.
          </Text>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}>
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
              Create an Account
            </Heading>
          </Stack>
          <Box as={"form"}>
            <Stack spacing={4}>
              <FormLabel>First Name</FormLabel>
              <Input type="text" />
              <FormLabel>Last Name</FormLabel>
              <Input type="text" />
              <FormLabel>Username</FormLabel>
              <Input type="text" />
              <FormLabel>Email</FormLabel>
              <Input type="email" />
              <FormLabel>Password</FormLabel>
              <Input type="password" />
              <Text>
                Have Account?{" "}
                <Link href="/login" fontWeight="bold">
                  {" "}
                  Sign in here
                </Link>
              </Text>
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bg={"blue.400"}
              color={"white"}>
              Create Account
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default register;
