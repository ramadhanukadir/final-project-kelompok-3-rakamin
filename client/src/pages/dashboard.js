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
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiBell,
} from "react-icons/fi";
import MyChart from "../component/dataComponent/chart/LineChart";
import ExpensesChart from "@/component/dataComponent/chart/expenses";
import { DataContext } from "@/context/AllDataContext";
import { formatter } from "@/modules/formatter";

export default function Dashboard() {
  const [display, changeDisplay] = useState("hide");
  const {userLogin} = useContext(DataContext);

  const {orderData} = useContext(DataContext);



  return (
    <Flex flexDir={["row", "row", "row"]} overflow="hidden" marginTop={50}>
      
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh">
        <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back,{" "}
          <Flex display="inline-flex" fontWeight="bold">
            {userLogin.first_name}
          </Flex>
        </Heading>
      
    
        <MyChart />
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Transactions
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              Apr 2021
            </Text>
          </Flex>
         
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th>Name of transaction</Th>
                  <Th>Quantity</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total Price</Th>
                </Tr>
              </Thead>
              
               <Tbody>
                {orderData.map((order) => (
                <>
                   {display == "show" && (
                    
                  <>
                <Tr key={order.orders_id}>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src={order.Item.image_url} />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          {order.Item.name}
                        </Heading>
                        <Text fontSize="sm" color="gray">
                        {new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>{order.quantity}</Td>
                  <Td isNumeric>                    
                  <Text fontWeight="bold" display="inline-table">
                     IDR
                    </Text>{formatter.format(order.Item.selling_price)}</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                     IDR
                    </Text>
                     {formatter.format(order.total_price)}
                    
                  </Td>
                </Tr>       
                  </>
                  )}
              </>
                  ))}
              </Tbody> 


            </Table>
          </Flex>
          <Flex align="center">
            <Divider />
            <IconButton
              icon={display == "show" ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => {
                if (display == "show") {
                  changeDisplay("none");
                } else {
                  changeDisplay("show");
                }
              }}
            />
            <Divider />
          </Flex>
        </Flex>
      </Flex>

      {/* Column 3 */}
      <Flex
        w={["100%", "100%", "30%"]}
        bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        // overflow="auto"
        minW={[null, null, "100px", "100px", "100px"]}>
        
        <Heading letterSpacing="tight">Orders</Heading>
        <ExpensesChart />
      
      </Flex>

     
      
    </Flex>
  );
}
