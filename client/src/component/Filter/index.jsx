import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { BiSearchAlt2 } from 'react-icons/bi';
import { TbDatabase } from 'react-icons/tb';

function Filter({
  handleNextPage,
  handlePrevPage,
  disableNextPage,
  disablePrevPage,
  handleLimit,
  model,
  page,
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
        {filter.page} of {page?.totalPages} pages
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
        <Select
          h={'30px'}
          w={'70px'}
          onClick={handleLimit}
          variant={'outline'}
          borderColor={'#9DB2BF'}
          borderRadius={'full'}
        >
          <option value={filter.limit} selected disabled>
            {filter.limit}
          </option>
          <option value={5}>5</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </Select>
      </HStack>
      {model === show && (
        <InputGroup w={'25%'}>
          <Input
            size={'sm'}
            variant={'outline'}
            placeholder={placeholder}
            onChange={handleSearch}
            borderRadius={'full'}
            borderColor={'#9DB2BF'}
          />
          <InputRightElement boxSize={'32px'}>
            <BiSearchAlt2 />
          </InputRightElement>
        </InputGroup>
      )}
      <HStack justifySelf={'flex-end'}>
        <TbDatabase />
        <p>{count}</p>
      </HStack>
    </HStack>
  );
}

export default Filter;
