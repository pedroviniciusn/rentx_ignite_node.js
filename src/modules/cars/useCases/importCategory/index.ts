import { ImportCategoryCrontroller } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const importCategoryUseCase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryCrontroller(importCategoryUseCase);

export { importCategoryController };
