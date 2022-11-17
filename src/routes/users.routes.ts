import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserCrotroller = new CreateUserController();

usersRoutes.post('/', createUserCrotroller.handle);

export { usersRoutes };
