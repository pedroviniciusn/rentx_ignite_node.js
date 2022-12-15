import { RentalRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;

describe('Create rental', () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  it('Should be able to create new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '000111',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '000111',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '000111',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: '000111',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '654321',
        car_id: '000111',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

})