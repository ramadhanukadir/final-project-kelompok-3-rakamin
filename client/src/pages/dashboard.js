import React, { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import MyChart from "@/component/dataComponent/chart/LineChart";
import ExpensesChart from "@/component/dataComponent/chart/expenses";
import { DataContext } from "@/context/AllDataContext";
import { formatter } from "@/modules/formatter";
import AllData from "@/component/dataComponent/chart/AllData";
import AllDataDashboard from "@/component/dataComponent/chart/AllData";

export default function Dashboard() {
  const [display, changeDisplay] = useState("hide");
  const { userLogin } = useContext(DataContext);

  const { orderData } = useContext(DataContext);

  return (
    <Flex flexDir="column" w="100%" marginTop={55}>
      <Heading
        fontWeight="normal"
        my={4}
        letterSpacing="tight"
        textAlign={"center"}>
        Welcome back,{" "}
        <Flex display="inline-flex" fontWeight="bold">
          {userLogin.first_name}
        </Flex>
      </Heading>
      <Flex
        flexDir={["row", "row", "row"]}
        overflow="hidden"
        w={"100%"}
        columnGap={4}>
        <Flex p="3%" flexDir="column" overflow="auto">
          <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Revenue History
          </Heading>
          <MyChart />
        </Flex>

        {/* Column 3 */}
        <Flex
          p="2%"
          flexDir="column"
          minW={[null, null, "100px", "100px", "100px"]}>
          <ExpensesChart />
        </Flex>
      </Flex>
      <AllDataDashboard />
    </Flex>
  );
}
