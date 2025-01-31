import {useState, useEffect, useCallback} from 'react';
import {CreateHabitRequest} from './../../core/domain/request/CreateHabitRequest';
import {useCaseFactory} from '../../core/app/factory/useCaseFactory';

interface fetchHabitResponse {
  createAt: string;
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string;
}

export const useHabit = () => {
  const {habitUseCase} = useCaseFactory();
  const [habits, setHabits] = useState<fetchHabitResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const createHabit = useCallback(
    async (data: CreateHabitRequest) => {
      try {
        await habitUseCase.createHabit(data);
        await fetchHabits();
      } catch (err) {
        console.error('Error creating habit:', err);
        setError('Failed to create habit. Please try again later.');
      }
    },
    [habitUseCase, fetchHabits],
  );

  const fetchHabits = useCallback(async () => {
    try {
      const habitsData = await habitUseCase.getAllHabits();
      setHabits(habitsData);
    } catch (err) {
      console.error('Error fetching habits:', err);
      setError('Failed to fetch habits. Please try again later.');
    }
  }, [habitUseCase]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return {
    createHabit,
    habits,
    error,
  };
};
