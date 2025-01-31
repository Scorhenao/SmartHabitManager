import {CreateHabitRequest} from '../request/CreateHabitRequest';
import {CreateHabitResponse} from '../response/CreateHabitResponse';

export interface HabitRepository {
  createHabit(data: CreateHabitRequest): Promise<CreateHabitResponse>;
  getAllHabits(): Promise<[]>;
}
