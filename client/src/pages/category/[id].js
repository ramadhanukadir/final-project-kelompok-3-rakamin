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
} from "@chakra-ui/react";

export default function Page({ categoryId }) {
  console.log("INI NOMOR CATEGORY", categoryId);
  const router = useRouter();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoriesId(categoryId);
      setCategory(data);
    };
    fetchCategory();
  }, []);
  console.log("INI CATEGORY", category);

  return (
    <Box>
      {" "}
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
