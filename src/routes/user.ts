import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateProfileInfo,
  updateAvatar,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/me', updateProfileInfo);
userRouter.patch('/users/me/avatar', updateAvatar);

export default userRouter;
