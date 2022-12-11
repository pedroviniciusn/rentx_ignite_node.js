import { Router } from 'express';

import {
  CreateCarController,
} from '@modules/cars/useCases/createCar/CreateCarController';

import {
  ListAvailablesCarsController,
} from '@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController';

import {
  ensureAuthenticated,
} from '../middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailablesCarsController = new ListAvailablesCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get(
  '/availables',
  listAvailablesCarsController.handle,
);

export { carsRoutes };
