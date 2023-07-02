import React from "react";
import { Box, chakra, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO",
      imageSrc: "/path/to/image1.jpg",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Marketing Manager",
      imageSrc: "/path/to/image2.jpg",
      quote:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more testimonials as needed
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  return (
    <Box maxW="7xl" mx={"auto"} my={15} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>
        What they say about Stocktrackr
      </chakra.h1>
      <Flex align="center" justify="space-between">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          onClick={handlePrevious}
        />
        <Box mx={4}>
          <Image
            src={testimonial.imageSrc}
            alt={testimonial.name}
            boxSize={150}
            borderRadius="full"
          />
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next"
          onClick={handleNext}
        />
      </Flex>
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        {testimonial.name}
      </Text>
      <Text fontSize="md" fontWeight="medium" mt={2}>
        {testimonial.role}
      </Text>
      <Text mt={4}>{testimonial.quote}</Text>
    </Box>
  );
};

export default Testimonials;
