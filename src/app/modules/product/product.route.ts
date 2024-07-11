import express from 'express';

import { validateRequest } from '../../middleware/validateRequest';
import { productValidation } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(productValidation.productValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getProduct);

router.get('/:id', ProductControllers.getSingleProduct);


router.put(
  '/:id',
  validateRequest(productValidation.UpdateProductValidationSchema),
  ProductControllers.updateSingleProduct,
);

router.delete('/:id', ProductControllers.deleteSingleProduct);

export const productRoute = router;
