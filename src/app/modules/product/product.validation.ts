import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    image: z.string().url(),
    title: z.string().min(1, 'Title is required'),
    brand: z.string().min(1, 'Brand is required'),
    quantity: z.number().min(0, 'Quantity must be a positive number'),
    price: z.number().min(0, 'Price must be a positive number'),
    rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
    description: z.string().min(1, 'Description is required'),
  }),
});

const UpdateProductValidationSchema = z.object({
  body: z.object({
    image: z.string().url().optional(),
    title: z.string().min(1, 'Title is required').optional(),
    brand: z.string().min(1, 'Brand is required').optional(),
    quantity: z
      .number()
      .min(0, 'Quantity must be a positive number')
      .optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    rating: z
      .number()
      .min(0)
      .max(5, 'Rating must be between 0 and 5')
      .optional(),
    description: z.string().min(1, 'Description is required').optional(),
  }),
});

export const productValidation = {
  productValidationSchema,
  UpdateProductValidationSchema,
};
