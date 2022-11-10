import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryCrontroller } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryCrontroller(importCategoryUseCase);

export { importCategoryController };
