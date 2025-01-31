export interface CreateHabitRequest {
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string;
}
