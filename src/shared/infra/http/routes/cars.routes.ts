import { Router } from 'express';

import {
  CreateCarController,
} from '@modules/cars/useCases/createCar/CreateCarController';

import {
  ListAvailablesCarsController,
} from '@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController';

import {
  CreateCarSpecificationController,
} from '@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController';

import {
  ensureAuthenticated,
} from '../middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createSpecificationController = new CreateCarSpecificationController();
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

carsRoutes.post(
  '/specifications/:id',
  createSpecificationController.handle,
);

export { carsRoutes };
