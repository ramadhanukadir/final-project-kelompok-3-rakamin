import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFieldArray, useForm, watch } from "react-hook-form";
import { DataContext } from "@/context/AllDataContext";
import SelectField from "@/component/SelectField/SelectField";
import InputField from "@/component/InputField/InputField";
import { postOrders } from "@/api/fetch/orders";

const index = () => {
  const { customers, warehouses, warehouseId, setWarehouseId, warehouseItems } =
    useContext(DataContext);
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
    name: "orders_items",
  });
  const toast = useToast();

  const id = watch("warehouses_id");
  console.log(id);

  useEffect(() => {
    setWarehouseId(parseInt(id));
  }, [id]);

  console.log(warehouseItems, "WAREHOUSE ITEMS");
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await postOrders(data);
      toast({
        description: "Success Order",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      reset();
      resetField();
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <div>
      <Box p={14} ml={10}>
        <form onSubmit={handleSubmit(onSubmit)} key={0}>
          <SelectField
            keyProp={1}
            name={"warehouse"}
            label={"Warehouse"}
            register={register("warehouses_id", {
              required: "This is required",
            })}
            errors={errors.warehouse}
            mapping={warehouses}
            option={(opt) => opt.name}
            value={(opt) => opt.id}
          />
          <SelectField
            keyProp={2}
            name={"customer"}
            label={"Customers"}
            register={register("customers_id", {
              required: "This is required",
            })}
            errors={errors.customer}
            mapping={customers}
            option={(opt) => opt.full_name}
            value={(opt) => opt.id}
          />
          {/* <FormControl>
            <FormLabel htmlFor='customer'>Customer</FormLabel>
            <Select
              size='sm'
              variant='filled'
              {...register('customers_id', {
                required: 'This is required',
              })}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                </option>
              ))}
            </Select>
          </FormControl> */}
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
                option={(opt) =>
                  opt.items.name + ", Stock Available: " + opt.stock
                }
                value={(opt) => opt.items.id}
              />
              <InputField
                keyProp={field.id}
                name={`orders_items.${index}.quantity`}
                label={"Quantity"}
                register={register(`orders_items.${index}.quantity`, {
                  required: "required",
                  min: 1,
                  max: warehouseItems[index].stock,
                })}
                errors={errors[`orders_items.${index}`]}
                type={"number"}
                min={1}
                max={warehouseItems[index].stock}
              />
              <Button
                type="submit"
                rounded={"lg"}
                size={"lg"}
                fontWeight={"Bold"}
                onClick={() => remove(index)}>
                Remove
              </Button>
            </>
          ))}

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}>
            <Button
              type="submit"
              rounded={"lg"}
              size={"lg"}
              fontWeight={"Bold"}
              px={20}
              colorScheme={"red"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              onClick={() => append({ items_id: "", quantity: "" })}
              isDisabled={fields.length === warehouseItems.length}>
              Add Product
            </Button>
            <Button
              type="submit"
              rounded={"lg"}
              size={"lg"}
              fontWeight={"Bold"}
              px={20}
              colorScheme={"red"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              isLoading={isSubmitting}>
              Add Order
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default index;

{
  /* <FormControl key={field.id}>
                <FormLabel htmlFor='customer'>Order Item {index + 1}</FormLabel>
                <Select
                  size='sm'
                  variant='filled'
                  {...register(`orders_items.${index}.items_id`, {
                    required: true,
                  })}
                >
                  {warehouseItems.map((c) => (
                    <option key={c.items.id} value={c.items.id}>
                      {c.items.name}, Stock={c.stock}
                    </option>
                  ))}
                </Select>
              </FormControl> */
}

// import React from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';

// const MyForm = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'orders_items',
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     // Perform further actions with the form data
//   };

//   return (
//     <form style={{ marginLeft: '550px' }} onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor='customers_id'>Customers ID</label>
//         <input
//           type='number'
//           id='customers_id'
//           {...register('customers_id', { required: true })}
//         />
//         {errors.customers_id && <span>This field is required</span>}
//       </div>
//       <div>
//         <label htmlFor='warehouses_id'>Warehouses ID</label>
//         <input
//           type='number'
//           id='warehouses_id'
//           {...register('warehouses_id', { required: true })}
//         />
//         {errors.warehouses_id && <span>This field is required</span>}
//       </div>
//       {fields.map((item, index) => (
//         <div key={item.id}>
//           <h3>Order Item {index + 1}</h3>
//           <div>
//             <label htmlFor={`orders_items[${index}].items_id`}>Items ID</label>
//             <input
//               type='number'
//               {...register(`orders_items[${index}].items_id`, {
//                 required: true,
//               })}
//             />
//             {errors.orders_items && errors.orders_items[index]?.items_id && (
//               <span>This field is required</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor={`orders_items[${index}].quantity`}>Quantity</label>
//             <input
//               type='number'
//               {...register(`orders_items[${index}].quantity`, {
//                 required: true,
//               })}
//             />
//             {errors.orders_items && errors.orders_items[index]?.quantity && (
//               <span>This field is required</span>
//             )}
//           </div>
//           <button type='button' onClick={() => remove(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button
//         type='button'
//         onClick={() => append({ items_id: '', quantity: '' })}
//       >
//         Add Item
//       </button>
//       <button type='submit'>Submit</button>
//     </form>
//   );
// };

// export default MyForm;
