import {HabitUseCase} from '../useCases/habitCase';
import {HabitRepository} from '../../domain/repositories/HabitRepository';
import {HabitImplementation} from '../../infrastructure/implementations/HabitImplementation';

export const useCaseFactory = () => {
  const habitRepository: HabitRepository = new HabitImplementation();
  const habitUseCase = new HabitUseCase(habitRepository);

  return {
    habitUseCase,
  };
};
