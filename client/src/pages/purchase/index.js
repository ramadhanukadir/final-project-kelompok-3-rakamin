import React, { useContext } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { DataContext } from "@/context/AllDataContext";
import OrderForm from "@/component/OrderForm/OrderForm";
import OrderList from "@/component/OrderList/OrderList";
import Filter from "@/component/Filter";

const index = () => {
  const { orders, filterOrder, setFilterOrder } = useContext(DataContext);

  return (
    <VStack pt={20} zIndex={1}>
      <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Orders
        </Text>
        <OrderForm />
      </Flex>
      <Box w={"100%"} mt={14}>
        <Filter
          page={orders?.meta}
          model={orders}
          show={!orders}
          filter={filterOrder}
          handleNextPage={() => {
            setFilterOrder({ ...filterOrder, page: filterOrder.page + 1 });
          }}
          handlePrevPage={() => {
            setFilterOrder({ ...filterOrder, page: filterOrder.page - 1 });
          }}
          disableNextPage={filterOrder.page === orders?.meta?.totalPages}
          disablePrevPage={filterOrder.page === 1}
          handleLimit={(e) => {
            setFilterOrder({ ...filterOrder, limit: e.target.value });
          }}
          count={orders?.meta?.totalData}
        />
        <OrderList orders={orders.data} />
      </Box>
    </VStack>
  );
};

export default index;
