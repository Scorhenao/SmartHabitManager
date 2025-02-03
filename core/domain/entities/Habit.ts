import {BaseEntity} from './baseEntity';

export interface Habit extends BaseEntity {
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string; //HH MM
}
