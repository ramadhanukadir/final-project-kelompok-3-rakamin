import React, { useState } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Image2 from "../image/cloud-01.png";
import { useRouter } from "next/router";

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/dashboard");
  };
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Image
            src="/StocktrackrLogo-01.png"
            alt="logo"
            width={150}
            height={150}
            onClick={handleHome}
          />
          <Heading
            lineHeight={1.1}
            fontWeight="bold"
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                position: "absolute",
                bottom: 1,
                bg: "blue.400",
                zIndex: -1,
              }}>
              Welcome Back !
            </Text>
            <Text fontSize="2xl">Log in to Your Account</Text>
          </Heading>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text>
              New here?{" "}
              <Link href="/register" fontWeight="bold">
                {" "}
                Create an Account!
              </Link>
            </Text>
          </FormControl>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}>
            <Button
              rounded={"lg"}
              size={"lg"}
              fontWeight={"Bold"}
              px={20}
              colorScheme={"red"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              onClick={handleLoginClick}>
              Login
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}>
          <Box
            position={"relative"}
            height={{ base: "300px", sm: "300px", lg: "500px" }}
            rounded={"2xl"}
            width={"full"}
            overflow={"hidden"}>
            <Image
              src={Image2}
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default login;
