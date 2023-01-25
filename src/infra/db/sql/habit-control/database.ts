import { DataTypes } from 'sequelize'
import { SqlHelper } from '../helpers/sql-connection'

export const dbHabit = new SqlHelper(
  'habits_control',
  'localhost',
  3306,
  'root',
  'password',
  { dialect: 'mysql' }
)

export const makeTables = (sqlHelper: SqlHelper): void => {
  sqlHelper.defineTable('habits', {
    title: DataTypes.STRING,
    created_at: DataTypes.STRING
  })
}

makeTables(dbHabit)
