import { Router } from 'express';

import multer from 'multer';

import {
  CreateCategoryController,
} from '@modules/cars/useCases/createCategory/CreateCategoryController';

import {
  ImportCategoryCrontroller,
} from '@modules/cars/useCases/importCategory/ImportCategoryController';

import {
  ListCategoryController,
} from '@modules/cars/useCases/listCategories/ListCategoryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryCrontroller();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get(
  '/',
  listCategoryController.handle,
);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle,
);

export { categoriesRoutes };
