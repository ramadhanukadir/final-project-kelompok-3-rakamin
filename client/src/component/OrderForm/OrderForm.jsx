import React, { useContext, useEffect } from 'react';
import SelectField from '../SelectField/SelectField';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { DataContext } from '@/context/AllDataContext';
import InputField from '../InputField/InputField';
import { useRouter } from 'next/router';
import { postOrders } from '@/api/fetch/orders';

function OrderForm() {
  const {
    customers,
    warehouses,
    orders,
    setWarehouseId,
    warehouseItems,
    isLogin,
    fetchOrders,
    itemsId,
  } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
    reset,
    resetField,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orders_items',
  });
  const toast = useToast();
  const router = useRouter();
  const id = watch('warehouses_id');
  useEffect(() => {
    setWarehouseId(parseInt(id));
    if (isLogin === false) {
      router.push('/login');
    }
  }, [id, itemsId]);
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await postOrders(data);
      toast({
        description: 'Success Order',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      reset();
      resetField();
      fetchOrders();
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} key={0}>
      <SelectField
        keyProp={1}
        name={'warehouse'}
        label={'Warehouse'}
        register={register('warehouses_id', {
          required: 'This is required',
        })}
        errors={errors.warehouses_id}
        mapping={warehouses}
        option={(opt) => opt.name}
        value={(opt) => opt.id}
      />
      <SelectField
        keyProp={2}
        name={'customer'}
        label={'Customers'}
        register={register('customers_id', {
          required: 'This is required',
        })}
        errors={errors.customers_id}
        mapping={customers}
        option={(opt) => opt.full_name}
        value={(opt) => opt.id}
      />
      {fields.map((field, index) => (
        <>
          <SelectField
            keyProp={field.id}
            label={`Order Item ${index + 1}`}
            register={register(`orders_items.${index}.items_id`, {
              required: true,
            })}
            errors={errors[`orders_items.${index}.items_id`]}
            name={`Items`}
            mapping={warehouseItems}
            option={(opt) => opt.items.name + ', Stock Available: ' + opt.stock}
            value={(opt) => opt.items.id}
          />
          <InputField
            keyProp={field.id}
            name={`orders_items.${index}.quantity`}
            label={'Quantity'}
            register={register(`orders_items.${index}.quantity`, {
              required: 'required',
            })}
            errors={errors[`orders_items.${index}.quantity`]}
            type={'number'}
            min={1}
            max={warehouseItems[itemsId].stock}
          />
          <Button
            type='submit'
            rounded={'lg'}
            size={'lg'}
            fontWeight={'Bold'}
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </>
      ))}

      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={{ base: 'column', sm: 'row' }}
      >
        {warehouseItems.length !== 0 && (
          <>
            <Button
              type='submit'
              rounded={'lg'}
              size={'lg'}
              fontWeight={'Bold'}
              px={20}
              colorScheme={'red'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.500' }}
              onClick={() => append({ items_id: '', quantity: '' })}
              isDisabled={fields.length === warehouseItems.length}
            >
              Add Product
            </Button>
            <Button
              type='submit'
              rounded={'lg'}
              size={'lg'}
              fontWeight={'Bold'}
              px={20}
              colorScheme={'red'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.500' }}
              isLoading={isSubmitting}
              isDisabled={fields.length === 0}
            >
              Add Order
            </Button>
          </>
        )}
      </Stack>
    </form>
  );
}

export default OrderForm;
