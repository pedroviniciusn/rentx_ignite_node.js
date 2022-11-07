import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IResponse {
    name: string;
    description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IResponse): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Categoria já está cadastrada');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
