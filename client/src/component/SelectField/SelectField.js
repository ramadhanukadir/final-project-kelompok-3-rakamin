import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import React from 'react';

function SelectField({
  register,
  name,
  label,
  errors,
  option,
  mapping,
  value,
  keyProp,
}) {
  return (
    <FormControl key={keyProp}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        size='sm'
        id={name}
        variant='filled'
        {...register}
        // onChange={(e) => onChange(e.target.value)}
      >
        <option value='' selected disabled>
          {`Select ${name}`}
        </option>
        {mapping.map((opt) => (
          <option key={value(opt)} value={value(opt)}>
            {option(opt)}
          </option>
        ))}
      </Select>
      <FormErrorMessage fontSize='10px' fontWeight='semibold' ml={1} mt={1}>
        {errors && errors.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default SelectField;
