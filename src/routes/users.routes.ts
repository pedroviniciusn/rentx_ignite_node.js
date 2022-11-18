import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarCrontroller } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserCrotroller = new CreateUserController();
const updateUserAvatarCrontroller = new UpdateUserAvatarCrontroller();

usersRoutes.post('/', createUserCrotroller.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarCrontroller.handle,
);

export { usersRoutes };
