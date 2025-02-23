import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import UserValidations from './user.valiation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.get(
  '/dashboard-stats',
  auth('admin', 'user'),
  UserControllers.getDashboardStats,
);

router.patch(
  '/:id',
  auth('admin', 'user'),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
