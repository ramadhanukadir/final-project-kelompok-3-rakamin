import React from "react";

import Product from "@/component/dataComponent/Product";
import { Box, VStack, Text } from "@chakra-ui/react";

const index = () => {
  // const [books, setBooks] = useState([]);
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const books = await getAllCategories();
  //     setBooks(books);
  //   };
  //   fetchBooks();
  // }, []);

  // console.log(books.data);

  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      {/* {books?.data?.map((book) => (
        <Product key={`${book.id}`} {...book} />
      ))} */}
      {/* {books?.data?.map((book) => {
        return (
          <Text
            key={book.id}
            textAlign={"center"}
            fontSize={"3xl"}
            fontWeight={"bold"}
            py={"5"}>
            {book.name}
          </Text>
        );
      })} */}
      <Product />
    </Box>
  );
};

export default index;
