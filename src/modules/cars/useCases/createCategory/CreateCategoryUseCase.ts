import { AppError } from '@errors/AppError';

import { inject, injectable } from 'tsyringe';

import {
  ICategoriesRepository,
} from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Categoria já está cadastrada');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
