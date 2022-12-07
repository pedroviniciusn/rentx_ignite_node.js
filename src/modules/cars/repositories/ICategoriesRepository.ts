import {
  ICreteCategoryDTO,
} from '@modules/cars/dtos/ICreateCategoryDTO';

import {
  Category,
} from '@modules/cars/entities/Category';

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreteCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };
