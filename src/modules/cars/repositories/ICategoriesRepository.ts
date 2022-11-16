import { Category } from '../entities/Category';

interface ICreteCategoryDTO {
    name: string,
    description: string,
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreteCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreteCategoryDTO };
