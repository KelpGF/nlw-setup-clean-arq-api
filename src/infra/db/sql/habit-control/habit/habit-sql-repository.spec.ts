import { Sequelize } from 'sequelize'
import { HabitSqlRepository } from './habit-sql-repository'
import { mockCreateHabitParams } from '@/domain/tests/mock-habit'
import { HabitTableModel, HabitWeekDaysTableModel, initHabitTableModel, initHabitWeekDaysTableModel } from '../models'
import { SequelizeInitDatabase } from '../../helpers/sequelize-helper'
import env from '@/main/config/env'

let sqlDB: Sequelize

const makeSut = (): HabitSqlRepository => new HabitSqlRepository()

describe('Habit Sql Repository', () => {
  beforeAll(async () => {
    const modelsGenerator = [initHabitTableModel, initHabitWeekDaysTableModel]
    sqlDB = await SequelizeInitDatabase(env.HABIT_CONTROL_TEST_DB_CONNECTION_STRING, modelsGenerator)
  })

  beforeEach(async () => {
    await HabitTableModel.destroy({ where: {} })
    await HabitWeekDaysTableModel.destroy({ where: {} })
  })

  afterAll(async () => {
    await sqlDB.close()
  })

  test('Should return a habit model on findById success', async () => {
    const sut = makeSut()
    const createHabitParams = mockCreateHabitParams()
    const habitId = await sut.insert(createHabitParams)
    const habit = await sut.findById(habitId)
    expect(habit).toBeTruthy()
    expect(habit.id).toBeTruthy()
    expect(habit.title).toBe(mockCreateHabitParams().title)
    expect(habit.weekDays.length).toBe(createHabitParams.weekDays.length)
    expect(habit.weekDays).toEqual(createHabitParams.weekDays)
  })

  test('Should create a habit and yours week days on insert success', async () => {
    const sut = makeSut()
    const createHabitParams = mockCreateHabitParams()
    const habitId = await sut.insert(createHabitParams)
    const habits = await HabitTableModel.findAll()
    const habitWeekDays = await HabitWeekDaysTableModel.findAll({ where: { habit_id: Number(habitId) } })
    expect(habits.length).toBe(1)
    expect(String(habits[0].id)).toBe(habitId)
    expect(habits[0].title).toBe(createHabitParams.title)
    expect(habitWeekDays.length).toBe(createHabitParams.weekDays.length)
    expect(habitWeekDays.map((weekDayData) => ({ habit_id: weekDayData.habit_id, week_day: weekDayData.week_day })))
      .toEqual(createHabitParams.weekDays.map((weekDay) => ({ habit_id: Number(habitId), week_day: weekDay })))
  })
})
