import { SqlHelper } from '../helpers/sql-connection'

export const dbHabit = new SqlHelper(
  'habits_control',
  'localhost',
  3306,
  'root',
  'password',
  { dialect: 'mysql' }
)
