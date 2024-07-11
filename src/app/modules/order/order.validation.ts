import { z } from 'zod';

// Define the Zod schema for TpreRequisiteCourses
const product = z.object({
  product: z.string(),
  quantity: z.number(),
});

const orderValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phNumber: z.string(),
    address: z.string().min(1, 'Description is required'),
    products: z.array(product),
    payment: z.enum(['cashOnDelivery', 'stripe']),
  }),
});

export const orderValidation = {
  orderValidationSchema,
};
