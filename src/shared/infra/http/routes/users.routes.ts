/* eslint-disable import/order */
import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '@config/upload';

import {
  CreateUserController,
} from '@modules/accounts/useCases/createUser/CreateUserController';

import {
  UpdateUserAvatarCrontroller,
} from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import {
  ensureAuthenticated,
} from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserCrotroller = new CreateUserController();
const updateUserAvatarCrontroller = new UpdateUserAvatarCrontroller();
const profileUserController = new ProfileUserController();

usersRoutes.post(
  '/',
  createUserCrotroller.handle,
);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarCrontroller.handle,
);

usersRoutes.get(
  '/profile',
  ensureAuthenticated,
  profileUserController.handle
)

export { usersRoutes };
