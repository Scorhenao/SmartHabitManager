import {CreateHabitRequest} from '../request/CreateHabitRequest';
import {DeleteHabitRequest} from '../request/DeleteHabitRequest';
import {CreateHabitResponse} from '../response/CreateHabitResponse';
import {DeleteHabitResponse} from '../response/DeleteHabitResponse';

export interface HabitRepository {
  createHabit(data: CreateHabitRequest): Promise<CreateHabitResponse>;
  getAllHabits(): Promise<[]>;
  deleteHabit(data: DeleteHabitRequest): Promise<DeleteHabitResponse>;
}
