import { Box, Text, Grid, useBreakpointValue, Image } from "@chakra-ui/react";

const dashboard = () => {
  const columns = useBreakpointValue({ base: 1, md: 3 });

  const data = [
    {
      id: 1,
      description: "Create sales invoice",
      image: "/create1.png",
    },
    {
      id: 2,
      description: "Create sales order",
      image: "/create2.png",
    },
    {
      id: 3,
      description: "Create purchase invoice",
      image: "/create3.png",
    },
    {
      id: 4,
      description: "View income statement",
      image: "/create4.png",
    },
    {
      id: 5,
      description: "Create expense records",
      image: "/create5.png",
    },
    {
      id: 6,
      description: "Add new product",
      image: "/create6.png",
    },
  ];

  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <Text textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"} py={"5"}>
        What Do You Want to Do?
      </Text>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
        {data.map((item) => (
          <Card
            key={item.id}
            description={item.description}
            image={item.image}
          />
        ))}
      </Grid>
    </Box>
  );
};

function Card({ description, image }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderWidth="1px"
      w={"full"}
      boxShadow={"xl"}
      rounded={"xl"}
      _hover={{
        bg: "blue.500",
      }}
      _focus={{
        bg: "blue.500",
      }}>
      <Image src={image} alt={image} boxSize={200} width={200} height={250} />
      <Text
        fontSize="xl"
        as="cit"
        fontWeight={"bold"}
        justifyContent={"center"}
        alignItems={"center"}>
        {description}
      </Text>
    </Box>
  );
}

export default dashboard;
