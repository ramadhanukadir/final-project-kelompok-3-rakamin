import React from "react";
import {
  Box,
  chakra,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Image2 from "../../image/cloud-01.png";

const TableLanding = () => {
  const data = [
    {
      id: 1,
      name: "Durasi Pengerjaan",
      durasi: "Durasi pengerjaan",
      software: "Otomatis & minim risiko human error",
      icon: <CheckCircleIcon />,
    },
    {
      id: 2,
      name: "Aksesibilitas laporan",
      durasi: "Aksesibilitas laporan",
      software: "Mudah diakses dimana saja",
      icon: <CheckCircleIcon />,
    },
    {
      id: 3,
      name: "Pembukuan",
      durasi: "Pembukuan",
      software: "Rapi, terintegrasi & real-time",
      icon: <CheckCircleIcon />,
    },
    {
      id: 4,
      name: "Biaya dan Perawatan",
      durasi: "Biaya dan Perawatan",
      software: "Hemat biaya tanpa maintenance",
      icon: <CheckCircleIcon />,
    },
    {
      id: 5,
      name: "Operasional",
      durasi: "Operasional",
      software: "Bisa digunakan siapapun",
      icon: <CheckCircleIcon />,
    },
    {
      id: 6,
      name: "Kalkulasi",
      durasi: "Kalkulasi",
      software: "Perhitungan otomatis",
      icon: <CheckCircleIcon />,
    },
  ];

  return (
    <Box maxW="7xl" mx={"auto"} my={15} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>
        Why You Switch to Online Management?
      </chakra.h1>
      <chakra.h3
        textAlign={"center"}
        fontSize={"xl"}
        pb={10}
        fontWeight={"normal"}>
        Compare how to manage business finances conventionally by using the
        Stocktrackr software
      </chakra.h3>

      <TableContainer>
        <Table variant="striped" size="md">
          <Thead>
            <Tr>
              <Th>Proses</Th>
              <Th>Software akuntansi manual</Th>
              <Th>Software akuntansi online</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td fontWeight="bold">{item.name}</Td>
                <Td>{item.durasi}</Td>
                <Td>
                  {item.icon}
                  {item.software}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableLanding;
