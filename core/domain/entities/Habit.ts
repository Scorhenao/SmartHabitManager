export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string; //HH MM YYYY
  createdAt: string;
}
