import React from "react";
import { Box, Grid, Heading, Text, Image, chakra } from "@chakra-ui/react";
//import Image from "next/image";
import Image2 from "../../image/cloud-01.png";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

const AccountingSystem = () => {
  const data = [
    {
      id: 1,
      icon: <PhoneIcon />,
      title: "Cost and Time Efficiency",
      description:
        "No longer need to pay for conventional server needs and maintenance.",
      img: "/path/to/StocktrackrLogo-01.png",
    },
    {
      id: 2,
      icon: <AddIcon />,
      title: "Up to date and real time data",
      description:
        "Get the latest cash flow information based on the last transaction.",
      img: "/path/to/StocktrackrLogo-01.png",
    },
    {
      id: 3,
      icon: <WarningIcon />,
      title: "Support Business Growth",
      description:
        "Save on IT infrastructure costs with flexible cloud technology.",
      img: "/path/to/StocktrackrLogo-01.png",
    },
    {
      id: 4,
      icon: <CheckCircleIcon />,
      title: "The best after sales service with live chat",
      description:
        "Contact the support team for implementation, to product training for FREE!",
      img: "/path/to/StocktrackrLogo-01.png",
    },
  ];

  return (
    <Box maxW="7xl" mx={"auto"} my={10} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
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
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {data.map((card) => (
          <Box key={card.id}>
            <Card
              icon={card.icon}
              title={card.title}
              description={card.description}
              img={card.img}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

function Card({ icon, title, description, img }) {
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
      <Image src={img} alt={img} boxSize={200} />
    </Box>
  );
}

export default AccountingSystem;
