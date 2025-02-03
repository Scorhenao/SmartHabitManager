import {db} from '../../config/db';
import {
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import uuid from 'react-native-uuid';
import {HabitRepository} from '../../domain/repositories/HabitRepository';
import {CreateHabitResponse} from '../../domain/response/CreateHabitResponse';
import {CreateHabitRequest} from '../../domain/request/CreateHabitRequest';
import {DeleteHabitRequest} from '../../domain/request/DeleteHabitRequest';
import {DeleteHabitResponse} from '../../domain/response/DeleteHabitResponse';

export class HabitImplementation implements HabitRepository {
  private database!: SQLiteDatabase;

  init = this.initDatabase();

  private async initDatabase() {
    try {
      this.database = await db;
      this.database.transaction((tx: Transaction) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Habits (
              id TEXT PRIMARY KEY, 
              name VARCHAR NOT NULL, 
              description VARCHAR, 
              frequency INTEGER NOT NULL, 
              reminderTime DATETIME NOT NULL,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
        );
      });
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async createHabit(data: CreateHabitRequest): Promise<CreateHabitResponse> {
    const id: string = uuid.v4();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          'INSERT INTO Habits (id, name, description, frequency, reminderTime) VALUES (?, ?, ?, ?, ?)',
          [id, data.name, data.description, data.frequency, data.reminderTime],
          (_: Transaction) => {
            const response: CreateHabitResponse = {
              status: 201,
              data: {
                id,
                name: data.name,
                description: data.description,
                frequency: data.frequency,
                reminderTime: data.reminderTime,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              message: 'Habit created successfully!',
            };
            resolve(response);
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async getAllHabits(): Promise<[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          'SELECT * FROM Habits',
          [],
          (_: Transaction, {rows}: any) => {
            const habits = [];
            for (let i = 0; i < rows.length; i++) {
              habits.push(rows.item(i));
            }
            resolve(habits as []);
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }

  async deleteHabit(data: DeleteHabitRequest): Promise<DeleteHabitResponse> {
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          'DELETE FROM Habits WHERE id = ?',
          [data.id],
          (_: Transaction) => {
            const response: DeleteHabitResponse = {
              status: 200,
              message: 'Habit deleted successfully!',
            };
            resolve(response);
          },
          (_: Transaction, error: SQLError) => {
            reject(new Error(error.message));
            return false;
          },
        );
      });
    });
  }
}
