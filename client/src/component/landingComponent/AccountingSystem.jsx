import React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  AiOutlineClockCircle,
  AiFillPieChart,
  AiOutlineDollarCircle,
} from "react-icons/ai";

const AccountingSystem = () => {
  const columns = useBreakpointValue({ base: 1, md: 2 });

  const data = [
    {
      id: 1,
      icon: <AiOutlineDollarCircle />,
      title: "Cost and Time Efficiency",
      description:
        "No longer need to pay for conventional server needs and maintenance.",
      image: "/image2.png",
    },
    {
      id: 2,
      icon: <AiOutlineClockCircle />,
      title: "Up to date and real time data",
      description:
        "Get the latest cash flow information based on the last transaction.",
      image: "/image5.png",
    },
    {
      id: 3,
      icon: <AiFillPieChart />,
      title: "Support Business Growth",
      description:
        "Save on IT infrastructure costs with flexible cloud technology.",
      image: "/image3.png",
    },
    {
      id: 4,
      icon: <AiOutlineClockCircle />,
      title: "The best after sales service with live chat",
      description:
        "Contact the support team for implementation, to product training for FREE!",
      image: "/image6.png",
    },
  ];

  return (
    <Box maxW="7xl" mx={"auto"} my={15} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>
        Benefits of Online Accounting System
      </chakra.h1>
      <chakra.h3
        textAlign={"center"}
        fontSize={"xl"}
        pb={10}
        fontWeight={"normal"}>
        Access data anytime anywhere online. No need to bother installing
        applications anymore. These are the advantages of using accounting
        software for your business.
      </chakra.h3>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
        {data.map((item) => (
          <Card
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </Grid>
    </Box>
  );
};

function Card({ icon, title, description, image }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
      borderWidth="1px"
      borderRadius="lg"
      p={4}>
      <Heading size="xl" mb={2}>
        {icon}
      </Heading>
      <Text fontSize="2xl" as="b">
        {title}
      </Text>
      <Text fontSize="xl" as="cit">
        {description}
      </Text>
      <Image src={image} alt={image} boxSize={200} width={300} height={100} />
    </Box>
  );
}

export default AccountingSystem;
