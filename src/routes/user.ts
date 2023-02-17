import { Router } from 'express';
import { userAvatarValidator, userIdValidator, userProfileValidator } from '../utils/validator';

import {
  getUsers,
  getUserById,
  updateProfileInfo,
  updateAvatar,
  getAuthUserInfo,
} from '../controllers/user';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', userIdValidator, getUserById);
userRouter.get('/users/me', getAuthUserInfo);
userRouter.patch('/users/me', userProfileValidator, updateProfileInfo);
userRouter.patch('/users/me/avatar', userAvatarValidator, updateAvatar);

export default userRouter;
