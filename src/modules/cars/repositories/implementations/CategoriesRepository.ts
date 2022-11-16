import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreteCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
      this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreteCategoryDTO): Promise<void> {
      const category = this.repository.create({
        name,
        description,
      });

      await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
      const categories = await this.repository.find();
      return categories;
    }

    async findByName(name: string): Promise<Category> {
      const categoryName = await this.repository.findOne({ name });
      return categoryName;
    }
}

export { CategoriesRepository };
