import React from "react";
import {
  Box,
  chakra,
  Grid,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Image2 from "../../image/cloud-01.png";

const TableLanding = () => {
  // const data = [
  //   {
  //     id: 1,
  //     icon: { PhoneIcon },
  //     title: "Cost and Time Efficiency",
  //     description:
  //       "No longer need to pay for conventional server needs and maintenance.",
  //     img: { Image2 },
  //   },
  //   {
  //     id: 2,
  //     icon: { AddIcon },
  //     title: "Up to date and real time data",
  //     description:
  //       "Get the latest cash flow information based on the last transaction.",
  //     img: { Image2 },
  //   },
  //   {
  //     id: 3,
  //     icon: { WarningIcon },
  //     title: "Support Business Growth",
  //     description:
  //       "Save on IT infrastructure costs with flexible cloud technology.",
  //     img: { Image2 },
  //   },
  //   {
  //     id: 4,
  //     icon: { CheckCircleIcon },
  //     title: "The best after sales service with live chat",
  //     description:
  //       "Contact the support team for implementation, to product training for FREE!",
  //     img: { Image2 },
  //   },
  // ];

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

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Proses</Th>
              <Th>Software akuntansi manual</Th>
              <Th>Software akuntansi online</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Durasi pengerjaan</Td>
              <Td>Durasi pengerjaan</Td>
              <Td>
                <CheckCircleIcon pr="2" />
                Otomatis & minim risiko human error
              </Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>0.91444</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>0.91444</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>0.91444</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableLanding;
