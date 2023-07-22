import { DataContext } from '@/context/AllDataContext';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import React, { useContext } from 'react';

function SelectField({ register, name, label, errors, option, mapping, value, keyProp, variant }) {
  const { setItemsId } = useContext(DataContext);
  return (
    <FormControl key={keyProp} isInvalid={errors}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select size="sm" id={name} variant={variant ? variant : 'outline'} borderRadius={'md'} {...register}>
        <option value="" style={{ padding: '10px' }} selected disabled>
          {`Select ${name}`}
        </option>
        {mapping?.map((opt, index) => (
          <option key={value(opt)} value={value(opt)} onClick={() => setItemsId(parseInt(index))}>
            {option(opt)}
          </option>
        ))}
      </Select>
      <FormErrorMessage fontSize="10px" fontWeight="semibold" ml={1} mt={1}>
        {errors && errors.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default SelectField;
