import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';
import authOptional from '../../middlewares/authOptional';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProductValidations.createProductSchema),
  ProductControllers.createOne,
);

router.get('/', ProductControllers.getAll);
router.get('/top-products', ProductControllers.getTopProducts);
router.get('/trending-products', ProductControllers.getTrendingProducts);
router.get('/similar-products/:id', ProductControllers.getSimilarProducts);
router.get('/:id', authOptional, ProductControllers.getOne);

router.patch(
  '/:id',
  validateRequest(ProductValidations.updateProductSchema),
  ProductControllers.updateOne,
);

router.delete('/:id', ProductControllers.deleteOne);

export const ProductRoutes = router;
