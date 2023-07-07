import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
} from '@chakra-ui/react';

function InputField({
  name,
  children,
  defaultValue,
  label,
  placeholder,
  register,
  type,
  errors,
  value,
  onChange,
}) {
  return (
    <FormControl mt={{ base: 3, sm: 4, md: 5, lg: 5 }} isInvalid={errors}>
      <FormLabel
        htmlFor={name}
        mt={2}
        mb={1}
        fontSize={{ base: 'md', sm: 'md', md: 'md', lg: 'lg' }}
        fontWeight={'normal'}
        color='#8c8c8c'
      >
        {label}
      </FormLabel>
      <InputGroup h={{ base: '8', sm: '9', md: 'auto', lg: 'auto' }} mb={1}>
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          variant='unstyled'
          outline='1px solid'
          outlineColor='gray.300'
          h='auto'
          borderRadius='lg'
          autoComplete='off'
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          fontSize={{ base: 'xs', sm: 'sm', md: 'sm', lg: 'md' }}
          _focus={{
            border: 'none',
            outline: '2px solid',
            outlineColor: '#1363DE',
          }}
          _invalid={{
            border: 'none',
            outline: '2px solid',
            outlineColor: '#df1111',
          }}
          paddingBlock={2}
          paddingInline={3}
          {...register}
        />
        {children}
      </InputGroup>
      <FormErrorMessage fontSize='10px' fontWeight='semibold' ml={1} mt={1}>
        {errors && errors.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default InputField;
