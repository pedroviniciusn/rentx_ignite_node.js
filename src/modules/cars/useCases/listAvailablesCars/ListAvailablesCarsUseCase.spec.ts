import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailablesCarsUseCase } from './ListAvailablesCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailablesCarsUseCase;

describe('List all cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailablesCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all availables cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-0000',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      name: car.name,
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-5555',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      brand: car.brand,
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-5555',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
