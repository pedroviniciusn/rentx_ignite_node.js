import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '@config/upload';

import {
  ensureAuthenticated,
} from '../middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

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
  UploadCarImagesController,
} from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig);

const createCarController = new CreateCarController();
const createSpecificationController = new CreateCarSpecificationController();
const listAvailablesCarsController = new ListAvailablesCarsController();
const uploadCarImagesController = new UploadCarImagesController();

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
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
