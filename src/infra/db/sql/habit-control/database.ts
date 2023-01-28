import { DataTypes } from 'sequelize'
import { SqlHelper } from './../helpers/sql-helper'

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
  sqlHelper.defineTable('habit_week_days', {
    habit_id: DataTypes.INTEGER,
    week_day: DataTypes.INTEGER
  })
}

makeTables(dbHabit)
