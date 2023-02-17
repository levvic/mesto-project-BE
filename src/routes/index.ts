import { Router } from 'express';
import userRoutes from './user';
import cardRoutes from './card';

const router = Router();

router.use(userRoutes);
router.use(cardRoutes);

export default router;
