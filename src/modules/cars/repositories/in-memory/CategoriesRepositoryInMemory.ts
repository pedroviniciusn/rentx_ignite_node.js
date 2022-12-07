import {
  ICreteCategoryDTO,
} from '@modules/cars/dtos/ICreateCategoryDTO';

import {
  Category,
} from '@modules/cars/entities/Category';

import {
  ICategoriesRepository,
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }

  async create({ name, description }: ICreteCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
