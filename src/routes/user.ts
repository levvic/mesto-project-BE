import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateProfileInfo,
  updateAvatar,
  getAuthUserInfo,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.get('/users/me', getAuthUserInfo);
userRouter.patch('/users/me', updateProfileInfo);
userRouter.patch('/users/me/avatar', updateAvatar);

export default userRouter;
