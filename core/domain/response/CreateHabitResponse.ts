export interface CreateHabitResponse {
  status: number;
  data: {
    id: string;
    name: string;
    description: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    reminderTime: string;
    createdAt: string;
  };
  message: string;
}
