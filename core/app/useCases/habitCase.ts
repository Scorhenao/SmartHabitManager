import {HabitRepository} from './../../domain/repositories/HabitRepository';
import {CreateHabitRequest} from '../../domain/request/CreateHabitRequest';
import {CreateHabitResponse} from '../../domain/response/CreateHabitResponse';

export class HabitUseCase {
  private readonly repository: HabitRepository;

  constructor(repository: HabitRepository) {
    this.repository = repository;
  }

  async createHabit(data: CreateHabitRequest): Promise<CreateHabitResponse> {
    return await this.repository.createHabit(data);
  }

  async getAllHabits() {
    return await this.repository.getAllHabits();
  }
}
