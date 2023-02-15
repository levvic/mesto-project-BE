import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateProfileInfo,
  updateAvatar,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateProfileInfo);
userRouter.patch('/users/me/avatar', updateAvatar);

export default userRouter;
