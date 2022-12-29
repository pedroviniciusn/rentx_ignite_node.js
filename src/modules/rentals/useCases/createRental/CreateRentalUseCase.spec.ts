import "reflect-metadata"

import { AppError } from '@shared/errors/AppError';

import dayjs from 'dayjs';

import {
  CreateRentalUseCase,
} from './CreateRentalUseCase'

import {
  RentalRepositoryInMemory,
} from '@modules/rentals/repositories/in-memory/RentalRepositoryInMemory';

import {
  DayjsDateProvider,
} from '@shared/container/providers/DateProviders/implementations/DayjsDateProvider';

import {
  CarsRepositoryInMemory,
} from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import {
  CreateCarUseCase,
} from '@modules/cars/useCases/createCar/CreateCarUseCase';

import {
  CreateUserUseCase,
} from '@modules/accounts/useCases/createUser/CreateUserUseCase';

import {
  UserRepositoryInMemory,
} from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let createCarUseCase: CreateCarUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('Should be able to create new rental', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create new rental if there is another open to the same user', async () => {
    await createUserUseCase.execute({
      name: 'user test',
      email: 'email@test.com',
      driverLicense: 'xxxxx',
      password: 'hello world',
    });

    const car = await createCarUseCase.execute({
      name: 'Car error',
      description: 'Description car error',
      daily_rate: 100,
      license_plate: 'ABC-1000',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    const user = await userRepositoryInMemory.findByEmail('email@test.com');

    await createRentalUseCase.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    
    await expect(
      createRentalUseCase.execute({
        user_id: user.id,
        car_id: '8318041',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('There is a rental in progress for user!'));
  });

  it('Should not be able to create new rental if there is another open to the same car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car error',
      description: 'Description car error',
      daily_rate: 100,
      license_plate: 'ABC-1000',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    
    await expect(
      createRentalUseCase.execute({
        user_id: '654321',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('Should not be able to create new rental with invalid return time', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car error',
      description: 'Description car error',
      daily_rate: 100,
      license_plate: 'ABC-1000',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
