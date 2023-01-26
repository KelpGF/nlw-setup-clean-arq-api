import { ModelStatic } from 'sequelize'
import { SqlHelper } from '../../helpers/sql-helper'
import { makeTables } from '../database'
import { HabitSqlRepository } from './habit-sql-repository'

let sqlDB: SqlHelper
let habitTable: ModelStatic<any>

describe('Habit Sql Repository', () => {
  beforeAll(async () => {
    sqlDB = new SqlHelper(
      'habits_control_test',
      'localhost',
      3306,
      'root',
      'password',
      { dialect: 'mysql' }
    )
    makeTables(sqlDB)
  })

  beforeEach(async () => {
    habitTable = await sqlDB.getTable('habits')
    await habitTable.destroy({ where: {} })
  })

  afterAll(async () => {
    await sqlDB.disconnect()
  })

  test('Should return a habit on success', async () => {
    await habitTable.create({ id: 'any_habit_id', title: 'any_habit_title', created_at: '2023-01-01 01:01:01' })
    const sut = new HabitSqlRepository(sqlDB)
    const habit = await sut.findById('any_habit_id')
    expect(habit).toBeTruthy()
    expect(habit.id).toBeTruthy()
    expect(habit.title).toBe('any_habit_title')
  })
})
