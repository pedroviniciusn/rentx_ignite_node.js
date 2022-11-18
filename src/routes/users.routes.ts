import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarCrontroller } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const createUserCrotroller = new CreateUserController();
const updateUserAvatarCrontroller = new UpdateUserAvatarCrontroller();

usersRoutes.post('/', createUserCrotroller.handle);
usersRoutes.patch('/avatar', updateUserAvatarCrontroller.handle);

export { usersRoutes };
