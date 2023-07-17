import React, { useState, useEffect, useContext } from "react";
import { getCategoriesId, getAllCategories } from "@/modules/fetch";
import { useRouter } from "next/router";
import { DataContext } from "@/context/AllDataContext";
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Image,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Page({ categoryId }) {
  const [category, setCategory] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoriesId(categoryId);
      setCategory(data);
    };
    fetchCategory();
  }, []);

  return (
    <Box
      margin={50}
      marginTop={100}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}>
      {" "}
      <Box display={"flex"} justifyContent={"start"} my={5}>
        <Button size={"sm"} w={"3"} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead bg={"#DFF6FE"}>
            <Tr>
              <Th>Categories Id</Th>
              <Th>SKU</Th>
              <Th>Base Price</Th>
              <Th>Selling Price</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {category?.items?.map((item) => (
              <Tr key={item.id}>
                <Td>{item.categoriesId}</Td>
                <Td>{item.SKU}</Td>
                <Td>{item.basePrice}</Td>
                <Td>{item.sellingPrice}</Td>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                <Image src={item.imageUrl} boxSize="50px" />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { categoryId: id } };
}
