import {HabitRepository} from './../../domain/repositories/HabitRepository';
import {CreateHabitRequest} from '../../domain/request/CreateHabitRequest';
import {CreateHabitResponse} from '../../domain/response/CreateHabitResponse';
import {DeleteHabitRequest} from '../../domain/request/DeleteHabitRequest';
import {DeleteHabitResponse} from '../../domain/response/DeleteHabitResponse';

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

  async deleteHabit(data: DeleteHabitRequest): Promise<DeleteHabitResponse> {
    return await this.repository.deleteHabit(data);
  }
}
