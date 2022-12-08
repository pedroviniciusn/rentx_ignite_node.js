import { getRepository, Repository } from 'typeorm';

import {
  Specification,
} from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
} from '@modules/cars/dtos/ICreateSpecificationDTO';

import {
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specificationName = await this.repository.findOne({ name });
    return specificationName;
  }
}

export { SpecificationsRepository };
