import { Category } from '../model/Category';
import { ICategoriesRepository, ICreteCategoryDTO } from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
      this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
      if (!CategoriesRepository.INSTANCE) {
        CategoriesRepository.INSTANCE = new CategoriesRepository();
      }

      return CategoriesRepository.INSTANCE;
    }

    create({ name, description }: ICreteCategoryDTO): void {
      const category = new Category();

      Object.assign(category, {
        name,
        description,
        createdAt: new Date(),
      });

      this.categories.push(category);
    }

    list(): Category[] {
      return this.categories;
    }

    findByName(name: string): Category {
      const categoryName = this.categories.find((category) => category.name === name);
      return categoryName;
    }
}

export { CategoriesRepository };
