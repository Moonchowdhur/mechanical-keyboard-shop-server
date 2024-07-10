import express from 'express';
import { productRoute } from '../modules/product/product.route';

const router = express.Router();

const modeuleRoutes = [
  {
    path: '/product',
    route: productRoute,
  },
];

// mapping---
modeuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
