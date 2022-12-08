import { inject, injectable } from 'tsyringe';

import {
  Category,
} from '@modules/cars/infra/typeorm/entities/Category';

import {
  ICategoriesRepository,
} from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };
