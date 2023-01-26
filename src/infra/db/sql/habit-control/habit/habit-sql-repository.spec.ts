import { ModelStatic } from 'sequelize'
import { SqlHelper } from '@/infra/db/sql/helpers/sql-helper'
import { makeTables } from '../database'
import { HabitSqlRepository } from './habit-sql-repository'
import { mockCreateHabitParams } from '@/domain/tests/mock-habit'

let sqlDB: SqlHelper
let habitTable: ModelStatic<any>

const makeSut = (): HabitSqlRepository => new HabitSqlRepository(sqlDB)

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

  test('Should return a habit on findById success', async () => {
    const sut = makeSut()
    const { id: habitId } = await habitTable.create({ title: mockCreateHabitParams().title })
    const habit = await sut.findById(habitId)
    expect(habit).toBeTruthy()
    expect(habit.id).toBeTruthy()
    expect(habit.title).toBe(mockCreateHabitParams().title)
  })

  test('Should return a habit id on insert success', async () => {
    const sut = makeSut()
    const habitId = await sut.insert(mockCreateHabitParams())
    const habits = await habitTable.findAll()
    expect(habits.length).toBe(1)
    expect(String(habits[0].id)).toBe(habitId)
    expect(habits[0].title).toBe(mockCreateHabitParams().title)
  })
})
