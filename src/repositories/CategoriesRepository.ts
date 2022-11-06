import { Category } from '../model/Category';

interface ICreteCategoryDTO {
    name: string,
    description: string,
}

class CategoriesRepository {
    private categories: Category[];

    constructor() {
      this.categories = [];
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
