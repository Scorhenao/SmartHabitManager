import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase({
  name: 'Habits.db',
  location: 'default',
});
