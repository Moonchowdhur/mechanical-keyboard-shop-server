import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { orderValidation } from './order.validation';
import { orderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(orderValidation.orderValidationSchema),
  orderControllers.createOrder,
);

export const orderRoute = router;
