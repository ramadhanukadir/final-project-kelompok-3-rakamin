import React, { useContext } from "react";
import { DataContext } from "@/context/AllDataContext";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

function OrderList({ orders }) {
  const { isLoading } = useContext(DataContext);
  const router = useRouter();
  return (
    <TableContainer overflowY={"auto"} h={"25em"} px={5}>
      <Table variant="simple">
        <TableCaption>Orders</TableCaption>
        <Thead bg={"#06283D"}>
          <Tr>
            <Th color={"#EEEDED"}>Date</Th>
            <Th color={"#EEEDED"}>Warehouse</Th>
            <Th color={"#EEEDED"}>Customer</Th>
            <Th color={"#EEEDED"}>Revenue</Th>
          </Tr>
        </Thead>
        <Tbody bg={"#EEEDED"}>
          {isLoading ? (
            <Tr>
              <Td>
                <Skeleton height="20px" width="80%" />
              </Td>
              <Td>
                <Skeleton height="20px" width="60%" />
              </Td>
              <Td>
                <Skeleton height="20px" width="40%" />
              </Td>
              <Td>
                <Skeleton height="20px" width="60%" />
              </Td>
            </Tr>
          ) : (
            orders?.map((order) => (
              <Tr
                key={order.id}
                w={"full"}
                cursor={"pointer"}
                onClick={() => router.push(`/purchase/${order.id}`)}
                _hover={{ bg: "gray.100" }}>
                <Td>{order.date}</Td>
                <Td>{order.warehouse}</Td>
                <Td>{order.customer}</Td>
                <Td>
                  {order.totalRevenue?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default OrderList;
