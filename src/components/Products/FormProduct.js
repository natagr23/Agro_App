import React from 'react';
import { useForm } from 'react-hook-form';

export default function FormProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Product Name"
        {...register('Product Name', { required: true, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Product Description"
        {...register('Product Description', { required: true, maxLength: 100 })}
      />

      <input type="submit" />
    </form>
  );
}
