import { Specification } from '../model/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[]

    constructor() {
      this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
      const specification = new Specification();
      Object.assign(specification, {
        name,
        description,
        createdAt: new Date(),
      });

      this.specifications.push(specification);
    }

    findByName(name: string): Specification {
      const categoryName = this.specifications.find((category) => category.name === name);
      return categoryName;
    }
}

export { SpecificationsRepository };
