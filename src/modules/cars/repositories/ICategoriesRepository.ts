import { Category } from '../model/Category';

interface ICreteCategoryDTO {
    name: string,
    description: string,
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreteCategoryDTO): void;
}

export { ICategoriesRepository, ICreteCategoryDTO };
