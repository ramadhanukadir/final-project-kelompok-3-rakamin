import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { TbDatabase } from 'react-icons/tb';

function Filter({
  handleNextPage,
  handlePrevPage,
  disableNextPage,
  disablePrevPage,
  handleLimit,
  model,
  show,
  filter,
  count,
  handleSearch,
  placeholder,
}) {
  return (
    <HStack mb={3}>
      <Button
        variant={'unstyled'}
        size={'xs'}
        px={3}
        py={'0px'}
        onClick={handlePrevPage}
        isDisabled={disablePrevPage}
      >
        <GrFormPrevious />
      </Button>
      <Text fontSize={'sm'}>
        {filter.page} of {model?.totalPages} pages
      </Text>
      <Button
        variant={'unstyled'}
        size={'xs'}
        px={3}
        py={'0px'}
        textAlign={'center'}
        _hover={{
          color: 'red',
        }}
        onClick={handleNextPage}
        isDisabled={disableNextPage}
      >
        <GrFormNext />
      </Button>
      <HStack>
        <Text fontSize={'sm'}>Rows per page</Text>
        <Select h={'30px'} w={'70px'} onClick={handleLimit} variant={'filled'}>
          <option value={filter.limit} selected disabled>
            {filter.limit}
          </option>
          <option value={5}>5</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </Select>
      </HStack>
      {model === show && (
        <Box>
          <form onSubmit={handleSearch}>
            <Input
              variant={'flushed'}
              placeholder={placeholder}
              onChange={handleSearch}
            />
          </form>
        </Box>
      )}
      <HStack justifySelf={'flex-end'}>
        <TbDatabase />
        <p>{count}</p>
      </HStack>
    </HStack>
  );
}

export default Filter;
