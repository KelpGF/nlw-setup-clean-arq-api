import { ModelStatic } from 'sequelize'
import { SqlHelper } from '@/infra/db/sql/helpers/sql-helper'
import { makeTables } from '../database'
import { HabitSqlRepository } from './habit-sql-repository'
import { mockCreateHabitParams } from '@/domain/tests/mock-habit'

let sqlDB: SqlHelper
let habitTable: ModelStatic<any>
let habitWeekDaysTable: ModelStatic<any>

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
    habitWeekDaysTable = await sqlDB.getTable('habit_week_days')
    await habitWeekDaysTable.destroy({ where: {} })
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

  test('Should create a habit and yours week days on insert success', async () => {
    const sut = makeSut()
    const createHabitParams = mockCreateHabitParams()
    const habitId = await sut.insert(createHabitParams)
    const habits = await habitTable.findAll()
    const habitWeekDays = await habitWeekDaysTable.findAll({ where: { habit_id: Number(habitId) } })
    expect(habits.length).toBe(1)
    expect(String(habits[0].id)).toBe(habitId)
    expect(habits[0].title).toBe(createHabitParams.title)
    expect(habitWeekDays.length).toBe(createHabitParams.weekDays.length)
    expect(habitWeekDays.map((weekDayData) => ({ habit_id: weekDayData.habit_id, week_day: weekDayData.week_day })))
      .toEqual(createHabitParams.weekDays.map((weekDay) => ({ habit_id: Number(habitId), week_day: weekDay })))
  })
})
