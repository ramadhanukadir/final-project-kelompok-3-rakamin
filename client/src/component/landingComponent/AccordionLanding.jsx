import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  chakra,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const AccordionLanding = () => {
  return (
    <Box maxW="7xl" mx={"auto"} my={15} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"3xl"}
        fontWeight={"bold"}
        p={10}>
        Frequently Asked Questions
      </chakra.h1>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              What is Inventory Management?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} bg={"blue.400"}>
            <Text>
              Inventory or stock management is the process that businesses use
              to track stock, orders, sales, and services. It's particularly
              important in industries such as manufacturing, retail, and some
              service businesses.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              What are the 4 types of Inventory Management?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} bg={"blue.400"}>
            <Text>The 4 types of inventory management are:</Text>
            <UnorderedList>
              <ListItem>
                Continuous Inventory Management: This type of system involves
                constantly monitoring inventory levels and ordering products as
                needed to maintain optimal stock levels. This system can help to
                minimize stockouts and excess inventory while ensuring that
                products are always available to customers.
              </ListItem>
              <ListItem>
                Periodic Inventory Management: This system involves manually
                counting inventory at set intervals, such as weekly, monthly, or
                quarterly, and adjusting inventory levels accordingly. This
                system can be less precise than continuous inventory management,
                but it can be simpler and more cost-effective for smaller
                businesses.
              </ListItem>
              <ListItem>
                Just-In-Time (JIT) Inventory Management: This system involves
                ordering products just in time for them to be used, rather than
                keeping large amounts of inventory on hand. JIT can help to
                reduce inventory holding costs and improve efficiency, but it
                can be risky if suppliers are not reliable or lead times are
                uncertain.
              </ListItem>
              <ListItem>
                ABC Analysis: This is a method of categorizing inventory into
                three groups based on their value to the business. "A" items are
                high-value products that account for a significant portion of
                revenue, "B" items are moderate-value products, and "C" items
                are low-value products. This system can help businesses
                prioritize their inventory management efforts and allocate
                resources more effectively.
              </ListItem>
            </UnorderedList>
            <Text>
              Each type of inventory management system has its advantages and
              disadvantages, and businesses may need to use a combination of
              these methods to optimize their inventory management strategies.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              What is Just-In-Time Management?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} bg={"blue.400"}>
            <Text>
              Just-In-Time (JIT) Inventory Management is a system that involves
              ordering products from suppliers as and when they are needed,
              rather than storing large amounts of stock onsite. The main
              advantage of JIT is a reduction in storage costs but it can lead
              to stock uncertainty if suppliers aren't reliable in fulfillment.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default AccordionLanding;
