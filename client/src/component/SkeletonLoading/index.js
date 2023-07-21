import React from "react";
import { Skeleton, Tr, Td } from "@chakra-ui/react";

const SkeletonLoading = () => {
  return (
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
      <Td>
        <Skeleton height="50px" width="50px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="120px" />
      </Td>
    </Tr>
  );
};

export default SkeletonLoading;
